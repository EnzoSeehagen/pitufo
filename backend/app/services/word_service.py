from __future__ import annotations

import json
import random
import unicodedata
from datetime import date, datetime, timezone
from functools import lru_cache
from hashlib import sha256

from app.config import DICTIONARY_PATH, WORD_LENGTH, WORDS_PATH


def normalize_word(word: str) -> str:
    """Termo-style: lowercase + remove accents (ação -> acao)."""
    text = word.lower().strip()
    nfkd = unicodedata.normalize("NFKD", text)
    return "".join(ch for ch in nfkd if not unicodedata.combining(ch))


@lru_cache(maxsize=1)
def _load_dictionary() -> tuple[tuple[str, ...], frozenset[str]]:
    if DICTIONARY_PATH.exists():
        with open(DICTIONARY_PATH, encoding="utf-8") as f:
            data = json.load(f)
        answers = [
            normalize_word(w)
            for w in data.get("answers", [])
            if len(normalize_word(w)) == WORD_LENGTH
        ]
        valid = {
            normalize_word(w)
            for w in data.get("valid", [])
            if len(normalize_word(w)) == WORD_LENGTH
        }
        valid.update(answers)
        return tuple(sorted(set(answers))), frozenset(valid)

    with open(WORDS_PATH, encoding="utf-8") as f:
        words = [normalize_word(w) for w in json.load(f) if len(normalize_word(w)) == WORD_LENGTH]
    uniq = tuple(sorted(set(words)))
    return uniq, frozenset(uniq)


def load_answers() -> list[str]:
    return list(_load_dictionary()[0])


def load_words() -> list[str]:
    """Backward-compatible: answer pool."""
    return load_answers()


def load_valid_words() -> frozenset[str]:
    return _load_dictionary()[1]


def is_valid_guess(word: str) -> bool:
    return normalize_word(word) in load_valid_words()


def get_daily_words(mode: str, count: int, day: date | None = None) -> list[str]:
    words = load_answers()
    day = day or datetime.now(timezone.utc).date()
    seed_str = f"pitufo-{mode}-{day.isoformat()}"
    seed_int = int(sha256(seed_str.encode()).hexdigest()[:16], 16)
    rng = random.Random(seed_int)
    return rng.sample(words, k=min(count, len(words)))


def get_random_words(count: int) -> list[str]:
    words = load_answers()
    return random.sample(words, k=min(count, len(words)))
