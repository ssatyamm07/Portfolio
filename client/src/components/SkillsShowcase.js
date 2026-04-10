import React from "react";
import { skillTiles, summary, skillsHeadline } from "../content/profile";
import "./SkillsShowcase.css";

export default function SkillsShowcase() {
  return (
    <section className="skills-showcase" id="tech" aria-labelledby="skills-showcase-heading">
      <div className="skills-showcase__stripes" aria-hidden />
      <div
        className="skills-showcase__card"
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
      >
        <div className="skills-showcase__rail" aria-hidden>
          <span className="skills-showcase__rail-bar" />
          <span className="skills-showcase__rail-text">{skillsHeadline.kicker}</span>
        </div>

        <div className="skills-showcase__body">
          <div className="skills-showcase__header">
            <h2 id="skills-showcase-heading" className="skills-showcase__title">
              {skillsHeadline.title}
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
                data-aos-once="true"
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
