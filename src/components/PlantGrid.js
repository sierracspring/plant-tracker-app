import React from "react";
import Plant from "./Plant";
import "./PlantGrid.css";

function PlantGrid({ plants, handleEditPlant }) {
  return (
    <div className="plant-grid-container">
      {plants && plants.length
        ? plants.map((plant) => {
            return (
              <Plant
                plant={plant}
                key={plant._id}
                handleEditPlant={handleEditPlant}
              />
            );
          })
        : null}
    </div>
  );
}

export default PlantGrid;
