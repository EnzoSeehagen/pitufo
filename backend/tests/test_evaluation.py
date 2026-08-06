from app.services.evaluation import evaluate_guess


def test_all_correct():
    assert evaluate_guess("termo", "termo") == [
        "correct",
        "correct",
        "correct",
        "correct",
        "correct",
    ]


def test_all_absent():
    assert evaluate_guess("abcde", "fghij") == [
        "absent",
        "absent",
        "absent",
        "absent",
        "absent",
    ]


def test_present_and_correct():
    # guess aabbc vs answer bacde
    # pos1 a is correct (consumes the only a), so leftover a is absent
    assert evaluate_guess("aabbc", "bacde") == [
        "absent",
        "correct",
        "present",
        "absent",
        "present",
    ]


def test_duplicate_green_consumes():
    # classic: guess "aaabb", answer "abcde" -> only first a present? answer has 1 a
    # a vs a -> correct, remaining a's absent for other a's
    result = evaluate_guess("aaabb", "axxxx")
    assert result[0] == "correct"
    assert result[1] == "absent"
    assert result[2] == "absent"
