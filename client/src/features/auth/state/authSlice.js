import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchWrapper } from "../../../utils/helpers";
import axios from "axios";

export const login = createAsyncThunk(
    "auth/login", 
    (userObj, thunkAPI) => {
        return fetchWrapper.post("/login", userObj, thunkAPI)
})

export const getUser = createAsyncThunk("auth/getUser", async(_, thunkAPI) => {
    try {
        const response = await axios.get('/me');
        return response.data
    } catch (err) {
        // Handle the error
        const error = err.response.data.errors
        return thunkAPI.rejectWithValue({ data: error }) 
    }
})

export const signup = createAsyncThunk(
    "auth/signup", 
    (userObj, thunkAPI) => {
    return fetchWrapper.post("/signup", userObj, thunkAPI)
})

export const updateUser = createAsyncThunk("/auth/updateUser", async(userObj, thunkAPI) => {
        return fetchWrapper.patch(`/users/${userObj}`, userObj, thunkAPI)
})

export const logout = createAsyncThunk("/auth/logout", async( thunkAPI) => {
    try {
        const response = await axios.delete(`/logout`);
        return response.data
    } catch (err) {
        console.log(err)
        const error = err.response.data.errors
        return thunkAPI.rejectWithValue(error) 
    }
})

export const forgotPassword = createAsyncThunk(
    "auth/forgotPassword", 
    (email, thunkAPI) => {
    return fetchWrapper.post("/forgot_password", email, thunkAPI)
})

export const resetPassword = createAsyncThunk(
    "auth/resetPassword", 
    (code, thunkAPI) => {
    return fetchWrapper.post("/reset_password", code, thunkAPI)
})

const initialState = {
    user: null,
    loginError: null,
    signupError: null,
    updateError: null,
    logoutError: null,
    loginModal: false,
    emailSent: false,
    codeCorrect: false,
    savedChanges: false,
    status: "idle"
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    // sync reducers
    reducers: {
        setEmailSent (state, action) {
            state.emailSent = action.payload
        },
        setSavedChanges (state, action) {
            state.savedChanges = action.payload
        },
        setLoginModal (state, action) {
            state.loginModal = action.payload
        }
    },
    // async reducers
    extraReducers: {
        [login.pending]: (state) => {
            console.log("runnin")
            state.status = "pending";
            state.loginError = null
        },
        [login.fulfilled]: (state, action) => {
            state.user = action.payload
            state.status = "idle";
        },
        [login.rejected]: (state, action) => {
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
        [getUser.rejected]: (state, action) => {
            console.log(action.payload)
            state.user = null
        },
        [signup.pending]: (state) => {
            state.status = "pending";
            state.signupError = null
        },
        [signup.fulfilled]: (state, action) => {
            state.user = action.payload
            state.status = "idle";
        },
        [signup.rejected]: (state, action) => {
            console.log("rejected!")
            console.log(action.payload)
            state.signupError = action.payload
        },
        [updateUser.pending]: (state) => {
            state.status = "pending";
            state.updateError = null
        },
        [updateUser.fulfilled]: (state, action) => {
            state.user = action.payload
            state.savedChanges = true
            state.status = "idle";
        },
        [updateUser.rejected]: (state, action) => {
            console.log("rejected!")
            console.log(action.payload)
            state.updateError = action.payload
        },
        [logout.pending]: (state) => {
            state.status = "pending";
            state.signupError = null
        },
        [logout.fulfilled]: (state) => {
            state.user = null
            state.status = "idle";
        },
        [logout.rejected]: (state, action) => {
            console.log("rejected!")
            console.log(action.payload)
            state.logoutError = action.payload
        },
        [forgotPassword.pending]: (state) => {
            console.log("runnin")
            state.status = "pending";
            state.loginError = null
        },
        [forgotPassword.fulfilled]: (state) => {
            state.status = "idle";
        },
        [forgotPassword.rejected]: (state, action) => {
            console.log(action.payload)
        },
        [resetPassword.pending]: (state) => {
            state.status = "pending";
            state.loginError = null
        },
        [resetPassword.fulfilled]: (state, action) => {
            state.user = action.payload
            state.status = "idle";
        },
        [resetPassword.rejected]: (state, action) => {
            console.log(action.payload)
            state.resetPasswordError = action.payload
        },
    },
});

export const { setSavedChanges, setLoginModal } = authSlice.actions

export default authSlice.reducer;