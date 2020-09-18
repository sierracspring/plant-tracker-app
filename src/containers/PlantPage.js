import React from "react";
import { getPlant } from "../PlantService";

function PlantPage(props) {
  const plantId = props.match.params.plantId;

  const [plant, setPlant] = React.useState(null);
  React.useEffect(() => {
    getPlant(plantId)
      .then((response) => {
        const plant = response.data;
        setPlant(plant);
      })
      .catch((error) => {
        alert(`No Pland with ID of '${plantId}' exists!`);
        props.history.push("/");
      });
  }, [plantId]);

  return (
    <div className="plant-page">
      {plant ? (
        <>
          <h1>{plant.name}</h1>
          <h3>${plant.price}</h3>
          <p>Some Product Description</p>
          <img
            src={`/thumbnails/${plant.imageUrl}`}
            alt={plant.name}
            onError={(e) => (e.target.src = "./no-image.jpeg")}
          />
        </>
      ) : null}
    </div>
  );
}

export default PlantPage;
