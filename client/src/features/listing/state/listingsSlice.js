import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchWrapper } from "../../../utils/helpers";

// posts the user's location to my backend. uses that data to find listings nearby the user
export const fetchListings = createAsyncThunk("listings/fetchListings", (locationObj, thunkAPI) => {
    return fetchWrapper.post("/listings/homepage_listings", locationObj, thunkAPI)
});

export const searchForListings = createAsyncThunk("listings/searchForListings",
(locationEntry, thunkAPI) => {
    return fetchWrapper.post("/listings/search", locationEntry, thunkAPI)
});

const initialState = {
    entities: [],
    listingError: null,
    status: "idle",
    currentListing: null
}
 
const listingsSlice = createSlice({
    name: "listings",
    initialState,
    // sync reducers
    reducers: {
        setListings(state, action) {
            state.entities = action.payload
        },
        setErrors(state, action) {
            state.listingError = action.payload
        },
        setCurrentListing(state, action) {
            state.currentListing = action.payload
        }
    },
    // async reducers
    extraReducers: {
        [fetchListings.pending]: (state) => {
            state.status = "loading";
        },
        [fetchListings.fulfilled]: (state, action) => {
            console.log(action.payload)
            state.entities = action.payload
            state.status = "idle";
        },
        [fetchListings.rejected]: (state, action) => {
            console.log("rejected!")
            console.log(action.payload)
            state.listingError = action.payload
        },
        
        // [searchForListings.pending]: (state) => {
        //     state.status = "loading";
        // },
        // [searchForListings.fulfilled]: (state, action) => {
        //     console.log(action.payload)
        //     state.entities = action.payload
        //     state.status = "idle";
        // },
        // [searchForListings.rejected]: (state, action) => {
        //     console.log("rejected!")
        //     console.log(action.payload)
        //     state.listingError = action.payload
        // },
    },
});

export const { setListings, setErrors, setCurrentListing } = listingsSlice.actions

export default listingsSlice.reducer;