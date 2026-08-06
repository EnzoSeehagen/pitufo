/** Gato 8-bit; variante licking = se lambendo com a língua pra fora. */
export default function PixelCat({
  variant = "black",
  className = "",
  licking = false,
  size = 72,
}) {
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
  const tongue = "#ff6b9d";
  const tongueDark = "#e84f7a";
  const height = Math.round((size * 18) / 20);

  return (
    <svg
      className={`pixel-cat ${licking ? "pixel-cat--licking" : ""} ${className}`}
      viewBox="0 0 20 18"
      width={size}
      height={height}
      shapeRendering="crispEdges"
      aria-hidden
    >
      <g className="pixel-cat__body">
        {/* tail */}
        <rect x="16" y="9" width="2" height="2" fill={fur} />
        <rect x="17" y="7" width="2" height="2" fill={fur} />
        <rect x="18" y="5" width="2" height="2" fill={fur} />
        <rect x="18" y="4" width="1" height="1" fill={outline} />

        {/* body */}
        <rect x="5" y="9" width="10" height="6" fill={fur} />
        <rect x="6" y="10" width="8" height="4" fill={furMid} />
        <rect x="7" y="11" width="6" height="3" fill={belly} />

        {/* paws */}
        <rect x="5" y="15" width="3" height="3" fill={fur} />
        <rect x="12" y="15" width="3" height="3" fill={fur} />
        <rect x="5" y="17" width="3" height="1" fill={outline} />
        <rect x="12" y="17" width="3" height="1" fill={outline} />
        <rect x="4" y="13" width="2" height="2" fill={fur} />
        <rect x="14" y="13" width="2" height="2" fill={fur} />
      </g>

      <g className="pixel-cat__head">
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

        {/* eyes */}
        <rect x="6" y="5" width="3" height="3" fill={eyeWhite} />
        <rect x="11" y="5" width="3" height="3" fill={eyeWhite} />
        <rect x="7" y="5" width="2" height="2" fill={eyeGreen} />
        <rect x="12" y="5" width="2" height="2" fill={eyeGreen} />
        <rect x="8" y="5" width="1" height="2" fill={eyeDark} />
        <rect x="13" y="5" width="1" height="2" fill={eyeDark} />

        {/* nose */}
        <rect x="9" y="7" width="2" height="1" fill={nose} />
        <rect x="8" y="8" width="1" height="1" fill={outline} />
        <rect x="11" y="8" width="1" height="1" fill={outline} />

        {/* whiskers */}
        <rect x="4" y="7" width="1" height="1" fill={isBlack ? "#9aa3b0" : "#6b7380"} />
        <rect x="15" y="7" width="1" height="1" fill={isBlack ? "#9aa3b0" : "#6b7380"} />

        {licking ? (
          <g className="pixel-cat__tongue">
            <rect x="9" y="9" width="2" height="1" fill={tongue} />
            <rect className="pixel-cat__tongue-tip" x="9" y="10" width="2" height="2" fill={tongue} />
            <rect className="pixel-cat__tongue-tip" x="9" y="12" width="2" height="1" fill={tongueDark} />
          </g>
        ) : null}
      </g>
    </svg>
  );
}
