import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createGame, submitGuess } from "../api/client";
import {
  INVALID_WORDS,
  LOSE,
  WIN,
  formatHintRoast,
  pick,
} from "../copy/roasts";

const WORD_LENGTH = 5;

function loadStats(mode) {
  try {
    return JSON.parse(localStorage.getItem(`pitufo-stats-${mode}`)) || {
      played: 0,
      wins: 0,
      streak: 0,
      maxStreak: 0,
    };
  } catch {
    return { played: 0, wins: 0, streak: 0, maxStreak: 0 };
  }
}

function saveStats(mode, stats) {
  localStorage.setItem(`pitufo-stats-${mode}`, JSON.stringify(stats));
}

let toastId = 0;

export function useGame() {
  const [booting, setBooting] = useState(true);
  const [screen, setScreen] = useState("home");
  const [mode, setMode] = useState("termo");
  const [practice, setPractice] = useState(false);
  const [game, setGame] = useState(null);
  const [current, setCurrent] = useState("");
  const [toasts, setToasts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [flipRow, setFlipRow] = useState(-1);
  const hintedRef = useRef(null);
  const roastShownRef = useRef(false);

  const letterStatuses = useMemo(() => {
    const map = {};
    if (!game) return map;
    const rank = { correct: 3, present: 2, absent: 1 };
    for (const board of game.board_states) {
      for (const row of board.rows) {
        for (const cell of row) {
          const prev = map[cell.letter];
          if (!prev || rank[cell.color] > rank[prev]) {
            map[cell.letter] = cell.color;
          }
        }
      }
    }
    return map;
  }, [game]);

  const dismissToast = useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  const pushToast = useCallback(
    (text, type = "info", duration = 2400) => {
      const id = ++toastId;
      setToasts([{ id, text, type }]);
      window.setTimeout(() => dismissToast(id), duration);
    },
    [dismissToast]
  );

  const maybeHintToast = useCallback(
    (data) => {
      if (data.status !== "playing" || data.attempts_left !== 1 || !data.hints?.length) {
        return;
      }
      if (hintedRef.current === data.game_id) return;
      hintedRef.current = data.game_id;
      pushToast(formatHintRoast(data.hints), "roast", 7000);
    },
    [pushToast]
  );

  const finishBoot = useCallback(() => setBooting(false), []);

  const startGame = useCallback(
    async (nextMode, nextPractice = false) => {
      setLoading(true);
      setToasts([]);
      setCurrent("");
      setFlipRow(-1);
      hintedRef.current = null;
      roastShownRef.current = false;
      try {
        const data = await createGame(nextMode, nextPractice);
        setMode(nextMode);
        setPractice(nextPractice);
        setGame(data);
        setScreen("play");
      } catch (err) {
        pushToast(err.message || "Não foi possível iniciar", "error");
      } finally {
        setLoading(false);
      }
    },
    [pushToast]
  );

  const finishIfNeeded = useCallback((data) => {
    if (data.status === "playing") return;
    const stats = loadStats(data.mode);
    stats.played += 1;
    if (data.status === "won") {
      stats.wins += 1;
      stats.streak += 1;
      stats.maxStreak = Math.max(stats.maxStreak, stats.streak);
    } else {
      stats.streak = 0;
    }
    saveStats(data.mode, stats);
  }, []);

  const onGuess = useCallback(async () => {
    if (!game || game.status !== "playing" || loading) return;
    if (current.length !== WORD_LENGTH) {
      setShake(true);
      pushToast("Palavra incompleta", "error", 1400);
      window.setTimeout(() => setShake(false), 480);
      return;
    }
    setLoading(true);
    try {
      const data = await submitGuess(game.game_id, current);
      const rowIndex = data.attempts_used - 1;
      setFlipRow(rowIndex);
      setGame(data);
      setCurrent("");
      finishIfNeeded(data);

      if (data.status === "won") {
        pushToast(pick(WIN), "success", 3200);
      } else if (data.status === "lost") {
        pushToast(pick(LOSE), "error", 3200);
      } else if (data.attempts_left === 1) {
        maybeHintToast(data);
      }
      window.setTimeout(() => setFlipRow(-1), 1100);
    } catch (err) {
      setShake(true);
      const msg = err.message || "";
      // Igual ao Termo: inválida não colorize e não gasta tentativa
      if (/inválida|invalida/i.test(msg)) {
        pushToast("Palavra inválida", "error", 1600);
      } else if (/já usada|ja usada/i.test(msg)) {
        pushToast("Palavra já usada", "error", 1600);
      } else if (!roastShownRef.current) {
        roastShownRef.current = true;
        pushToast(msg || pick(INVALID_WORDS), "error", 2400);
      }
      window.setTimeout(() => setShake(false), 480);
    } finally {
      setLoading(false);
    }
  }, [game, current, loading, pushToast, finishIfNeeded, maybeHintToast]);

  const onKey = useCallback(
    (key) => {
      if (!game || game.status !== "playing" || loading) return;
      if (key === "ENTER") {
        onGuess();
        return;
      }
      if (key === "BACK") {
        setCurrent((c) => c.slice(0, -1));
        return;
      }
      if (/^[a-zA-Z]$/.test(key) && current.length < WORD_LENGTH) {
        setCurrent((c) => c + key.toLowerCase());
      }
    },
    [game, loading, current, onGuess]
  );

  useEffect(() => {
    const handler = (e) => {
      if (screen !== "play" || booting) return;
      if (e.key === "Enter") onKey("ENTER");
      else if (e.key === "Backspace") onKey("BACK");
      else if (/^[a-zA-Z]$/.test(e.key)) onKey(e.key);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [screen, onKey, booting]);

  return {
    booting,
    finishBoot,
    screen,
    setScreen,
    mode,
    practice,
    game,
    current,
    toasts,
    dismissToast,
    loading,
    shake,
    flipRow,
    letterStatuses,
    startGame,
    onKey,
    stats: loadStats(mode),
    wordLength: WORD_LENGTH,
  };
}
