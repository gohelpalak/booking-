import API from "./api";

export const bookFlight = async (bookingData) => {
  try {
    const response = await API.post("/bookings", bookingData);
    return response.data;
  } catch (error) {
    console.error("Error booking flight:", error);
    throw error;
  }
};

export const getUserBookings = async (userId) => {
  try {
    const response = await API.get(`/bookings/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
};
