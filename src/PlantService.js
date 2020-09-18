import axios from "axios";

const BASE_URL = "https://plant-api-sierra.herokuapp.com";

const getPlants = () => {
  return axios.get(`${BASE_URL}/api/plants`);
};

const getPlant = (plantId) => {
  return axios.get(`${BASE_URL}/api/plants/${plantId}`);
};

const createPlant = (plant) => {
  return axios.post(`${BASE_URL}/api/plants`, plant);
};

const updatePlant = (plantId, plant) => {
  return axios.put(`${BASE_URL}/api/plants/${plantId}`, plant);
};

const deletePlant = (plantId) => {
  return axios.delete(`${BASE_URL}/api/plants/${plantId}`);
};

export { getPlants, getPlant, createPlant, updatePlant, deletePlant };
