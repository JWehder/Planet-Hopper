import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchWrapper } from "../../../utils/helpers";
import dayjs from "dayjs";
import axios from "axios";

export const fetchListings = createAsyncThunk("listings/fetchListings", (locationObj, thunkAPI) => {
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

function stringifyBookedDates(listing, keyword="fetch", user_id) {
    return listing.bookings.reduce((accumulator, booking) => {
        // if (keyword === "user" && booking.user_id === user_id) {
        //     return accumulator;
        // }

        return accumulator.concat(booking.stringified_dates.map((booked_date) => {
          return dayjs(booked_date).toDate();
        }));
    }, []);
}

const initialState = {
    entities: null,
    listingError: null,
    searchResults: null,
    status: "idle",
    currentListing: null,
    usersCoordinates: null,
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
            state.currentListing.booked_dates = stringifyBookedDates(state.currentListing)
            // state.currentListing.bookings.reduce((accumulator, booking) => {
            //     return accumulator.concat(booking.stringified_dates.map((booked_date) => {
            //       return dayjs(booked_date).toDate();
            //     }));
            // }, []);
            state.status = "idle";
        },
        [getListing.rejected]: (state, action) => {
            state.listingError = action.payload
        },
        [createBooking.pending]: (state) => {
            state.status = "loading";
        },
        [createBooking.fulfilled]: (state, action) => {
            state.currentListing.bookings = [...state.currentListing.bookings, action.payload];
            state.currentListing.booked_dates = stringifyBookedDates(state.currentListing);

            if (state.usersListings) {
                let listing = state.usersListings.find((lis) => lis.id === action.payload.listing_id);
                if (!listing) { 
                    listing = state.currentListing;
                } else {
                    listing.bookings = [...listing.bookings, action.payload];
                    listing.booked_dates = stringifyBookedDates(listing, "user", action.payload.user_id);
                }
            
                state.usersListings = state.usersListings.map((lis) => lis.id === listing.id ? listing : lis);
            }
        
            state.status = "idle";
        },
        [createBooking.rejected]: (state, action) => {
            state.bookingError = action.payload
        },
        [getUsersListings.pending]: (state) => {
            state.status = "loading";
        },
        [getUsersListings.fulfilled]: (state, action) => {
            state.usersListings = action.payload.data
            state.bookingError = null
            state.usersListings.forEach((listing) => {
                listing.booked_dates = stringifyBookedDates(listing, "user", action.payload.userId)
            })

            // listing.bookings.reduce((accumulator, booking) => {
            //     if (booking.user_id === action.payload.userId) {
            //         return accumulator;
            //     }
            //     return accumulator.concat(
            //         booking.stringified_dates.map((booked_date) => {
            //       return dayjs(booked_date).toDate();
            //     }));
            // }, []);
            
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
                listing.bookings = listing.bookings.filter((booking) => booking.id !== bookingId)

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
            const listingId = action.payload.data.listing_id

            console.log(action.payload.data)
            
            state.usersListings = state.usersListings.map((listing) => {
                if (listing.id === listingId) {
                    listing.bookings = listing.bookings.map((booking) => {
                        if (booking.id === bookingId) {
                            return action.payload.data
                        }
                        return booking
                    })
                }

                return listing
            })

            state.usersListings.forEach((listing) => {
                listing.booked_dates = stringifyBookedDates(listing, "user", action.payload.data.user_id)
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