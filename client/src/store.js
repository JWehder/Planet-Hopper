import { configureStore } from "@reduxjs/toolkit";
import listingsReducer from "./features/listing/state/listingsSlice";
import authReducer from "./features/auth/state/authSlice"
import bookingsReducer from "./features/booking/state/bookingsSlice"

const store = configureStore({
  reducer: {
    listings: listingsReducer,
    auth: authReducer,
    bookings: bookingsReducer
  },
});

export default store;