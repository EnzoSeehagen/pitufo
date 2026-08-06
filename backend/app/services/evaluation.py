from __future__ import annotations

from typing import Literal

Color = Literal["correct", "present", "absent"]


def evaluate_guess(guess: str, answer: str) -> list[Color]:
    """Wordle/Termo two-pass evaluation for repeated letters."""
    guess = guess.lower()
    answer = answer.lower()
    length = len(answer)
    result: list[Color | None] = [None] * length
    remaining: dict[str, int] = {}

    for i, (g, a) in enumerate(zip(guess, answer)):
        if g == a:
            result[i] = "correct"
        else:
            remaining[a] = remaining.get(a, 0) + 1

    for i, g in enumerate(guess):
        if result[i] is not None:
            continue
        if remaining.get(g, 0) > 0:
            result[i] = "present"
            remaining[g] -= 1
        else:
            result[i] = "absent"

    return [c for c in result if c is not None]  # type: ignore[misc]
