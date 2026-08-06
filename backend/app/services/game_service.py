from __future__ import annotations

import uuid
from dataclasses import dataclass, field
from typing import Any, Literal

from app.config import MODE_CONFIG, WORD_LENGTH
from app.services.evaluation import Color, evaluate_guess
from app.services.word_service import (
    get_random_words,
    is_valid_guess,
    normalize_word,
)

Mode = Literal["termo", "dueto", "quarteto"]
GameStatus = Literal["playing", "won", "lost"]


@dataclass
class BoardState:
    answer: str
    solved: bool = False
    rows: list[list[dict[str, str]]] = field(default_factory=list)


@dataclass
class GameSession:
    game_id: str
    mode: Mode
    practice: bool
    max_attempts: int
    boards: list[BoardState]
    guesses: list[str] = field(default_factory=list)
    status: GameStatus = "playing"


_GAMES: dict[str, GameSession] = {}


def create_game(mode: Mode, practice: bool = False) -> GameSession:
    if mode not in MODE_CONFIG:
        raise ValueError(f"Modo inválido: {mode}")

    config = MODE_CONFIG[mode]
    board_count = config["boards"]
    max_attempts = config["max_attempts"]

    answers = get_random_words(board_count)

    session = GameSession(
        game_id=str(uuid.uuid4()),
        mode=mode,
        practice=True,
        max_attempts=max_attempts,
        boards=[BoardState(answer=a) for a in answers],
    )
    _GAMES[session.game_id] = session
    return session


def get_game(game_id: str) -> GameSession | None:
    return _GAMES.get(game_id)


def _hint_for_answer(answer: str) -> str:
    first = answer[0].upper()
    mid = answer[2].upper()
    return f"começa com {first} e a 3ª letra é {mid}"


def build_last_chance_hints(session: GameSession) -> list[str] | None:
    attempts_left = session.max_attempts - len(session.guesses)
    if session.status != "playing" or attempts_left != 1:
        return None
    hints = [
        _hint_for_answer(board.answer)
        for board in session.boards
        if not board.solved
    ]
    return hints or None


def public_game(session: GameSession) -> dict[str, Any]:
    return {
        "game_id": session.game_id,
        "mode": session.mode,
        "practice": session.practice,
        "max_attempts": session.max_attempts,
        "word_length": WORD_LENGTH,
        "boards": len(session.boards),
        "guesses": session.guesses,
        "status": session.status,
        "board_states": [
            {
                "solved": b.solved,
                "rows": b.rows,
                "answer": b.answer if session.status != "playing" else None,
            }
            for b in session.boards
        ],
        "attempts_used": len(session.guesses),
        "attempts_left": session.max_attempts - len(session.guesses),
        "hints": build_last_chance_hints(session),
    }


def submit_guess(game_id: str, word: str) -> dict[str, Any]:
    session = get_game(game_id)
    if session is None:
        raise KeyError("Jogo não encontrado")

    if session.status != "playing":
        raise ValueError("Esta partida já terminou")

    guess = normalize_word(word)
    if len(guess) != WORD_LENGTH or not guess.isalpha():
        raise ValueError("Palavra inválida")

    if not is_valid_guess(guess):
        raise ValueError("Palavra inválida")

    if guess in session.guesses:
        raise ValueError("Palavra já usada")

    evaluations: list[list[Color]] = []
    for board in session.boards:
        was_solved = board.solved
        colors = evaluate_guess(guess, board.answer)
        evaluations.append(colors)
        row = [{"letter": letter, "color": color} for letter, color in zip(guess, colors)]
        board.rows.append(row)
        if not was_solved and all(c == "correct" for c in colors):
            board.solved = True

    session.guesses.append(guess)

    if all(b.solved for b in session.boards):
        session.status = "won"
    elif len(session.guesses) >= session.max_attempts:
        session.status = "lost"

    payload = public_game(session)
    payload["evaluations"] = evaluations
    return payload
