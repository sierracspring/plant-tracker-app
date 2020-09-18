import React from "react";
import "./LoadingSpinner.css";

function LoadingSpinner() {
  return (
    <div className="loading-spinner-container">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default LoadingSpinner;
