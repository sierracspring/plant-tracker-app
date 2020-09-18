import React from "react";
import "./Plant.css";

function Plant({ plant, handleEditPlant }) {
  return (
    <div className="plant-container">
      <div className="tooltip">
        <img
          className="img"
          src={`./thumbnails/${plant.imageUrl}`}
          alt={plant.name}
          onError={(e) => (e.target.src = "./no-image.jpg")}
        />{" "}
        <span className="tooltiptext">
          <div>Category: {plant.category}</div>
          <div>Sun: {plant.sun}</div>
          <div>Water: {plant.water}</div>
        </span>
      </div>
      <div>{plant.name}</div>
      <button className="edit-button" onClick={() => handleEditPlant(plant)}>
        EDIT
      </button>
    </div>
  );
}

export default Plant;
