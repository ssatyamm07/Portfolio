import React, { useEffect, useRef, useState } from "react";
import { quickCartItems, quickCartCopy, skills } from "../content/profile";
import "./QuickCart.css";

const skillChips = [
  ...skills.languages.slice(0, 3),
  ...skills.cloud.slice(0, 3),
];

export default function QuickCart() {
  const [open, setOpen] = useState(false);
  const closeBtnRef = useRef(null);
  const previouslyFocused = useRef(null);

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement;

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    window.setTimeout(() => closeBtnRef.current?.focus(), 10);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      previouslyFocused.current?.focus?.();
    };
  }, [open]);

  return (
    <>
      <div className="quick-cart-bar" role="region" aria-label="Quick actions bar">
        <button
          type="button"
          className="quick-cart-bar__toggle"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="quick-cart-drawer"
        >
          <span className="quick-cart-bar__icon" aria-hidden>
            <i className="fa-solid fa-bag-shopping" />
          </span>
          <span className="quick-cart-bar__text">
            <strong>{quickCartCopy.barTitle}</strong>
            <span>{quickCartCopy.barSub}</span>
          </span>
        </button>
      </div>

      <div
        className={`quick-cart-backdrop ${open ? "is-open" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />

      <div
        id="quick-cart-drawer"
        className={`quick-cart-drawer ${open ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-cart-title"
        aria-hidden={!open}
      >
        <div className="quick-cart-drawer__handle" aria-hidden />
        <div className="quick-cart-drawer__head">
          <h2 id="quick-cart-title" className="quick-cart-drawer__title">
            {quickCartCopy.drawerTitle}
          </h2>
          <button
            ref={closeBtnRef}
            type="button"
            className="quick-cart-drawer__close"
            onClick={() => setOpen(false)}
            aria-label="Close quick actions"
          >
            <i className="fa-solid fa-xmark" aria-hidden />
          </button>
        </div>

        <p className="quick-cart-drawer__sub">{quickCartCopy.drawerSub}</p>

        <ul className="quick-cart-drawer__list">
          {quickCartItems.map((item) => (
            <li key={item.id}>
              <a
                className="quick-cart-drawer__item"
                href={item.href}
                {...(item.download ? { download: item.download } : {})}
                {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                onClick={() => setOpen(false)}
              >
                <i
                  className={item.icon.includes("fa-brands") ? item.icon : `fa-solid ${item.icon}`}
                  aria-hidden
                />
                <span>{item.label}</span>
                <i className="fa-solid fa-chevron-right quick-cart-drawer__chev" aria-hidden />
              </a>
            </li>
          ))}
        </ul>

        <div className="quick-cart-drawer__chips-section">
          <h3 className="quick-cart-drawer__chips-label">Popular sides</h3>
          <div className="quick-cart-drawer__chips">
            {skillChips.map((s) => (
              <span key={s} className="quick-cart-drawer__chip">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
