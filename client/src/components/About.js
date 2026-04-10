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
    <main className="about-page">
      <div className="about-page__inner">
        <header className="about-page__header" data-aos="fade-up">
          <h1>About</h1>
          <p className="about-page__intro">{summary.short}</p>
        </header>

        <section className="about-page__section" data-aos="fade-up">
          <h2>Background</h2>
          {summary.longParagraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </section>

        <section className="about-page__section" data-aos="fade-up">
          <h2>Experience</h2>
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
          <div>
            <h2>Skills</h2>
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
          <div>
            <h2>Education</h2>
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
            <h2 className="about-page__certs-title">Certifications</h2>
            <ul className="about-page__certs">
              {certifications.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </section>

        <p className="about-page__cta">
          <Link to="/contact" className="about-page__cta-link">
            Get in touch
          </Link>
          {" · "}
          <Link to="/" className="about-page__cta-link">
            Back to home
          </Link>
        </p>
      </div>
    </main>
  );
};

export default About;
