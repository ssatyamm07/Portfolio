import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";
import { social } from "../content/profile";

const RESUME_PATH = "/Satyam_Resume.pdf";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__section">
          <h4 className="footer__title">Satyam Kumar</h4>
          <p className="footer__muted">© {year} All rights reserved</p>
          <div className="footer__socials">
            <a href={social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <i className="fa-brands fa-github" />
            </a>
            <a href={social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i className="fa-brands fa-linkedin" />
            </a>
          </div>
        </div>

        <div className="footer__section">
          <h4 className="footer__title">Contact</h4>
          <p className="footer__line">
            <i className="fa-solid fa-envelope" aria-hidden /> {social.email}
          </p>
          <p className="footer__line">
            <i className="fa-solid fa-phone" aria-hidden /> {social.phoneDisplay}
          </p>
          <p className="footer__line">
            <i className="fa-solid fa-location-dot" aria-hidden /> {social.location}
          </p>
        </div>

        <div className="footer__section">
          <h4 className="footer__title">Quick links</h4>
          <p>
            <a href={RESUME_PATH} className="footer__link" download="Satyam_Kumar_Resume.pdf">
              Download resume
            </a>
          </p>
          <p>
            <Link to="/playlist" className="footer__link">
              All projects
            </Link>
          </p>
          <p>
            <Link to="/contact" className="footer__link">
              Hire me
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
