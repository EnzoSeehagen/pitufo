/** Gato 8-bit mais legível, com olhos verdes. */
export default function PixelCat({ variant = "black", className = "" }) {
  const isBlack = variant === "black";
  const fur = isBlack ? "#14171c" : "#f7f8fa";
  const furMid = isBlack ? "#2a3038" : "#e8ebf0";
  const outline = isBlack ? "#07080a" : "#1a1d24";
  const belly = isBlack ? "#3a424e" : "#ffffff";
  const eyeWhite = "#f5fff5";
  const eyeGreen = "#3dff6a";
  const eyeDark = "#0a1a0c";
  const nose = isBlack ? "#d0d4da" : "#2b3038";
  const innerEar = isBlack ? "#5a6270" : "#c5cad3";

  return (
    <svg
      className={`pixel-cat ${className}`}
      viewBox="0 0 20 18"
      width="72"
      height="64"
      shapeRendering="crispEdges"
      aria-hidden
    >
      {/* tail */}
      <rect x="16" y="9" width="2" height="2" fill={fur} />
      <rect x="17" y="7" width="2" height="2" fill={fur} />
      <rect x="18" y="5" width="2" height="2" fill={fur} />
      <rect x="18" y="4" width="1" height="1" fill={outline} />

      {/* body */}
      <rect x="5" y="9" width="10" height="6" fill={fur} />
      <rect x="6" y="10" width="8" height="4" fill={furMid} />
      <rect x="7" y="11" width="6" height="3" fill={belly} />

      {/* back paws */}
      <rect x="5" y="15" width="3" height="3" fill={fur} />
      <rect x="12" y="15" width="3" height="3" fill={fur} />
      <rect x="5" y="17" width="3" height="1" fill={outline} />
      <rect x="12" y="17" width="3" height="1" fill={outline} />

      {/* front paw stretch hint */}
      <rect x="4" y="13" width="2" height="2" fill={fur} />
      <rect x="14" y="13" width="2" height="2" fill={fur} />

      {/* head */}
      <rect x="5" y="3" width="10" height="7" fill={fur} />
      <rect x="6" y="4" width="8" height="5" fill={furMid} />

      {/* ears */}
      <rect x="5" y="1" width="3" height="3" fill={fur} />
      <rect x="12" y="1" width="3" height="3" fill={fur} />
      <rect x="6" y="2" width="1" height="1" fill={innerEar} />
      <rect x="13" y="2" width="1" height="1" fill={innerEar} />
      <rect x="5" y="0" width="1" height="1" fill={outline} />
      <rect x="14" y="0" width="1" height="1" fill={outline} />

      {/* eyes - green */}
      <rect x="6" y="5" width="3" height="3" fill={eyeWhite} />
      <rect x="11" y="5" width="3" height="3" fill={eyeWhite} />
      <rect x="7" y="5" width="2" height="2" fill={eyeGreen} />
      <rect x="12" y="5" width="2" height="2" fill={eyeGreen} />
      <rect x="8" y="5" width="1" height="2" fill={eyeDark} />
      <rect x="13" y="5" width="1" height="2" fill={eyeDark} />

      {/* nose + snout */}
      <rect x="9" y="7" width="2" height="1" fill={nose} />
      <rect x="8" y="8" width="1" height="1" fill={outline} />
      <rect x="11" y="8" width="1" height="1" fill={outline} />

      {/* whisker dots */}
      <rect x="4" y="7" width="1" height="1" fill={isBlack ? "#9aa3b0" : "#6b7380"} />
      <rect x="15" y="7" width="1" height="1" fill={isBlack ? "#9aa3b0" : "#6b7380"} />
    </svg>
  );
}
