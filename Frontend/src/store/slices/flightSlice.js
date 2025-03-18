// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { getFlights } from "../../services/flightService";

// export const fetchFlights = createAsyncThunk("flights/fetchFlights", async () => {
//   const response = await getFlights();
//   return response;
// });

// const flightSlice = createSlice({
//   name: "flights",
//   initialState: { flights: [], status: "idle", error: null },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchFlights.pending, (state) => { state.status = "loading"; })
//       .addCase(fetchFlights.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.flights = action.payload;
//       })
//       .addCase(fetchFlights.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       });
//   },
// });

// export default flightSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const flightSlice = createSlice({
  name: "flight",
  initialState: { flights: [] },
  reducers: {
    setFlights: (state, action) => {
      state.flights = action.payload;
    },
  },
});

export const { setFlights } = flightSlice.actions;
export default flightSlice.reducer;
