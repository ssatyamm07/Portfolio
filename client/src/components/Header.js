import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Header.css";
import { appNav, social } from "../content/profile";

const RESUME_PATH = "/Satyam_Resume.pdf";

const Header = () => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const journeyHref = isHome ? "#journey" : "/#journey";
  const projectsHref = isHome ? "#projects" : "/#projects";
  const contactHref = isHome ? "#contact" : "/contact";

  return (
    <header className="site-header">
      <div className="site-header__stripe" aria-hidden />
      <div className="site-header__bar">
        <div className="site-header__inner">
          <NavLink to="/" className="site-header__brand" end>
            <img
              src={`${process.env.PUBLIC_URL}/favicon.svg`}
              alt=""
              width="40"
              height="40"
              className="site-header__brand-mark"
              decoding="async"
            />
            <span className="site-header__brand-stack">
              <span className="site-header__brand-name">Satyam Kumar</span>
              <span className="site-header__brand-role">Backend · automation</span>
            </span>
          </NavLink>

          <nav className="site-header__nav" aria-label="Main">
            <NavLink to="/" className="site-header__link" end>
              {appNav.home}
            </NavLink>
            <a href={journeyHref} className="site-header__link site-header__link--anchor">
              {appNav.journey}
            </a>
            <a href={projectsHref} className="site-header__link site-header__link--anchor">
              {appNav.projects}
            </a>
            <NavLink to="/about" className="site-header__link">
              {appNav.about}
            </NavLink>
            <a href={contactHref} className="site-header__link site-header__link--anchor">
              {appNav.contact}
            </a>
          </nav>

          <div className="site-header__actions">
            <a
              className="site-header__cta"
              href={RESUME_PATH}
              download="Satyam_Kumar_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>
            <a
              className="site-header__email"
              href={`mailto:${social.email}`}
              aria-label={`Email ${social.email}`}
              title={social.email}
            >
              <span className="site-header__email-icon" aria-hidden>
                <i className="fa-solid fa-envelope" />
              </span>
              <span className="visually-hidden">{social.email}</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
