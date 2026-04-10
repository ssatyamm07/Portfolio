import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Header.css";

const RESUME_PATH = "/Satyam_Resume.pdf";

const Header = () => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const journeyHref = isHome ? "#journey" : "/#journey";
  const projectsHref = isHome ? "#projects" : "/#projects";
  const contactHref = isHome ? "#contact" : "/contact";

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <NavLink to="/" className="site-header__brand" end>
          <span className="site-header__brand-name">Satyam Kumar</span>
          <span className="site-header__brand-role">Engineer · B2B automation</span>
        </NavLink>

        <nav className="site-header__nav" aria-label="Main">
          <NavLink to="/" className="site-header__link" end>
            Home
          </NavLink>
          <a href={journeyHref} className="site-header__link site-header__link--anchor">
            Journey
          </a>
          <a href={projectsHref} className="site-header__link site-header__link--anchor">
            Projects
          </a>
          <NavLink to="/about" className="site-header__link">
            About
          </NavLink>
          <a href={contactHref} className="site-header__link site-header__link--anchor">
            Contact
          </a>
          <a
            className="site-header__cta"
            href={RESUME_PATH}
            download="Satyam_Kumar_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
