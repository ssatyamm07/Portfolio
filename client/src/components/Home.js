import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Typical from "react-typical";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Home.css";

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
      <div className="container home_container py-5">
        <div className="home_innerdiv d-flex flex-column flex-md-row align-items-center justify-content-between gap-4">
          
          {/* Left Content */}
          <div className="left_div" data-aos="fade-right">
            <h2 className="mb-3">
              Hello, I'm <span style={{ color: "#6c63ff" }}>Satyam Kumar</span>
            </h2>

            {/* Typing Animation */}
            <h4 className="typing-text mb-3">
              <Typical
                steps={[
                  "MERN Stack Developer 💻", 2000,
                  "Backend Specialist 🔧", 2000,
                  "Tech Explorer 🚀", 2000,
                ]}
                loop={Infinity}
                wrapper="span"
              />
            </h4>

            <p style={{ color: "#666", letterSpacing: ".5px", maxWidth: "600px" }}>
              I create full-stack web apps using React, Node, and MongoDB. I'm passionate about building scalable backends, writing clean code, and creating meaningful digital solutions.
            </p>

            {/* Skills List */}
            <ul className="skills-list mt-3">
              <li>✅ RESTful APIs</li>
              <li>✅ MongoDB, Express, Node.js</li>
              <li>✅ JWT Auth & Middleware</li>
              <li>✅ WebSocket & Real-time Chat</li>
            </ul>

            {/* Buttons */}
            
<div className="btn_div mt-4 d-flex gap-3">
  {/* Download Resume Button */}
  <Button
    className="custom-btn-dark"
    as="a"
    href="/Satyam_Resume.pdf" 
    download="Satyam_Kumar_Resume.pdf"  // Added the download attribute
    target="_blank"
  >
    Download Resume
  </Button>

  {/* Let's Connect Button */}
  <Button
    className="custom-btn-purple"
    as="a"
    href="https://www.linkedin.com/in/satyam-kumar-426b13226/" 
    target="_blank"
  >
    Let's Connect
  </Button>
</div>

          </div>

          {/* Right Content */}
          <div className="right_div" data-aos="zoom-in">
            <img src="undraw_programmer_raqr.png" alt="developer" className="home_img img-fluid" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
