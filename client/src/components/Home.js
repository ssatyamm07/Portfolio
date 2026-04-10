import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import AOS from "aos";
import "aos/dist/aos.css";
import SkillsShowcase from "./SkillsShowcase";
import CareerJourney from "./CareerJourney";
import projectData, { homeSpotlightProjects } from "./data";
import { hero, social, experience, appNav, homeClosing } from "../content/profile";
import "./Home.css";

const RESUME_PATH = "/Satyam_Resume.pdf";

/** Decorative diagram for the “Architecture that scales” spotlight card */
const ArchitectureViz = () => (
  <div className="home-aside-card__arch-viz" aria-hidden>
    <svg className="home-aside-card__arch-svg" viewBox="0 0 320 128" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="arch-node-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(252, 128, 25, 0.14)" />
          <stop offset="100%" stopColor="rgba(252, 128, 25, 0.04)" />
        </linearGradient>
        <filter id="arch-soft-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#arch-soft-glow)">
        <rect x="8" y="36" width="88" height="56" rx="10" fill="url(#arch-node-fill)" stroke="rgba(252, 128, 25, 0.4)" strokeWidth="1.25" />
        <rect x="116" y="36" width="88" height="56" rx="10" fill="url(#arch-node-fill)" stroke="rgba(252, 128, 25, 0.4)" strokeWidth="1.25" />
        <rect x="224" y="36" width="88" height="56" rx="10" fill="url(#arch-node-fill)" stroke="rgba(252, 128, 25, 0.4)" strokeWidth="1.25" />
      </g>
      <path
        className="home-aside-card__arch-flow"
        d="M 96 64 H 110 M 204 64 H 218"
        fill="none"
        stroke="rgba(252, 128, 25, 0.45)"
        strokeWidth="1.5"
        strokeDasharray="5 4"
        strokeLinecap="round"
      />
      <path
        d="M 110 64 L 118 58 M 110 64 L 118 70"
        fill="none"
        stroke="rgba(252, 128, 25, 0.55)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M 218 64 L 226 58 M 218 64 L 226 70"
        fill="none"
        stroke="rgba(252, 128, 25, 0.55)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <text x="52" y="58" textAnchor="middle" fill="rgba(255,255,255,0.88)" fontSize="11" fontWeight="700" fontFamily="system-ui, sans-serif">
        Services
      </text>
      <text x="52" y="76" textAnchor="middle" fill="rgba(252, 128, 25, 0.75)" fontSize="8" fontWeight="600" fontFamily="system-ui, sans-serif" letterSpacing="0.06em">
        B2B · APIs
      </text>
      <text x="160" y="58" textAnchor="middle" fill="rgba(255,255,255,0.88)" fontSize="11" fontWeight="700" fontFamily="system-ui, sans-serif">
        Async
      </text>
      <text x="160" y="76" textAnchor="middle" fill="rgba(252, 128, 25, 0.75)" fontSize="8" fontWeight="600" fontFamily="system-ui, sans-serif" letterSpacing="0.06em">
        Queues · workers
      </text>
      <text x="268" y="58" textAnchor="middle" fill="rgba(255,255,255,0.88)" fontSize="11" fontWeight="700" fontFamily="system-ui, sans-serif">
        Data
      </text>
      <text x="268" y="76" textAnchor="middle" fill="rgba(252, 128, 25, 0.75)" fontSize="8" fontWeight="600" fontFamily="system-ui, sans-serif" letterSpacing="0.06em">
        SQL · schemas
      </text>
      <rect x="24" y="100" width="272" height="22" rx="6" fill="rgba(0,0,0,0.35)" stroke="rgba(252, 128, 25, 0.2)" strokeWidth="1" />
      <text x="160" y="115" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="system-ui, sans-serif" letterSpacing="0.04em">
        Boundaries stay clean · traffic spikes absorbed downstream
      </text>
    </svg>
  </div>
);

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
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    AOS.init({
      duration: 700,
      once: false,
      offset: 96,
      easing: "ease-out-cubic",
      throttleDelay: 80,
      disable: reduceMotion.matches,
    });
  }, []);

  const swiggy = experience.find((e) => e.id === "swiggy");

  return (
    <main className="home home--reference">
      <div className="home-watermark" aria-hidden>
        Portfolio
      </div>

      <section className="home-top" id="hero">
        <div className="home-top__layout">
          <div className="home-top__row home-top__row--hero">
            <div className="home-hero-card" data-aos="fade-up" data-aos-once="true">
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
                    {appNav.home}
                  </NavLink>
                  <a href="#journey" className="home-hero-card__link">
                    {appNav.journey}
                  </a>
                  <a href="#projects" className="home-hero-card__link">
                    {appNav.projects}
                  </a>
                  <NavLink
                    to="/about"
                    className={({ isActive }) => `home-hero-card__link${isActive ? " active" : ""}`}
                  >
                    {appNav.about}
                  </NavLink>
                </div>
                <a className="home-hero-card__email" href={`mailto:${social.email}`}>
                  <span className="home-hero-card__email-icon" aria-hidden>
                    <i className="fa-solid fa-envelope" />
                  </span>
                  <span className="home-hero-card__email-text">{social.email}</span>
                </a>
              </nav>

              <p className="home-hero-card__kicker">{hero.brandKicker}</p>

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
                      {hero.ctaPrimary} <span aria-hidden>→</span>
                    </Link>
                    <a
                      className="home-hero-card__cta home-hero-card__cta--ghost"
                      href={RESUME_PATH}
                      download="Satyam_Kumar_Resume.pdf"
                    >
                      {hero.ctaSecondary}
                    </a>
                  </div>
                </div>
                <FeaturedPhoto />
              </div>
            </div>

            {swiggy && (
              <article
                className="home-aside-card home-experience-card"
                data-aos="fade-left"
                data-aos-delay="60"
                data-aos-once="true"
                aria-label="Current role"
              >
                <div className="home-aside-card__head">
                  <h2 className="home-aside-card__title">{swiggy.org}</h2>
                  <span className="home-aside-card__lock" aria-hidden title="Current role">
                    <i className="fa-solid fa-briefcase" />
                  </span>
                </div>
                <p className="home-aside-card__sub">{swiggy.title}</p>
                <span className="home-aside-card__pill">B2B · Automation · Now serving</span>
                <ul className="home-aside-card__list">
                  {swiggy.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>

                <div className="home-experience-card__extras">
                  <p className="home-experience-card__tenure">{swiggy.range}</p>
                  <p className="home-experience-card__blurb">
                    Internal platforms, crisp handoffs, and automation that survives real ops load — not slide-deck
                    ware.
                  </p>
                  <div className="home-experience-card__metrics" aria-label="Focus areas">
                    <div className="home-experience-card__metric">
                      <i className="fa-solid fa-diagram-project" aria-hidden />
                      <span>B2B systems</span>
                    </div>
                    <div className="home-experience-card__metric">
                      <i className="fa-solid fa-bolt" aria-hidden />
                      <span>Async &amp; queues</span>
                    </div>
                    <div className="home-experience-card__metric">
                      <i className="fa-solid fa-database" aria-hidden />
                      <span>Data &amp; SQL</span>
                    </div>
                  </div>
                </div>

                <div className="home-aside-card__tags">
                  <span>Node.js</span>
                  <span>PostgreSQL</span>
                  <span>AWS</span>
                  <span>Angular</span>
                </div>
              </article>
            )}
          </div>

          <div className="home-top__row home-top__row--below home-top__row--spotlight">
            {homeSpotlightProjects.map((featured, i) => (
              <article
                key={featured.id}
                className="home-aside-card home-card-reveal"
                data-aos="fade"
                data-aos-duration="750"
                data-aos-delay={80 + i * 100}
                data-aos-anchor-placement="top-bottom"
              >
                {featured.imgsrc ? (
                  <div className="home-aside-card__thumb">
                    {featured.demo ? (
                      <a
                        href={featured.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="home-aside-card__thumb-link"
                        aria-label={`${featured.projectName} — open live site`}
                      >
                        <img
                          src={featured.imgsrc}
                          alt=""
                          loading="lazy"
                          style={
                            featured.previewObjectPosition
                              ? { objectPosition: featured.previewObjectPosition }
                              : undefined
                          }
                        />
                      </a>
                    ) : (
                      <span className="home-aside-card__thumb-link">
                        <img
                          src={featured.imgsrc}
                          alt=""
                          loading="lazy"
                          style={
                            featured.previewObjectPosition
                              ? { objectPosition: featured.previewObjectPosition }
                              : undefined
                          }
                        />
                      </span>
                    )}
                  </div>
                ) : null}
                <div className="home-aside-card__head">
                  <h2 className="home-aside-card__title">{featured.projectName}</h2>
                  {featured.demo ? (
                    <a
                      href={featured.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="home-aside-card__icon-btn"
                      aria-label={`Open ${featured.projectName} live site`}
                    >
                      <i className="fa-solid fa-arrow-up-right-from-square" />
                    </a>
                  ) : null}
                </div>
                <p className="home-aside-card__sub">{featured.roleLine}</p>
                <p className="home-aside-card__desc">{featured.description}</p>
                {featured.tags && (
                  <div className="home-aside-card__tags">
                    {featured.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                )}
                {featured.demoOnDemand ? (
                  <p className="home-aside-card__demo-note">Demo on demand — full product areas need login.</p>
                ) : null}
              </article>
            ))}

            <article
              className="home-aside-card home-aside-card--accent home-card-reveal"
              data-aos="fade"
              data-aos-duration="750"
              data-aos-delay="280"
              data-aos-anchor-placement="top-bottom"
            >
              <div className="home-aside-card__accent-icon" aria-hidden>
                <i className="fa-solid fa-layer-group" />
              </div>
              <h2 className="home-aside-card__title">Architecture that scales</h2>
              <p className="home-aside-card__desc home-aside-card__desc--compact">
                Clean service boundaries, resilient queues, and schemas that don’t fall apart when traffic spikes —
                built like a kitchen that survives Friday night.
              </p>
              <ArchitectureViz />
            </article>
          </div>
        </div>
      </section>

      <SkillsShowcase />

      <CareerJourney />

      <section className="home-projects home-projects--reference" id="projects" aria-labelledby="projects-heading">
        <div className="home-projects__inner">
          <h2
            id="projects-heading"
            className="home-section-title"
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
          >
            More from the menu
          </h2>
          <p className="home-section-lead" data-aos="fade-up" data-aos-anchor-placement="top-bottom">
            Freelance highlights above; here’s the full menu — personal builds and client work, each with its own preview.
          </p>
          <div className="home-projects__grid">
            {projectData.map((project, index) => (
              <div
                key={project.id}
                className="home-project-card-outer"
                style={{ "--reveal-delay": `${index * 75}ms` }}
                data-aos="fade"
                data-aos-duration="750"
                data-aos-delay={index * 70}
                data-aos-offset="80"
                data-aos-anchor-placement="center-bottom"
              >
                <article className="home-project-card">
                  <div className="home-project-card__media">
                    <img
                      src={project.imgsrc}
                      alt=""
                      loading="lazy"
                      style={
                        project.previewObjectPosition
                          ? { objectPosition: project.previewObjectPosition }
                          : undefined
                      }
                    />
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
                    <div className="home-project-card__footer">
                      {project.demo ? (
                        <a className="home-project-card__link" href={project.demo} target="_blank" rel="noopener noreferrer">
                          {project.demoOnDemand ? (
                            <>
                              Visit live site <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden />
                            </>
                          ) : (
                            <>
                              Taste live demo <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden />
                            </>
                          )}
                        </a>
                      ) : null}
                      {project.demoOnDemand ? (
                        <span className="home-project-card__muted">Demo on demand — credentials required for app login.</span>
                      ) : null}
                      {!project.demo ? <span className="home-project-card__muted">Recipe on request</span> : null}
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
          <div className="home-projects__more" data-aos="fade-up" data-aos-anchor-placement="top-bottom">
            <Link to="/playlist" className="home-btn home-btn--ghost">
              See full menu
            </Link>
          </div>
        </div>
      </section>

      <section className="home-cta home-cta--reference" id="contact" aria-labelledby="cta-heading">
        <div className="home-cta__inner" data-aos="zoom-in" data-aos-anchor-placement="top-bottom">
          <h2 id="cta-heading" className="home-cta__title">
            {homeClosing.title}
          </h2>
          <p className="home-cta__text">{homeClosing.text}</p>
          <div className="home-cta__actions">
            <Link to="/contact" className="home-cta__btn">
              {homeClosing.ctaPrimary}
            </Link>
            <a className="home-cta__btn home-cta__btn--ghost" href={`mailto:${social.email}`}>
              {homeClosing.ctaSecondary}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
