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

export const getListing = createAsyncThunk("listings/getListing", (id) => {
    return fetch(`/listings/${id}`)
    .then((response) => response.json())
    .then((data) =>  data);
})

const initialState = {
    entities: [],
    listingError: null,
    status: "idle",
    currentListing: null,
    usersCoordinates: null
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
        setStatusToLoading(state) {
            state.status = "loading"
        },
        setStatusToFulfilled(state) {
            state.status = "fulfilled"
        },
        setUsersCoordinates(state, action) {
            state.usersCoordinates = action.payload
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
        [getListing.pending]: (state) => {
            state.status = "loading";
        },
        [getListing.fulfilled]: (state, action) => {
            console.log(action.payload)
            state.currentListing = action.payload
            state.currentListing.booked_dates = state.currentListing.booked_dates.map((booked_date) => new Date(booked_date.date))
            console.log(state.currentListing)
            state.status = "idle";
        },
        [getListing.rejected]: (state, action) => {
            console.log("rejected!")
            console.log(action.payload)
            state.listingError = action.payload
        },
    },
});

export const { setListings, setErrors, setStatusToFulfilled, setStatusToLoading } = listingsSlice.actions

export default listingsSlice.reducer;