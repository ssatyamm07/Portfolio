import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import "./Header.css"; // Optional if you want custom styles

const Header = () => {
  const linkStyle = {
    marginRight: "15px",
    fontSize: "17px",
    letterSpacing: ".5px",
    color: "#333",
    transition: "color 0.3s ease",
  };

  const handleResumeDownload = () => {
    window.open("/Satyam_Resume.pdf", "_blank"); 
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand href="/" style={{ color: "#6c63ff", fontWeight: "bold" }}>
            <h3 className="m-0">Satyam Kumar</h3>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar-nav" />

          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto d-flex align-items-center gap-3">
              {["/", "/About", "/playlist", "/Contact"].map((path, idx) => {
                const names = ["Home", "About", "Playlist", "Contact"];
                return (
                  <NavLink
                    key={path}
                    to={path}
                    className="text-decoration-none nav-link-custom"
                    style={({ isActive }) => ({
                      ...linkStyle,
                      color: isActive ? "#6c63ff" : "#333",
                    })}
                  >
                    {names[idx]}
                  </NavLink>
                );
              })}

              <Button variant="outline-primary" className="resume-btn" onClick={handleResumeDownload}>
                Resume
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
