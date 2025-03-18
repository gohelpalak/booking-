import API from "./api";

export const getCars = async () => {
  try {
    const response = await API.get("/cars");
    return response.data;
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw error;
  }
};

export const addCar = async (carData) => {
  try {
    const response = await API.post("/cars", carData);
    return response.data;
  } catch (error) {
    console.error("Error adding car:", error);
    throw error;
  }
};
