import React from 'react';
import './footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer text-white py-5">
      <div className="container footer_container d-flex justify-content-between flex-wrap">
        
        {/* Branding + Socials */}
        <div className="footer_section mb-4">
          <h4 className="footer_title">Satyam Kumar</h4>
          <p className="mb-2">© {year} All rights reserved</p>
          <div className="social_icons d-flex align-items-center">
            
            <a href="" target="_blank" rel="noopener noreferrer" className="me-3">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="" target="_blank" rel="noopener noreferrer" className="me-3">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="https://github.com/ssatyamm07" target="_blank" rel="noopener noreferrer" className="me-3">
              <i className="fa-brands fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/satyam-kumar-426b13226/" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div className="footer_section mb-4">
          <h4 className="footer_title">Contact</h4>
          <p className="mb-1"><i className="fa-solid fa-envelope me-2"></i>satyamraj151.rajgir@gmail.com</p>
          <p className="mb-1"><i className="fa-solid fa-phone me-2"></i>+91 8340429200</p>
          <p><i className="fa-solid fa-location-dot me-2"></i>Vadodara, Gujarat, India</p>
        </div>

        {/* Useful Links */}
        <div className="footer_section mb-4">
          <h4 className="footer_title">Quick Links</h4>
          <p><a href="/Satyam_Resume.pdf" className="footer_link">Download Resume</a></p>
          <p><a href="./playlist" className="footer_link">Projects</a></p>
          <p><a href="/contact" className="footer_link">Hire Me</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
