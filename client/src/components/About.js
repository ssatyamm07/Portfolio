import React from 'react';
import "./About.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
      <div className="container mb-5 about_container" style={{ minHeight: "100%" }}>
        <div className="main_container d-flex justify-content-around flex-wrap align-items-center">
          {/* Left Text */}
          <div className="left_container mt-5" style={{ maxWidth: 550 }} data-aos="fade-right">
            <h2 className="mb-3">Meet <span style={{ color: "#6c63ff" }}>Satyam Kumar</span></h2>
            <p style={{ color: "#555", lineHeight: "1.8", fontSize: "17px" }}>
              I’m a passionate <strong>MERN Stack Developer</strong> specializing in backend development. With a love for building scalable APIs and clean architectures, I enjoy turning complex problems into elegant technical solutions.
              <br /><br />
              I’m always exploring new technologies and love to stay updated with modern practices. Whether it’s crafting RESTful APIs, working with databases, or diving into DevOps – I love the entire process of bringing ideas to life through code.
              <br /><br />
              Outside coding, I enjoy exploring tech trends, working on side projects, and helping others grow in tech.
            </p>
          </div>

          {/* Right Image */}
          <div className="right_container mt-4" data-aos="fade-left">
            <img
              src="/ChatGPT Image Apr 1, 2025, 12_59_55 PM.png"
              alt="about-logo"
              className="about_img"
              style={{ maxWidth: "100%", height: "auto", borderRadius: "10px" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
