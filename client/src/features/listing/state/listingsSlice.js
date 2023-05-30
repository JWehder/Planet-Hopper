import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const fetchListings = createAsyncThunk("listings/fetchListings", () => {
    return fetch("")
        .then((response) => response.json())
        .then((listings) => listings.data)
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
        [fetchListings.pending](state) {
            state.status = "loading";
        },
        [fetchListings.fulfilled](state, action) {
            state.entities = action.payload
            state.status = "idle";
        },
    },
});

export default listingsSlice.reducer;