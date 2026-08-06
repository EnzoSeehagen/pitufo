import { useEffect, useState } from "react";
import BrandTitle from "./BrandTitle.jsx";

export default function SplashLoader({ onDone, minMs = 2800 }) {
  const [phase, setPhase] = useState("drop"); // drop -> motto -> out

  useEffect(() => {
    const t1 = window.setTimeout(() => setPhase("motto"), 1400);
    const t2 = window.setTimeout(() => setPhase("out"), minMs);
    const t3 = window.setTimeout(() => onDone?.(), minMs + 420);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [minMs, onDone]);

  return (
    <div className={`splash splash--${phase}`} role="status" aria-live="polite">
      <div className="splash__glow" aria-hidden />
      <BrandTitle gelatin />
      <p className={`splash__motto ${phase !== "drop" ? "is-visible" : ""}`}>
        Maria Isabela sempre ganhará de você
      </p>
      <div className="splash__bar" aria-hidden>
        <span />
      </div>
    </div>
  );
}
