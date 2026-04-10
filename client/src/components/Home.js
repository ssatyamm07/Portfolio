import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import AOS from "aos";
import "aos/dist/aos.css";
import SkillsShowcase from "./SkillsShowcase";
import CareerJourney from "./CareerJourney";
import projectData from "./data";
import { hero, social, experience } from "../content/profile";
import "./Home.css";

const RESUME_PATH = "/Satyam_Resume.pdf";

const FeaturedPhoto = () => {
  const [photoOk, setPhotoOk] = useState(false);

  return (
    <div className="home-hero-card__photo">
      <img
        src="/profile.jpg"
        alt="Satyam Kumar"
        className="home-hero-card__photo-img"
        onLoad={() => setPhotoOk(true)}
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
      <div className={`home-hero-card__photo-fallback ${!photoOk ? "is-visible" : ""}`} aria-hidden>
        <span>SK</span>
      </div>
    </div>
  );
};

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const swiggy = experience.find((e) => e.id === "swiggy");
  const featured =
    projectData.find((p) => p.projectName === "SafarSang") || projectData[0];

  return (
    <main className="home home--reference">
      <div className="home-watermark" aria-hidden>
        Portfolio
      </div>

      <section className="home-top" id="hero">
        <div className="home-top__grid">
          <div className="home-hero-card" data-aos="fade-up">
            <nav className="home-hero-card__nav" aria-label="Primary">
              <NavLink
                to="/"
                className={({ isActive }) => `home-hero-card__brand${isActive ? " active" : ""}`}
                end
              >
                {hero.name}
              </NavLink>
              <div className="home-hero-card__links">
                <NavLink
                  to="/"
                  className={({ isActive }) => `home-hero-card__link${isActive ? " active" : ""}`}
                  end
                >
                  Home
                </NavLink>
                <a href="#journey" className="home-hero-card__link">
                  Journey
                </a>
                <a href="#projects" className="home-hero-card__link">
                  Projects
                </a>
                <NavLink
                  to="/about"
                  className={({ isActive }) => `home-hero-card__link${isActive ? " active" : ""}`}
                >
                  About
                </NavLink>
              </div>
              <a className="home-hero-card__email" href={`mailto:${social.email}`}>
                <span className="home-hero-card__email-icon" aria-hidden>
                  <i className="fa-solid fa-envelope" />
                </span>
                <span className="home-hero-card__email-text">{social.email}</span>
              </a>
            </nav>

            <div className="home-hero-card__main">
              <div className="home-hero-card__copy">
                <p className="home-hero-card__label">{hero.roleLabel}</p>
                <h1 className="home-hero-card__headline">{hero.headline}</h1>
                <p className="home-hero-card__role">
                  <TypeAnimation
                    sequence={hero.titleSequence}
                    speed={45}
                    repeat={Infinity}
                    wrapper="span"
                  />
                </p>
                <p className="home-hero-card__tagline">{hero.tagline}</p>
                <div className="home-hero-card__actions">
                  <Link className="home-hero-card__cta" to="/contact">
                    Get in touch <span aria-hidden>→</span>
                  </Link>
                  <a
                    className="home-hero-card__cta home-hero-card__cta--ghost"
                    href={RESUME_PATH}
                    download="Satyam_Kumar_Resume.pdf"
                  >
                    Resume
                  </a>
                </div>
              </div>
              <FeaturedPhoto />
            </div>
          </div>

          <aside className="home-aside" aria-label="Highlights">
            <article className="home-aside-card" data-aos="fade-left" data-aos-delay="80">
              <div className="home-aside-card__head">
                <h2 className="home-aside-card__title">{featured.projectName}</h2>
                {featured.demo ? (
                  <a
                    href={featured.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="home-aside-card__icon-btn"
                    aria-label="Open project demo"
                  >
                    <i className="fa-solid fa-arrow-up-right-from-square" />
                  </a>
                ) : null}
              </div>
              <p className="home-aside-card__sub">Full-stack product</p>
              <p className="home-aside-card__desc">{featured.description}</p>
              {featured.tags && (
                <div className="home-aside-card__tags">
                  {featured.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              )}
            </article>

            {swiggy && (
              <article className="home-aside-card" data-aos="fade-left" data-aos-delay="140">
                <div className="home-aside-card__head">
                  <h2 className="home-aside-card__title">{swiggy.org}</h2>
                  <span className="home-aside-card__lock" aria-hidden title="Current role">
                    <i className="fa-solid fa-briefcase" />
                  </span>
                </div>
                <p className="home-aside-card__sub">{swiggy.title}</p>
                <span className="home-aside-card__pill">B2B · Automation</span>
                <ul className="home-aside-card__list">
                  {swiggy.highlights.slice(0, 4).map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                <div className="home-aside-card__tags">
                  <span>Node.js</span>
                  <span>PostgreSQL</span>
                  <span>AWS</span>
                  <span>Angular</span>
                </div>
              </article>
            )}

            <article className="home-aside-card home-aside-card--accent" data-aos="fade-left" data-aos-delay="200">
              <div className="home-aside-card__accent-icon" aria-hidden>
                <i className="fa-solid fa-layer-group" />
              </div>
              <h2 className="home-aside-card__title">Reliable system design</h2>
              <p className="home-aside-card__desc">
                I focus on clear service boundaries, resilient async flows with queues, and data models that stay
                understandable as products grow.
              </p>
            </article>
          </aside>
        </div>
      </section>

      <SkillsShowcase />

      <CareerJourney />

      <section className="home-projects home-projects--reference" id="projects" aria-labelledby="projects-heading">
        <div className="home-projects__inner">
          <h2 id="projects-heading" className="home-section-title" data-aos="fade-up">
            Featured builds
          </h2>
          <p className="home-section-lead" data-aos="fade-up">
            Products and experiments that mirror what I ship at work: APIs, data, and usable UI.
          </p>
          <div className="home-projects__grid">
            {projectData.map((project, index) => (
              <article key={project.id} className="home-project-card" data-aos="fade-up" data-aos-delay={index * 60}>
                <div className="home-project-card__media">
                  <img src={project.imgsrc} alt="" loading="lazy" />
                </div>
                <div className="home-project-card__body">
                  <h3 className="home-project-card__title">{project.projectName}</h3>
                  <p className="home-project-card__desc">{project.description}</p>
                  {project.tags && (
                    <div className="home-project-card__tags">
                      {project.tags.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                  )}
                  {project.demo ? (
                    <a className="home-project-card__link" href={project.demo} target="_blank" rel="noopener noreferrer">
                      Live demo <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden />
                    </a>
                  ) : (
                    <span className="home-project-card__muted">Demo available on request</span>
                  )}
                </div>
              </article>
            ))}
          </div>
          <div className="home-projects__more" data-aos="fade-up">
            <Link to="/playlist" className="home-btn home-btn--ghost">
              View all projects
            </Link>
          </div>
        </div>
      </section>

      <section className="home-cta home-cta--reference" id="contact" aria-labelledby="cta-heading">
        <div className="home-cta__inner" data-aos="zoom-in">
          <h2 id="cta-heading" className="home-cta__title">
            Let’s build reliable systems together
          </h2>
          <p className="home-cta__text">
            Hiring for backend, automation, or platform work? Send a message — I’ll respond as soon as I can.
          </p>
          <div className="home-cta__actions">
            <Link to="/contact" className="home-cta__btn">
              Open contact form
            </Link>
            <a className="home-cta__btn home-cta__btn--ghost" href={`mailto:${social.email}`}>
              Email directly
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
