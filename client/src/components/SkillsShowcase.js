import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { skillTiles, summary } from "../content/profile";
import "./SkillsShowcase.css";

export default function SkillsShowcase() {
  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  return (
    <section className="skills-showcase" id="tech" aria-labelledby="skills-showcase-heading">
      <div className="skills-showcase__stripes" aria-hidden />
      <div className="skills-showcase__card">
        <div className="skills-showcase__rail" aria-hidden>
          <span className="skills-showcase__rail-bar" />
          <span className="skills-showcase__rail-text">Skills</span>
        </div>

        <div className="skills-showcase__body">
          <div className="skills-showcase__header">
            <h2 id="skills-showcase-heading" className="skills-showcase__title">
              What I do
            </h2>
            <p className="skills-showcase__intro">{summary.short}</p>
          </div>

          <div className="skills-showcase__grid">
            {skillTiles.map((tile, i) => (
              <div
                key={tile.label}
                className="skills-showcase__tile"
                data-aos="fade-up"
                data-aos-delay={i * 40}
              >
                <i className={tile.icon} aria-hidden />
                <span>{tile.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
