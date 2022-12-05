import React, { useEffect, useState } from "react";
import "./BackToTop.css";
import { FaChevronUp } from "react-icons/fa";

const BackToTop = () => {
  const [backToTop, setBackToTop] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setBackToTop(true);
      } else {
        setBackToTop(false);
      }
    });
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      {backToTop && (
        <button className="btn-style" onClick={scrollUp} title="back to top">
          <FaChevronUp />
        </button>
      )}
    </>
  );
};

export default BackToTop;
