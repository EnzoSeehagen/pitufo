import { useEffect, useState } from "react";
import BrandTitle from "./BrandTitle.jsx";
import PixelCat from "./PixelCat.jsx";

export default function SplashLoader({ onDone, minMs = 6200 }) {
  const [phase, setPhase] = useState("drop"); // drop -> play -> motto -> out

  useEffect(() => {
    const tPlay = window.setTimeout(() => setPhase("play"), 1100);
    const tMotto = window.setTimeout(() => setPhase("motto"), 3800);
    const tOut = window.setTimeout(() => setPhase("out"), minMs);
    const tDone = window.setTimeout(() => onDone?.(), minMs + 480);
    return () => {
      window.clearTimeout(tPlay);
      window.clearTimeout(tMotto);
      window.clearTimeout(tOut);
      window.clearTimeout(tDone);
    };
  }, [minMs, onDone]);

  return (
    <div className={`splash splash--${phase}`} role="status" aria-live="polite">
      <div className="splash__glow" aria-hidden />

      <div className="splash__stage" aria-hidden>
        <PixelCat variant="black" className="pixel-cat--left" />
        <div className="splash__title-wrap">
          <BrandTitle gelatin />
        </div>
        <PixelCat variant="white" className="pixel-cat--right" />
      </div>

      <p className={`splash__motto ${phase === "motto" || phase === "out" ? "is-visible" : ""}`}>
        Maria Isabela sempre ganhará de você
      </p>
      <div className="splash__bar" aria-hidden>
        <span />
      </div>
    </div>
  );
}
