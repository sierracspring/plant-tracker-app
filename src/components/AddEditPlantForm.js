import React from "react";
import "./AddEditPlantForm.css";
import categories from "../categories.json";

function AddEditPlantForm({
  handleCloseModal,
  handleCreatePlant,
  existingPlant,
  handleUpdatePlant,
  handleDeletePlant,
}) {
  const [name, setName] = React.useState(
    existingPlant ? existingPlant.name : ""
  );
  const [category, setCategory] = React.useState(
    existingPlant ? existingPlant.category : ""
  );
  const [sun, setSun] = React.useState(existingPlant ? existingPlant.sun : "");
  const [water, setWater] = React.useState(
    existingPlant ? existingPlant.water : ""
  );
  const [errors, setErrors] = React.useState({
    name: null,
    category: null,
    sun: null,
    water: null,
  });

  function handleSubmit(event) {
    event.preventDefault();

    const errors = {
      name: null,
      category: null,
      sun: null,
      water: null,
    };

    if (name.length === 0) {
      errors.name = "Plant Name Cannot be Empty";
    }

    if (!category || category === "all") {
      errors.category = "Plant Category Must Not be Empty nor All";
    }

    if (sun.length === 0) {
      errors.sun = "Plant Sun Cannot be Empty";
    }

    if (water.length === 0) {
      errors.water = "Plant Water Cannot be Empty";
    }

    if (errors.name || errors.category || errors.sun || errors.water) {
      setErrors(errors);
      return;
    }

    const plant = {
      name: name,
      category: category,
      sun: sun,
      water: water,
    };

    if (existingPlant) {
      plant._id = existingPlant._id;
      handleUpdatePlant(plant);
    } else {
      handleCreatePlant(plant);
    }
  }

  return (
    <div className="add-edit-plant-form-container">
      <h1>{existingPlant ? "Edit Plant" : "Add Plant"}</h1>
      <form onSubmit={handleSubmit} className="plant-form">
        <label>
          Name<span className="required">*</span>:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={errors.name ? "invalid" : ""}
          />
          {errors.name ? <span className="required">{errors.name}</span> : null}
        </label>
        <label>
          Category<span className="required">*</span>:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option></option>
            {categories.map((category) => {
              return (
                <option value={category.value} key={category.value}>
                  {category.label}
                </option>
              );
            })}
          </select>
          {errors.category ? (
            <span className="required">{errors.category}</span>
          ) : null}
        </label>
        <label>
          Sun<span className="required">*</span>:
          <input
            type="text"
            value={sun}
            onChange={(e) => setSun(e.target.value)}
            className={errors.sun ? "invalid" : ""}
          />
          {errors.sun ? <span className="required">{errors.sun}</span> : null}
        </label>
        <label>
          Water<span className="required">*</span>:
          <input
            type="text"
            value={water}
            onChange={(e) => setWater(e.target.value)}
            className={errors.water ? "invalid" : ""}
          />
          {errors.water ? (
            <span className="required">{errors.water}</span>
          ) : null}
        </label>
        <button>{existingPlant ? "SAVE & CLOSE" : "CREATE & CLOSE"}</button>
      </form>
      <button className="close-button" onClick={handleCloseModal}>
        CLOSE
      </button>
      {existingPlant ? (
        <button
          classname="delete-button"
          onClick={() => handleDeletePlant(existingPlant._id)}
        >
          DELETE
        </button>
      ) : null}
    </div>
  );
}

export default AddEditPlantForm;
