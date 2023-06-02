import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchWrapper } from "../../../utils/helpers";

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

const initialState = {
    user: null,
    loginError: null,
    signupError: null,
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
    },
});

export default authSlice.reducer;