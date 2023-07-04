import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import dayjs from "dayjs";

// posts the user's location to my backend. uses that data to find listings nearby the user

export const getUsersBookings = createAsyncThunk("bookings/getUsersBookings", async() => {
    const response = await axios.get("my_bookings")
    return response.data
})

const initialState = {
    bookings: null,
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
        findBooking(state, action) {
            state.bookings.find((booking) => booking.id === action.payload.id)
        },
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
        changeBookingsGuests(action) {
            const booking = this.findBooking(action.payload.id)
            booking.number_of_guests = action.payload.value
        },
        changeBookingsEndDate(action) {
            const booking = this.findBooking(action.payload.id)
            booking.end_date = action.payload.value
            const number_of_days = booking.end_date.toDate() - booking.start_date.toDate()
            booking.price = booking.listing.unit_price * number_of_days
        },
        changeBookingsStartDate(action) {
            const booking = this.findBooking(action.payload.id)
            booking.start_date = action.payload.value
            const number_of_days = booking.end_date.toDate() - booking.start_date.toDate()
            booking.price = booking.listing.unit_price * number_of_days
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
            state.bookings.forEach((booking) => {
                booking.listing.booked_dates = booking.listing.stringified_dates.map((booked_date) => {
                    if (booked_date === booking.start_date) {
                        return
                    }
                    return dayjs(booked_date).toDate()
                })
            })
            state.status = "idle";
        },
        [getUsersBookings.rejected]: (state, action) => {
            console.log("rejected!")
            console.log(action.payload)
            state.bookingError = action.payload
        },
    },
});

export const { setCurrentBooking, changeCurrentEndDate, changeCurrentGuests, changeCurrentStartDate, changeCurrentNights, setDateError, setGuestsError, changeBookingsGuests, changeBookingsEndDate, changeBookingsStartDate } = bookingsSlice.actions

export default bookingsSlice.reducer;