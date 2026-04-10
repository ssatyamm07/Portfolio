import React, { useEffect, useState } from "react";
import "./SectionScrollIndicator.css";

export default function SectionScrollIndicator() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrollable = el.scrollHeight - el.clientHeight;
      setProgress(scrollable > 0 ? el.scrollTop / scrollable : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="scroll-indicator" aria-hidden>
      <div className="scroll-indicator__track">
        <div className="scroll-indicator__fill" style={{ height: `${Math.max(8, progress * 100)}%` }} />
      </div>
    </div>
  );
}
