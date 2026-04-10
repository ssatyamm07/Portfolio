import React from "react";
import { techMarqueeItems } from "../content/profile";
import "./TechMarquee.css";

export default function TechMarquee() {
  const doubled = [...techMarqueeItems, ...techMarqueeItems];

  return (
    <section className="tech-marquee" id="tech" aria-label="Technologies">
      <div className="tech-marquee__fade tech-marquee__fade--left" aria-hidden />
      <div className="tech-marquee__fade tech-marquee__fade--right" aria-hidden />
      <div className="tech-marquee__track">
        <div className="tech-marquee__inner">
          {doubled.map((label, i) => (
            <span key={`${label}-${i}`} className="tech-marquee__pill">
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
