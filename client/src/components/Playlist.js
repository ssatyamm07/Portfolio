import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import projectData from "./data";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Playlist.css";

const Playlist = () => {
  const [spin, setSpin] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    const timer = setTimeout(() => setSpin(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (spin) {
    return (
      <main className="playlist playlist--reference">
        <div className="playlist-watermark" aria-hidden>
          Top picks
        </div>
        <div className="playlist-top playlist-top--loading">
          <div className="playlist-loading" role="status" aria-live="polite">
            <Spinner animation="border" className="playlist-loading__spinner" />
            <span>Loading projects…</span>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="playlist playlist--reference">
      <div className="playlist-watermark" aria-hidden>
        Top picks
      </div>
      <div className="playlist-top">
        <div className="playlist-page__shell">
          <article className="playlist-page__card">
            <header className="playlist-page__header" data-aos="fade-up">
              <p className="playlist-page__eyebrow">Projects</p>
              <h1 className="playlist-page__title">Top picks</h1>
              <p className="playlist-page__lead">
                Builds that mirror production work: APIs, data layers, and interfaces people actually use.
              </p>
            </header>

            <div className="row g-4 playlist-page__grid">
              {projectData.map((el, index) => (
                <div className="col-md-6 col-lg-4" key={el.id} data-aos="fade-up" data-aos-delay={index * 50}>
                  <Card className="playlist-card border-0 h-100">
                    <Card.Img
                      variant="top"
                      className="playlist-card__img"
                      src={el.imgsrc}
                      alt=""
                      style={
                        el.previewObjectPosition ? { objectPosition: el.previewObjectPosition } : undefined
                      }
                    />
                    <Card.Body className="playlist-card__body d-flex flex-column">
                      <Card.Title className="playlist-card__title">{el.projectName}</Card.Title>
                      {el.roleLine && <p className="playlist-card__role">{el.roleLine}</p>}
                      {el.tags && (
                        <div className="playlist-card__tags mb-2">
                          {el.tags.map((t) => (
                            <span key={t}>{t}</span>
                          ))}
                        </div>
                      )}
                      <Card.Text className="playlist-card__text flex-grow-1">{el.description}</Card.Text>
                      <div className="playlist-card__actions d-flex flex-column gap-2 align-items-start">
                        {el.demo ? (
                          <Button variant="warning" className="playlist-card__btn">
                            <a
                              href={el.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="playlist-card__btn-link"
                            >
                              {el.demoOnDemand ? "Live site" : "Live demo"}
                            </a>
                          </Button>
                        ) : null}
                        {el.demoOnDemand ? (
                          <span className="playlist-card__muted">Demo on demand — login required for full access.</span>
                        ) : null}
                        {!el.demo ? <span className="playlist-card__muted">Demo on request</span> : null}
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </main>
  );
};

export default Playlist;
