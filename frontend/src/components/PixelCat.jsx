/** Gatinho 8-bit em SVG (grade 14x12). */
export default function PixelCat({ variant = "black", className = "" }) {
  const isBlack = variant === "black";
  const body = isBlack ? "#111318" : "#f4f6fa";
  const accent = isBlack ? "#f4f6fa" : "#111318";
  const nose = isBlack ? "#cfcfcf" : "#2a2a2a";

  return (
    <svg
      className={`pixel-cat ${className}`}
      viewBox="0 0 14 12"
      width="56"
      height="48"
      shapeRendering="crispEdges"
      aria-hidden
    >
      {/* ears */}
      <rect x="2" y="0" width="2" height="2" fill={body} />
      <rect x="10" y="0" width="2" height="2" fill={body} />
      <rect x="3" y="1" width="1" height="1" fill={accent} />
      <rect x="10" y="1" width="1" height="1" fill={accent} />
      {/* head */}
      <rect x="3" y="2" width="8" height="4" fill={body} />
      {/* eyes */}
      <rect x="4" y="3" width="2" height="2" fill={accent} />
      <rect x="8" y="3" width="2" height="2" fill={accent} />
      <rect x="5" y="3" width="1" height="1" fill={isBlack ? "#7ec8ff" : "#3a6ea5"} />
      <rect x="9" y="3" width="1" height="1" fill={isBlack ? "#7ec8ff" : "#3a6ea5"} />
      {/* nose / mouth */}
      <rect x="6" y="5" width="2" height="1" fill={nose} />
      {/* body */}
      <rect x="3" y="6" width="8" height="4" fill={body} />
      {/* belly */}
      <rect x="5" y="7" width="4" height="2" fill={isBlack ? "#2a2f38" : "#ffffff"} />
      {/* paws */}
      <rect x="3" y="10" width="2" height="2" fill={body} />
      <rect x="9" y="10" width="2" height="2" fill={body} />
      {/* tail */}
      <rect x="11" y="7" width="2" height="1" fill={body} />
      <rect x="12" y="5" width="2" height="2" fill={body} />
      <rect x="13" y="4" width="1" height="1" fill={body} />
    </svg>
  );
}
