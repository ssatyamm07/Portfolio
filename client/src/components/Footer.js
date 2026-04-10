import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";
import { footerContent, social } from "../content/profile";

function FooterLink({ link }) {
  if (link.to) {
    return (
      <li>
        <Link to={link.to} className="footer__link">
          {link.label}
        </Link>
      </li>
    );
  }
  return (
    <li>
      <a
        href={link.href}
        className="footer__link"
        {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(link.download ? { download: link.download } : {})}
      >
        {link.label}
      </a>
    </li>
  );
}

const Footer = () => {
  const year = new Date().getFullYear();
  const { columns, brandLine, brandSub, finePrint, availableTitle, availableLine, socialTitle, bottomPitch, bottomPrimary, bottomSecondary } =
    footerContent;

  return (
    <footer className="footer footer--swiggy">
      <div className="footer__main">
        <div className="footer__grid">
          <div className="footer__brand-col">
            <div className="footer__logo-mark" aria-hidden>
              <i className="fa-solid fa-location-dot" />
            </div>
            <div className="footer__brand-text">
              <span className="footer__brand-name">{brandLine}</span>
              <span className="footer__brand-tag">{brandSub}</span>
            </div>
            <p className="footer__fine">{finePrint(year)}</p>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="footer__col">
              <h3 className="footer__col-title">{col.title}</h3>
              <ul className="footer__list">
                {col.links.map((link) => (
                  <FooterLink key={`${col.title}-${link.label}`} link={link} />
                ))}
              </ul>
            </div>
          ))}

          <div className="footer__col">
            <h3 className="footer__col-title">{availableTitle}</h3>
            <p className="footer__plain">{availableLine}</p>
            <h3 className="footer__col-title footer__col-title--spaced">{socialTitle}</h3>
            <div className="footer__socials">
              <a href={social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <i className="fa-brands fa-linkedin" />
              </a>
              <a href={social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <i className="fa-brands fa-github" />
              </a>
              <a href={`mailto:${social.email}`} aria-label="Email">
                <i className="fa-solid fa-envelope" />
              </a>
            </div>
          </div>
        </div>

        <div className="footer__rule" />

        <div className="footer__bottom">
          <p className="footer__pitch">{bottomPitch}</p>
          <div className="footer__bottom-btns">
            <Link to={bottomPrimary.to} className="footer__pill footer__pill--dark">
              {bottomPrimary.label}
            </Link>
            <a
              href={bottomSecondary.href}
              className="footer__pill footer__pill--dark"
              download={bottomSecondary.download}
            >
              {bottomSecondary.label}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
