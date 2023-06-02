import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchWrapper } from "../../../utils/helpers";

export const fetchListings = createAsyncThunk("listings/fetchListings", () => {
    return fetchWrapper.get("/listings/homepage_listings")
});

const listingsSlice = createSlice({
    name: "listings",
    initialState: {
        entities: [],
        status: "idle"
    },
    // sync reducers
    reducers: {
    },
    // async reducers
    extraReducers: {
        [fetchListings.pending](state) {
            state.status = "loading";
        },
        [fetchListings.fulfilled](state, action) {
            state.entities = action.payload
            state.status = "idle";
        },
    },
});

export default listingsSlice.reducer;