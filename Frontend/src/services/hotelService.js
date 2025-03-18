import API from "./api";

export const getHotels = async () => {
  try {
    const response = await API.get("/hotels");
    return response.data;
  } catch (error) {
    console.error("Error fetching hotels:", error);
    throw error;
  }
};

export const addHotel = async (hotelData) => {
  try {
    const response = await API.post("/hotels", hotelData);
    return response.data;
  } catch (error) {
    console.error("Error adding hotel:", error);
    throw error;
  }
};
