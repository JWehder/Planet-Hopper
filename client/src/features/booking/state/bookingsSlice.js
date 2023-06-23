import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchWrapper } from "../../../utils/helpers";
import { useSelector } from "react-redux";

// posts the user's location to my backend. uses that data to find listings nearby the user
export const createBooking = createAsyncThunk("listings/createBooking", (bookingObj, thunkAPI) => {
    return fetchWrapper.post("/listings", bookingObj, thunkAPI)
});


const initialState = {
    entities: [],
    bookingError: null,
    status: "idle",
    currentBooking: null,
}
 
const bookingsSlice = createSlice({
    name: "bookings",
    initialState,
    // sync reducers
    reducers: {
        setCurrentBooking(state, action) {
            console.log(action.payload)
            state.currentBooking = action.payload
        }

    },
    // async reducers
    extraReducers: {
        [createBooking.pending]: (state) => {
            state.status = "loading";
        },
        [createBooking.fulfilled]: (state, action) => {
            console.log(action.payload)
            const listing = useSelector((state) => state.listings.find((listing) => listing.id === state.currentBooking.listing_id))
            listing.bookings.push(action.payload)
            state.status = "idle";
        },
        [createBooking.rejected]: (state, action) => {
            console.log("rejected!")
            console.log(action.payload)
            state.bookingError = action.payload
        },

        
    },
});

export const { setCurrentBooking } = bookingsSlice.actions

export default bookingsSlice.reducer;