import React, { useState } from "react";
import "./Carousel.css";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const goToPreviousSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + items.length) % items.length
    );
  };
  return (
    <div className="carousel">
      <button onClick={goToPreviousSlide} className="prev-button">
        <MdArrowBackIos size={20} color="white" />
      </button>
      <div className="carousel-content">
        <img
          src={items[currentIndex]}
          style={{ width: "100%", height: "100%" }}
          alt="carousal"
        />
      </div>
      <button onClick={goToNextSlide} className="next-button">
        <MdArrowForwardIos size={20} color="white" />
      </button>
    </div>
  );
};

export default Carousel;
