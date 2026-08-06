function Cell({ letter = "", color = "", flip = false, delay = 0 }) {
  const cls = ["cell", color && `cell--${color}`, letter && !color && "cell--filled", flip && "cell--flip"]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={cls} style={flip ? { animationDelay: `${delay}ms` } : undefined}>
      {letter}
    </div>
  );
}

export default function Board({
  rows,
  solved,
  current,
  shake,
  maxAttempts,
  wordLength,
  showDraft,
  flipRow = -1,
  label = "",
}) {
  const displayRows = [];
  for (let i = 0; i < maxAttempts; i += 1) {
    if (i < rows.length) {
      displayRows.push({ cells: rows[i], kind: "locked" });
    } else if (showDraft && i === rows.length) {
      displayRows.push({
        kind: "draft",
        cells: Array.from({ length: wordLength }, (_, idx) => ({
          letter: current[idx] || "",
          color: "",
        })),
      });
    } else {
      displayRows.push({
        kind: "empty",
        cells: Array.from({ length: wordLength }, () => ({ letter: "", color: "" })),
      });
    }
  }

  return (
    <div className={`board-panel ${solved ? "board-panel--solved" : ""}`}>
      {label ? <div className="board-panel__label">{label}</div> : null}
      <div className={`board ${solved ? "board--solved" : ""}`}>
        {displayRows.map((row, rowIdx) => (
          <div
            key={rowIdx}
            className={`row ${row.kind === "draft" && shake ? "row--shake" : ""}`}
          >
            {row.cells.map((cell, cellIdx) => (
              <Cell
                key={cellIdx}
                letter={cell.letter}
                color={cell.color}
                flip={rowIdx === flipRow && Boolean(cell.color)}
                delay={cellIdx * 80}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
