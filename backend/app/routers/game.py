from __future__ import annotations

from typing import Literal

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from app.services import game_service

router = APIRouter(prefix="/api/game", tags=["game"])

Mode = Literal["termo", "dueto", "quarteto"]


class NewGameRequest(BaseModel):
    mode: Mode = "termo"
    practice: bool = False


class GuessRequest(BaseModel):
    word: str = Field(..., min_length=5, max_length=5)


@router.post("/new")
def new_game(body: NewGameRequest):
    try:
        session = game_service.create_game(body.mode, body.practice)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    return game_service.public_game(session)


@router.get("/{game_id}")
def get_game(game_id: str):
    session = game_service.get_game(game_id)
    if session is None:
        raise HTTPException(status_code=404, detail="Jogo não encontrado")
    return game_service.public_game(session)


@router.post("/{game_id}/guess")
def guess(game_id: str, body: GuessRequest):
    try:
        return game_service.submit_guess(game_id, body.word)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
