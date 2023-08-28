import React from "react";
import "./Stories.css";
import { AiOutlinePlus } from "react-icons/ai";

const Stories = () => {
  return (
    <div className="stories-main">
      <div className="story-circle">
        <AiOutlinePlus size={20} />
      </div>
      <div className="story-circle"></div>
    </div>
  );
};

export default Stories;
