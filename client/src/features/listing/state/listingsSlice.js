import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchWrapper } from "../../../utils/helpers";

// posts the user's location to my backend. uses that data to find listings nearby the user
export const fetchListings = createAsyncThunk("listings/fetchListings", (locationObj, thunkAPI) => {
    return fetchWrapper.post("/homepage_listings", locationObj, thunkAPI)
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
        [fetchListings.pending]: (state) => {
            state.status = "loading";
        },
        [fetchListings.fulfilled]: (state, action) => {
            state.entities = action.payload
            state.status = "idle";
        },
        [fetchListings.rejected]: (state, action) => {
            console.log("rejected!")
            console.log(action.payload)
            state.signupError = action.payload
        },
    },
});

export default listingsSlice.reducer;