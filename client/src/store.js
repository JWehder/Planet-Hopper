import { configureStore } from "@reduxjs/toolkit";
import listingsReducer from "./features/listing/state/listingsSlice";
import authReducer from "./features/auth/state/authSlice"

const store = configureStore({
  reducer: {
    listings: listingsReducer,
    auth: authReducer
  },
});

export default store;