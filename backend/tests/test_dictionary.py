from app.services.word_service import is_valid_guess, normalize_word, load_answers, load_valid_words


def test_normalize_strips_accents():
    assert normalize_word("Ação") == "acao"
    assert normalize_word("ÓRGÃO") == "orgao"


def test_dictionary_is_large():
    assert len(load_valid_words()) > 10000
    assert len(load_answers()) >= 1000


def test_common_guesses_are_valid():
    for word in ("casas", "termo", "fugaz", "livro", "prato", "acoes", "orgao"):
        assert is_valid_guess(word), word


def test_garbage_is_invalid():
    assert not is_valid_guess("zzzzz")
    assert not is_valid_guess("asdfg")
