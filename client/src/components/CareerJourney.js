import React, { useEffect, useRef, useState } from "react";
import { journeyStops } from "../content/profile";
import "./CareerJourney.css";

const V_PCT = [8, 28, 48, 68, 88];

/** One smooth open curve: sweep the top row, then bend to “NOW” (no loop) */
const ROUTE_D =
  "M 100 74 C 200 36, 268 44, 302 52 C 402 60, 452 50, 500 54 C 582 48, 648 44, 702 50 C 712 62, 420 92, 104 88";

/** Stops on the route (viewBox 0–800 × 0–100) — bike center tracks these */
const WAYPOINTS = [
  [100, 74],
  [302, 52],
  [500, 54],
  [702, 50],
  [104, 88],
];

function pickClosestStopToViewport(entries) {
  const intersecting = entries.filter((e) => e.isIntersecting);
  if (!intersecting.length) return null;

  const vcx = window.innerWidth / 2;
  const vcy = window.innerHeight / 2;
  let best = intersecting[0];
  let bestD = Infinity;
  intersecting.forEach((e) => {
    const r = e.boundingClientRect;
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const d = (cx - vcx) ** 2 + (cy - vcy) ** 2;
    if (d < bestD) {
      bestD = d;
      best = e;
    }
  });
  const idx = Number(best.target.getAttribute("data-index"));
  return Number.isNaN(idx) ? null : idx;
}

/** When every card stays “intersecting”, IO may not fire again — pick by scroll position. */
function pickClosestStopFromElements(stops) {
  const vcx = window.innerWidth / 2;
  const vcy = window.innerHeight / 2;
  let bestIdx = 0;
  let bestD = Infinity;
  stops.forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.bottom < 0 || r.top > window.innerHeight) return;
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const d = (cx - vcx) ** 2 + (cy - vcy) ** 2;
    if (d < bestD) {
      bestD = d;
      bestIdx = Number(el.getAttribute("data-index"));
    }
  });
  return Number.isNaN(bestIdx) ? 0 : bestIdx;
}

export default function CareerJourney() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const stops = section.querySelectorAll("[data-journey-stop]");
    if (!stops.length) return;

    let raf = 0;
    const syncFromScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        setActiveIndex(pickClosestStopFromElements(stops));
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        const idx = pickClosestStopToViewport(entries);
        if (idx !== null) setActiveIndex(idx);
        else syncFromScroll();
      },
      { root: null, rootMargin: "-28% 0px -28% 0px", threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
    );

    stops.forEach((el) => io.observe(el));
    window.addEventListener("scroll", syncFromScroll, { passive: true });
    window.addEventListener("resize", syncFromScroll, { passive: true });
    syncFromScroll();

    return () => {
      window.removeEventListener("scroll", syncFromScroll);
      window.removeEventListener("resize", syncFromScroll);
      if (raf) window.cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  const i = Math.min(activeIndex, WAYPOINTS.length - 1);
  const [bx, by] = WAYPOINTS[i];
  const bikeLeftPct = (bx / 800) * 100;
  const bikeTopPct = (by / 100) * 100;
  const vTop = V_PCT[Math.min(activeIndex, V_PCT.length - 1)];

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
            <svg className="career-journey__svg" viewBox="0 0 800 100" preserveAspectRatio="xMidYMid meet">
              <path className="career-journey__road" fill="none" d={ROUTE_D} />
              {WAYPOINTS.map(([cx, cy], idx) => (
                <g key={idx} className="career-journey__waypoint">
                  <circle cx={cx} cy={cy} r="8" className="career-journey__waypoint-halo" />
                  <circle cx={cx} cy={cy} r="4" className="career-journey__waypoint-dot" />
                </g>
              ))}
            </svg>
            <span
              className={`career-journey__bike career-journey__bike--h ${activeIndex === 4 ? "is-last-leg" : ""}`}
              style={{
                left: `${bikeLeftPct}%`,
                top: `${bikeTopPct}%`,
              }}
            >
              <i className="fa-solid fa-bicycle" aria-hidden />
            </span>
          </div>

          <div className="career-journey__map career-journey__map--vertical" aria-hidden>
            <div className="career-journey__vline" />
            <span className="career-journey__bike career-journey__bike--v" style={{ top: `${vTop}%` }}>
              <i className="fa-solid fa-bicycle" aria-hidden />
            </span>
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
