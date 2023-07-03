import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

// posts the user's location to my backend. uses that data to find listings nearby the user

export const getUsersBookings = createAsyncThunk("bookings/getUsersBookings", async() => {
    const response = await axios.get("my_bookings")
    return response.data
})

const initialState = {
    bookings: [],
    bookingError: null,
    status: "idle",
    currentBooking: null,
    dateError: null,
    guestsError: null
}
 
const bookingsSlice = createSlice({
    name: "bookings",
    initialState,
    // sync reducers
    reducers: {
        setCurrentBooking(state, action) {
            console.log(action.payload)
            state.currentBooking = action.payload
        },
        changeCurrentGuests(state, action) {
            state.currentBooking.number_of_guests = action.payload
        },
        changeCurrentStartDate(state, action) {
            state.currentBooking.startDate = action.payload
        },
        changeCurrentEndDate(state, action) {
            state.currentBooking.endDate = action.payload
        },
        changeCurrentNights(state, action) {
            state.currentBooking.numberOfNights = action.payload
        },
        setDateError(state, action) {
            state.dateError = action.payload
        },
        setGuestsError(state, action) {
            state.guestsError = action.payload
        },
        changeEntities(state, action) {
            const booking = state.bookings.find((booking) => booking.id === action.payload.id)
            booking[action.payload.attribute] = action.payload.value
        }


    },
    // async reducers
    extraReducers: {
        [getUsersBookings.pending]: (state) => {
            state.status = "loading";
        },
        [getUsersBookings.fulfilled]: (state, action) => {
            console.log(action.payload)
            state.bookings = action.payload
            state.status = "idle";
        },
        [getUsersBookings.rejected]: (state, action) => {
            console.log("rejected!")
            console.log(action.payload)
            state.bookingError = action.payload
        },
    },
});

export const { setCurrentBooking, changeCurrentEndDate, changeCurrentGuests, changeCurrentStartDate, changeCurrentNights, setDateError, setGuestsError } = bookingsSlice.actions

export default bookingsSlice.reducer;