import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./About.css";
import { summary, experience, education, certifications, skills } from "../content/profile";

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <main className="about about--reference">
      <div className="about-watermark" aria-hidden>
        The story
      </div>

      <div className="about-top">
        <div className="about-page__shell">
          <article className="about-page__card">
            <header className="about-page__header" data-aos="fade-up">
              <p className="about-page__eyebrow">About</p>
              <h1 className="about-page__title">The story</h1>
              <p className="about-page__intro">{summary.short}</p>
            </header>

            <section className="about-page__section" data-aos="fade-up">
              <h2 className="about-page__h2">Background</h2>
              {summary.longParagraphs.map((p, i) => (
                <p key={i} className="about-page__body">
                  {p}
                </p>
              ))}
            </section>

            <section className="about-page__section" data-aos="fade-up">
              <h2 className="about-page__h2">Experience</h2>
              <ul className="about-page__timeline">
                {experience
                  .filter((job) => job.kind !== "education")
                  .map((job) => (
                    <li key={job.id} className="about-page__job">
                      <div className="about-page__job-head">
                        <h3>{job.title}</h3>
                        <span className="about-page__job-meta">
                          {job.org} · {job.range}
                        </span>
                      </div>
                      <ul>
                        {job.highlights.map((h) => (
                          <li key={h}>{h}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
              </ul>
            </section>

            <section className="about-page__grid" data-aos="fade-up">
              <div className="about-page__panel">
                <h2 className="about-page__h2">Tools &amp; practices</h2>
                <dl className="about-page__skills">
                  <dt>Languages &amp; frameworks</dt>
                  <dd>{skills.languages.join(", ")}</dd>
                  <dt>Frontend</dt>
                  <dd>{skills.frontend.join(", ")}</dd>
                  <dt>Data</dt>
                  <dd>{skills.data.join(", ")}</dd>
                  <dt>Cloud &amp; tools</dt>
                  <dd>{skills.cloud.join(", ")}</dd>
                  <dt>Practices</dt>
                  <dd>{skills.practices.join(", ")}</dd>
                </dl>
              </div>
              <div className="about-page__panel">
                <h2 className="about-page__h2">Education</h2>
                <ul className="about-page__edu">
                  {education.map((e) => (
                    <li key={e.title}>
                      <strong>{e.title}</strong>
                      <span>{e.place}</span>
                      <span>
                        {e.range} · {e.note}
                      </span>
                    </li>
                  ))}
                </ul>
                <h2 className="about-page__h2 about-page__h2--spaced">Certifications</h2>
                <ul className="about-page__certs">
                  {certifications.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </section>

            <div className="about-page__actions" data-aos="fade-up">
              <Link to="/contact" className="about-page__btn">
                Get in touch <span aria-hidden>→</span>
              </Link>
              <Link to="/" className="about-page__btn about-page__btn--ghost">
                Back to home
              </Link>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
};

export default About;
