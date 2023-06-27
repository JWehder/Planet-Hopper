import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

// posts the user's location to my backend. uses that data to find listings nearby the user

const initialState = {
    entities: [],
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
        changeGuests(state, action) {
            state.currentBooking.number_of_guests = action.payload
        },
        changeStartDate(state, action) {
            state.currentBooking.startDate = action.payload
        },
        changeEndDate(state, action) {
            state.currentBooking.endDate = action.payload
        },
        changeNights(state, action) {
            state.currentBooking.numberOfNights = action.payload
        },
        setDateError(state, action) {
            state.dateError = action.payload
        },
        setGuestsError(state, action) {
            state.guestsError = action.payload
        }

    },
    // async reducers
    extraReducers: {
    },
});

export const { setCurrentBooking, changeEndDate, changeGuests, changeStartDate, changeNights, setDateError, setGuestsError } = bookingsSlice.actions

export default bookingsSlice.reducer;