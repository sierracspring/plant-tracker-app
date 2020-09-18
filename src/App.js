import React from "react";
import "./App.css";
import PlantGrid from "./components/PlantGrid";
import Modal from "./components/Modal";
import AddEditPlantForm from "./components/AddEditPlantForm";
import LoadingSpinner from "./components/LoadingSpinner";
import {
  getPlants,
  createPlant,
  updatePlant,
  deletePlant,
} from "./PlantService";

function App() {
  const [
    isShowingAddEditPlantModal,
    setIsShowingAddEditPlantModal,
  ] = React.useState(false);
  const [currentPlant, setCurrentPlant] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [originalPlants, setOriginalPlants] = React.useState([]);
  const [plants, setPlants] = React.useState(() => {
    fetchPlants();

    return [];
  });
  const [searchQuery, setSearchQuery] = React.useState("");
  React.useEffect(() => {
    if (!searchQuery) {
      setPlants(originalPlants);
      return;
    }

    const filteredPlants = originalPlants.filter((plant) => {
      const searchQueryLowerCase = searchQuery.toLowerCase();
      const plantNameLowerCase = plant.name.toLowerCase();

      if (
        plantNameLowerCase.startsWith(searchQueryLowerCase) ||
        plantNameLowerCase.includes(searchQueryLowerCase)
      ) {
        return true;
      }
    });

    setPlants(filteredPlants);
  }, [searchQuery]);

  function fetchPlants() {
    setIsLoading(true);

    getPlants()
      .then((response) => {
        setOriginalPlants(response.data);
        setPlants(response.data);
      })
      .catch((error) => {
        debugger;
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlantClick() {
    setCurrentPlant(null);
    setIsShowingAddEditPlantModal(true);
  }

  function handleCloseModal() {
    setIsShowingAddEditPlantModal(false);
  }

  function handleCreatePlant(plant) {
    createPlant(plant)
      .then((response) => {
        setIsShowingAddEditPlantModal(false);
        alert("SUCCESSFULLY CREATED NEW ITEM");
        fetchPlants();
      })
      .catch((error) => {
        alert(error);
      });
  }

  function handleEditPlant(plant) {
    setCurrentPlant(plant);
    setIsShowingAddEditPlantModal(true);
  }

  function handleUpdatePlant(plant) {
    updatePlant(plant._id, plant)
      .then((response) => {
        setIsShowingAddEditPlantModal(false);
        alert("SUCCESSFULLY UPDATED PLANT");
        fetchPlants();
      })
      .catch((error) => {
        alert(error);
      });
  }

  function handleDeletePlant(plantId) {
    deletePlant(plantId)
      .then((response) => {
        setIsShowingAddEditPlantModal(false);
        alert("SUCCESFULLY DELETED PLANT");
        fetchPlants();
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <div className="App">
      <button className="add-button" onClick={handleAddPlantClick}>
        ADD PLANT
      </button>

      {isShowingAddEditPlantModal ? (
        <Modal>
          <AddEditPlantForm
            existingPlant={currentPlant}
            handleCloseModal={handleCloseModal}
            handleCreatePlant={handleCreatePlant}
            handleUpdatePlant={handleUpdatePlant}
            handleDeletePlant={handleDeletePlant}
          />
        </Modal>
      ) : null}
      <div className="title-search">
        <h1 className="header">Plant Tracker</h1>
        <input
          type="text"
          className="search-input"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
      </div>
      {isLoading ? <LoadingSpinner /> : null}
      <PlantGrid plants={plants} handleEditPlant={handleEditPlant} />
      {!isLoading && plants.length === 0 ? <h3>No Results Found</h3> : null}
    </div>
  );
}

export default App;
