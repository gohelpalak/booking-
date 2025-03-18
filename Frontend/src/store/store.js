import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import bookingReducer from "./slices/bookingSlice";
import flightReducer from "./slices/flightSlice";
import hotelReducer from "./slices/hotelSlice";
import carReducer from "./slices/carSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    booking: bookingReducer,
    flight: flightReducer,
    hotel: hotelReducer,
    car: carReducer,
  },
});

export default store;
