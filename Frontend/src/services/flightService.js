import API from "./api";

export const getFlights = async () => {
  try {
    const response = await API.get("/flights");
    return response.data;
  } catch (error) {
    console.error("Error fetching flights:", error);
    throw error;
  }
};

export const addFlight = async (flightData) => {
  try {
    const response = await API.post("/flights", flightData);
    return response.data;
  } catch (error) {
    console.error("Error adding flight:", error);
    throw error;
  }
};
