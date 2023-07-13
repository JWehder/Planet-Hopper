import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchWrapper } from "../../../utils/helpers";
import axios from "axios";

export const loginUser = createAsyncThunk(
    "auth/loginUser", 
    (userObj, thunkAPI) => {
        return fetchWrapper.post("/login", userObj, thunkAPI)
})

export const getUser = createAsyncThunk("auth/getUser", () => {
    return fetchWrapper.get("/me")
})

export const signupUser = createAsyncThunk(
    "auth/signupUser", 
    (userObj, thunkAPI) => {
    return fetchWrapper.post("/signup", userObj, thunkAPI)
})

export const updateUser = createAsyncThunk("/listings/updateBooking", async(userObj, thunkAPI) => {
    try {
        const response = await axios.put(`/bookings/${userObj.id}`, userObj);
        return response.data
    } catch (err) {
        const error = err.response.data.errors
        return thunkAPI.rejectWithValue({ data: error }) 
    }
})

const initialState = {
    user: null,
    loginError: null,
    signupError: null,
    updateError: null,
    status: "idle"
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    // sync reducers
    reducers: {
    },
    // async reducers
    extraReducers: {
        [loginUser.pending]: (state) => {
            console.log("runnin")
            state.status = "pending";
            state.loginError = null
        },
        [loginUser.fulfilled]: (state, action) => {
            state.user = action.payload
            state.status = "idle";
        },
        [loginUser.rejected]: (state, action) => {
            console.log(action.payload)
            state.loginError = action.payload
        },
        [getUser.pending]: (state) => {
            state.status = "loading";
        },
        [getUser.fulfilled]: (state, action) => {
            console.log(action.payload)
            state.user = action.payload
            state.status = "idle";
        },
        [signupUser.pending]: (state) => {
            state.status = "pending";
            state.signupError = null
        },
        [signupUser.fulfilled]: (state, action) => {
            state.user = action.payload
            state.status = "idle";
        },
        [signupUser.rejected]: (state, action) => {
            console.log("rejected!")
            console.log(action.payload)
            state.signupError = action.payload
        },
        [updateUser.pending]: (state) => {
            state.status = "pending";
            state.signupError = null
        },
        [updateUser.fulfilled]: (state, action) => {
            state.user = action.payload
            state.status = "idle";
        },
        [updateUser.rejected]: (state, action) => {
            console.log("rejected!")
            console.log(action.payload)
            state.updateError = action.payload
        },
    },
});

export default authSlice.reducer;