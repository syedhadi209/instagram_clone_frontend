import React, { useState } from "react";
import "./Carousel.css";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";

const Carousal = ({ items, edit }) => {
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
      {items.length > 1 && (
        <button onClick={goToPreviousSlide} className="prev-button">
          <MdArrowBackIos size={15} color="white" />
        </button>
      )}
      <div className="carousel-content">
        {edit && (
          <AiFillDelete
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              cursor: "pointer",
            }}
            fill="red"
            size={25}
          />
        )}
        <img
          src={items[currentIndex]?.url}
          style={{ width: "100%", height: "100%" }}
          alt="carousal"
        />
      </div>
      {items.length > 1 && (
        <button onClick={goToNextSlide} className="next-button">
          <MdArrowForwardIos size={15} color="white" style={{ zIndex: "0" }} />
        </button>
      )}
    </div>
  );
};

export default Carousal;
