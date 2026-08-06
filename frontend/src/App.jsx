import ModeSelector from "./components/ModeSelector.jsx";
import Board from "./components/Board.jsx";
import Keyboard from "./components/Keyboard.jsx";
import ToastStack from "./components/Toast.jsx";
import SplashLoader from "./components/SplashLoader.jsx";
import { useGame } from "./hooks/useGame.js";

const MODE_LABEL = {
  termo: "Termo",
  dueto: "Dueto",
  quarteto: "Quarteto",
};

export default function App() {
  const {
    booting,
    finishBoot,
    screen,
    setScreen,
    mode,
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
    wordLength,
  } = useGame();

  if (booting) {
    return <SplashLoader onDone={finishBoot} />;
  }

  if (screen === "home") {
    return (
      <div className="app app--home">
        <ToastStack toasts={toasts} onDismiss={dismissToast} />
        {loading && <div className="page-loader" aria-hidden />}
        <ModeSelector onSelect={startGame} loading={loading} />
      </div>
    );
  }

  const boardsClass =
    mode === "quarteto"
      ? "boards boards--quarteto"
      : mode === "dueto"
        ? "boards boards--dueto"
        : "boards boards--termo";

  return (
    <div className={`app app--play app--${mode}`}>
      <ToastStack toasts={toasts} onDismiss={dismissToast} />
      {loading && <div className="page-loader page-loader--thin" aria-hidden />}

      <header className="topbar">
        <button type="button" className="icon-btn" onClick={() => setScreen("home")} aria-label="Menu">
          ←
        </button>
        <div className="topbar-center">
          <strong>{MODE_LABEL[mode]}</strong>
        </div>
        <div className="attempts-pill" title="Tentativas restantes">
          {game ? game.attempts_left : "–"}
        </div>
      </header>

      <main className={boardsClass}>
        {game?.board_states.map((board, idx) => (
          <Board
            key={idx}
            label={mode !== "termo" ? String(idx + 1) : ""}
            rows={board.rows}
            solved={board.solved}
            current={current}
            shake={shake}
            maxAttempts={game.max_attempts}
            wordLength={wordLength}
            showDraft={game.status === "playing"}
            flipRow={flipRow}
          />
        ))}
      </main>

      {game?.status !== "playing" && (
        <div className={`result result--${game.status}`}>
          <p className="result__title">
            {game.status === "won" ? "Você acertou" : "Fim de jogo"}
          </p>
          <p className="answers">
            {game.board_states.map((b) => b.answer).filter(Boolean).join(" · ")}
          </p>
          <div className="result-actions">
            <button type="button" className="btn primary" onClick={() => startGame(mode, true)}>
              Jogar de novo
            </button>
            <button type="button" className="btn ghost" onClick={() => setScreen("home")}>
              Menu
            </button>
          </div>
        </div>
      )}

      <div className="keyboard-dock">
        <Keyboard
          letterStatuses={letterStatuses}
          onKey={onKey}
          disabled={loading || game?.status !== "playing"}
        />
      </div>
    </div>
  );
}
