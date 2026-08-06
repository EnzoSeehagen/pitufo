const ROWS = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["BACK", "z", "x", "c", "v", "b", "n", "m", "ENTER"],
];

export default function Keyboard({ letterStatuses, onKey, disabled }) {
  return (
    <div className="keyboard" role="group" aria-label="Teclado">
      {ROWS.map((row) => (
        <div key={row.join("-")} className="keyboard-row">
          {row.map((key) => {
            const isAction = key === "ENTER" || key === "BACK";
            const status = !isAction ? letterStatuses[key] : "";
            const label = key === "BACK" ? "⌫" : key === "ENTER" ? "OK" : key;
            return (
              <button
                key={key}
                type="button"
                className={`key ${isAction ? "key--wide" : ""} ${
                  key === "ENTER" ? "key--ok" : ""
                } ${status ? `key--${status}` : ""}`}
                disabled={disabled}
                onPointerDown={(e) => {
                  e.preventDefault();
                  onKey(key);
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
