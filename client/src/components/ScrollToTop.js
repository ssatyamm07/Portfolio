import React, { useState, useEffect } from 'react';
import './scrollToTop.css';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(window.pageYOffset > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div className={`scroll-to-top ${isVisible ? 'show' : ''}`}>
      <button onClick={scrollToTop} className="scroll-button" aria-label="Scroll to top">
        <i className="fa-solid fa-arrow-up"></i>
      </button>
    </div>
  );
};

export default ScrollToTop;
