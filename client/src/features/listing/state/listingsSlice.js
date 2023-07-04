import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchWrapper } from "../../../utils/helpers";
import dayjs from "dayjs";
import axios from "axios";

// posts the user's location to my backend. uses that data to find listings nearby the user

export const fetchListings = createAsyncThunk("listings/fetchListings", (locationObj, thunkAPI) => {
    return fetchWrapper.post("/listings/homepage_listings", locationObj, thunkAPI)
});

export const createBooking = createAsyncThunk("listings/createBooking", (bookingObj, thunkAPI) => {
    console.log("/bookings")
    return fetchWrapper.post("/bookings", bookingObj, thunkAPI)
});

export const getListing = createAsyncThunk("listings/getListing", (id) => {
    return fetch(`/listings/${id}`)
    .then((response) => response.json())
    .then((data) =>  data);
})

export const getUsersListings = createAsyncThunk("listings/getUsersListings", async() => {
    const response = await axios.get("/my_listings")
    const user = await axios.get("/me")
    return {data: response.data, userId: user.data.id}
})

export const deleteBooking = createAsyncThunk("listings/deleteBooking", async() => {
    const response = await axios.get("/my_listings")
    return {data: response.data, userId: user.data.id}
})


const initialState = {
    entities: null,
    listingError: null,
    status: "idle",
    currentListing: null,
    usersCoordinates: null,
    booked: false,
    bookingError: null, 
    usersListings: null
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
            console.log(action.payload)
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
        },
        turnOffBooked(state) {
            state.booked = false
        },
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
            state.listingError = action.payload
        },
        [getListing.pending]: (state) => {
            state.status = "loading";
        },
        [getListing.fulfilled]: (state, action) => {
            state.currentListing = action.payload
            state.currentListing.booked_dates = state.currentListing.bookings.reduce((accumulator, booking) => {
                return accumulator.concat(booking.stringified_dates.map((booked_date) => {
                  return dayjs(booked_date).toDate();
                }));
            }, []);
            console.log(state.currentListing)
            state.status = "idle";
        },
        [getListing.rejected]: (state, action) => {
            console.log("rejected!")
            console.log(action.payload)
            state.listingError = action.payload
        },
        [createBooking.pending]: (state) => {
            state.status = "loading";
        },
        [createBooking.fulfilled]: (state, action) => {
            state.currentListing.bookings.push(action.payload)
            state.status = "idle"
            state.booked = true
        },
        [createBooking.rejected]: (state, action) => {
            console.log("rejected!")
            console.log(action.payload)
            state.bookingError = action.payload
        },
        [getUsersListings.pending]: (state) => {
            state.status = "loading";
        },
        [getUsersListings.fulfilled]: (state, action) => {
            console.log(action.payload)
            state.usersListings = action.payload.data
            state.usersListings.forEach((listing) => {
                listing.booked_dates = listing.bookings.reduce((accumulator, booking) => {
                    if (booking.user_id === action.payload.userId) {
                        return accumulator;
                    }
                    return accumulator.concat(
                        booking.stringified_dates.map((booked_date) => {
                      return dayjs(booked_date).toDate();
                    }));
                }, []);
            })
            state.status = "idle";
        },
        [getUsersListings.rejected]: (state, action) => {
            console.log("rejected!")
            console.log(action.payload)
            state.listingError = action.payload
        },

        
    },
});

export const { setListings, setErrors, setStatusToFulfilled, setStatusToLoading, turnOffBooked, setUsersCoordinates } = listingsSlice.actions

export default listingsSlice.reducer;