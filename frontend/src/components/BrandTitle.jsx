const LETTERS = ["P", "i", "t", "u", "f", "o"];

export default function BrandTitle({ compact = false, gelatin = false }) {
  return (
    <h1
      className={[
        "brand-title",
        compact && "brand-title--compact",
        gelatin && "brand-title--gelatin",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label="Pitufo"
    >
      {LETTERS.map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          className="brand-letter"
          style={{ "--i": index, animationDelay: `${index * 0.1}s` }}
        >
          <span
            className="brand-letter__inner"
            style={{ animationDelay: gelatin ? `${0.7 + index * 0.07}s` : undefined }}
          >
            {letter}
          </span>
        </span>
      ))}
    </h1>
  );
}
