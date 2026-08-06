import BrandTitle from "./BrandTitle.jsx";

const MODES = [
  {
    id: "termo",
    title: "Termo",
    blurb: "1 palavra · 6 tentativas",
  },
  {
    id: "dueto",
    title: "Dueto",
    blurb: "2 palavras · 7 tentativas",
  },
  {
    id: "quarteto",
    title: "Quarteto",
    blurb: "4 palavras · 9 tentativas",
  },
];

export default function ModeSelector({ onSelect, loading }) {
  return (
    <section className="home">
      <header className="hero">
        <BrandTitle />
        <p className="tagline">Cada partida sorteia uma palavra nova.</p>
      </header>

      <div className="mode-list">
        {MODES.map((mode) => (
          <article key={mode.id} className="mode-card">
            <div className="mode-card__copy">
              <h2>{mode.title}</h2>
              <p>{mode.blurb}</p>
            </div>
            <button
              type="button"
              className="btn primary mode-play"
              disabled={loading}
              onClick={() => onSelect(mode.id, true)}
            >
              {loading ? "Abrindo…" : "Jogar"}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
