import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchWrapper } from "../../../utils/helpers";

export const loginUser = () => createAsyncThunk("auth/loginUser", () => {
    return fetchWrapper.post("/login", loginUser)
})

export const getUser = createAsyncThunk("auth/getUser", () => {
    return fetchWrapper.get("/me")
})

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        error: null,
        status: "idle"
    },
    // sync reducers
    reducers: {
    },
    // async reducers
    extraReducers: {
        [loginUser.pending](state) {
            state.status = "pending";
            state.error = null
        },
        [loginUser.fulfilled](state, action) {
            state.user = action.payload
            state.status = "idle";
        },
        [loginUser.rejected](state, action) {
            state.error = action.payload
        },
        [getUser.pending](state) {
            state.status = "loading";
        },
        [getUser.fulfilled](state, action) {
            state.entities = action.payload
            state.status = "idle";
        },
    },
});

export default authSlice.reducer;