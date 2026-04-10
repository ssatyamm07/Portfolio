import React, { useEffect, useRef, useState } from "react";
import { journeyStops } from "../content/profile";
import "./CareerJourney.css";

const H_POSITIONS_PCT = [8, 34, 60, 86];
const V_POSITIONS_PCT = [6, 32, 58, 84];

/** Generic delivery-style bike icon */
function JourneyVehicle({ className, style }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 48 32"
      width="48"
      height="32"
      aria-hidden
    >
      <ellipse cx="12" cy="26" rx="6" ry="5" fill="currentColor" opacity="0.9" />
      <ellipse cx="36" cy="26" rx="6" ry="5" fill="currentColor" opacity="0.9" />
      <path
        d="M8 22 L18 12 L32 12 L38 18 L40 22 Z"
        fill="currentColor"
        opacity="0.95"
      />
      <path d="M18 12 L22 6 L30 8 L32 12 Z" fill="currentColor" />
      <circle cx="12" cy="26" r="2" fill="#0f0f12" />
      <circle cx="36" cy="26" r="2" fill="#0f0f12" />
    </svg>
  );
}

export default function CareerJourney() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const stops = section.querySelectorAll("[data-journey-stop]");
    if (!stops.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = Number(entry.target.getAttribute("data-index"));
          if (!Number.isNaN(idx)) setActiveIndex(idx);
        });
      },
      { root: null, rootMargin: "-38% 0px -42% 0px", threshold: 0 }
    );

    stops.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const hLeft = H_POSITIONS_PCT[Math.min(activeIndex, H_POSITIONS_PCT.length - 1)];
  const vTop = V_POSITIONS_PCT[Math.min(activeIndex, V_POSITIONS_PCT.length - 1)];

  return (
    <section className="career-journey" id="journey" ref={sectionRef} aria-labelledby="journey-heading">
      <div className="career-journey__container">
        <h2 id="journey-heading" className="career-journey__title">
          Career route
        </h2>
        <p className="career-journey__lead">
          From campus to Swiggy — a map-style view of the journey so far.
        </p>

        <div className="career-journey__layout">
          <div className="career-journey__map career-journey__map--horizontal" aria-hidden>
            <svg className="career-journey__svg" viewBox="0 0 900 100" preserveAspectRatio="xMidYMid meet">
              <path
                className="career-journey__road"
                d="M 40 70 Q 230 25, 450 55 T 860 68"
                fill="none"
              />
            </svg>
            <JourneyVehicle
              className="career-journey__vehicle career-journey__vehicle--h"
              style={{
                left: `${hLeft}%`,
 }}
            />
          </div>

          <div className="career-journey__map career-journey__map--vertical" aria-hidden>
            <div className="career-journey__vline" />
            <JourneyVehicle
              className="career-journey__vehicle career-journey__vehicle--v"
              style={{ top: `${vTop}%` }}
            />
          </div>

          <ol className="career-journey__stops">
            {journeyStops.map((stop, index) => (
              <li
                key={stop.id}
                className={`career-journey__stop ${activeIndex === index ? "is-active" : ""}`}
                data-journey-stop
                data-index={index}
              >
                <div className="career-journey__stop-card">
                  <span className="career-journey__stop-year">{stop.year}</span>
                  <h3 className="career-journey__stop-label">{stop.label}</h3>
                  <p className="career-journey__stop-sub">{stop.sub}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
