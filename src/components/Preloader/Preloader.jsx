import React from "react";
import "./Preloader.css";

function Preloader() {
  return (
    <div className="circle__container">
      <div className="circle__preloader-circle"></div>
      <div className="preloader__text-container">Searching for news...</div>
    </div>
  );
}

export default Preloader;
