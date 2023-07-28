import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchWrapper } from "../../../utils/helpers";
import dayjs from "dayjs";
import axios from "axios";

// posts the user's location to my backend. uses that data to find listings nearby the user

export const fetchListings = createAsyncThunk("listings/fetchListings", (locationObj, thunkAPI) => {
    console.log(locationObj)
    return fetchWrapper.post("/listings/suggested_listings", locationObj, thunkAPI)
});

export const createBooking = createAsyncThunk("listings/createBooking", (bookingObj, thunkAPI) => {
    return fetchWrapper.post("/bookings", bookingObj, thunkAPI)
});

export const getListing = createAsyncThunk("listings/getListing", (id, thunkAPI) => {
    return fetchWrapper.show(`/listings/${id}`, thunkAPI)
})

export const getUsersListings = createAsyncThunk("listings/getUsersListings", async() => {
    const response = await axios.get("/my_listings")
    const user = await axios.get("/me")
    return {data: response.data, userId: user.data.id}
})

export const deleteBooking = createAsyncThunk("listings/deleteBooking", async(id, thunkAPI) => {
    try {
        const response = await axios.delete(`/bookings/${id}`)
        return response.data.id
    } catch (err) {
        const error = err.response.data.errors
        return thunkAPI.rejectWithValue({ data: error }) 
    }
})

export const updateBooking = createAsyncThunk("/listings/updateBooking", async(bookingObj, thunkAPI) => {
    const { id, ...rest } = bookingObj
    try {
        const response = await axios.patch(`/bookings/${id}`, rest);
        return { data: response.data, bookingId: id };
    } catch (err) {
        const error = err.response.data.errors
        return thunkAPI.rejectWithValue({ data: error }) 
    }
})

export const getAlienListings = createAsyncThunk("/listings/getAlienListings", async(_, thunkAPI) => {
    try {
        const response = await axios.get('/alien_listings');
        return response.data
    } catch (err) {
        // Handle the error
        const error = err.response.data.errors
        return thunkAPI.rejectWithValue({ data: error }) 
    }
})

export const searchListings = createAsyncThunk("/listings/searchListings", async(query, thunkAPI) => {
    console.log(query)
    return fetchWrapper.post("/listings/search", query, thunkAPI)
})


const initialState = {
    entities: null,
    listingError: null,
    searchResults: null,
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
            console.log(action.payload)
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
            state.usersListings = action.payload.data
            state.bookingError = null
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
            state.listingError = action.payload
        },
        [deleteBooking.pending]: (state) => {
            state.status = "loading";
        },
        [deleteBooking.fulfilled]: (state, action) => {
            state.bookingError = null
            const bookingId = action.payload
            state.usersListings = state.usersListings.map((listing) => {
                const bookingIndex = listing.bookings.findIndex((booking) => booking.id === bookingId)
                if (bookingIndex > -1) {
                    listing.bookings.splice(bookingIndex, 1);
                }
                return listing
            })
            state.status = "idle"
        },
        [deleteBooking.rejected]: (state, action) => {
            state.bookingError = action.payload
        },
        [updateBooking.pending]: (state) => {
            state.status = "loading";
        },
        [updateBooking.fulfilled]: (state, action) => {
            state.bookingError = null
            const bookingId = action.payload.bookingId
            state.usersListings = state.usersListings.map((listing) => {
                const filteredBookings = listing.bookings.filter((b) => b.id !== bookingId)
                return {...listing, bookings: [...filteredBookings, action.payload.data]}
            })
        },
        [updateBooking.rejected]: (state, action) => {
            console.log("rejected!")
            state.bookingError = action.payload.data
        },
        [getAlienListings.pending]: (state) => {
            state.status = "loading";
        },
        [getAlienListings.fulfilled]: (state, action) => {
            state.bookingError = null 
            state.entities = action.payload
            state.status = "idle";
        },
        [getAlienListings.rejected]: (state, action) => {
            state.listingError = action.payload
        },
        [searchListings.pending]: (state) => {
            state.status = "loading";
        },
        [searchListings.fulfilled]: (state, action) => {
            state.searchResults = action.payload
            state.status = "idle";
        },
        [searchListings.rejected]: (state, action) => {
            state.listingError = action.payload
        },
    },
});

export const { setListings, setErrors, setStatusToFulfilled, setStatusToLoading, turnOffBooked, setUsersCoordinates } = listingsSlice.actions

export default listingsSlice.reducer;