from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
DICTIONARY_PATH = BASE_DIR / "data" / "dictionary_pt.json"
WORDS_PATH = BASE_DIR / "data" / "words_pt.json"  # answers fallback

MODE_CONFIG = {
    "termo": {"boards": 1, "max_attempts": 6},
    "dueto": {"boards": 2, "max_attempts": 7},
    "quarteto": {"boards": 4, "max_attempts": 9},
}

WORD_LENGTH = 5
