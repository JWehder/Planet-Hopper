import { Form } from "react-bootstrap"
import ErrorMessage from "../features/common/ErrorMessage"
import FormHelperText from '@mui/material/FormHelperText';

const post = async(url, obj, thunkAPI) => {
    console.log(obj)
    console.log(url)
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(obj),
        }); 
        const data = await response.json()
        if (response.ok) {
            return data
        } else {
            console.log(data.errors)
            return thunkAPI.rejectWithValue(data.errors)
        }
    } catch(err) {
        return thunkAPI.rejectWithValue("Error occurred. Please try again.")
    }
}

const get = url => {
    return fetch(`${url}`)
    .then((response) => response.json())
    .then((data) => (data))
}

const displayErrors = (errors, errorKey = null) => {
    return errors.map((error) => {
        if (errorKey === "password" && error === "is invalid") {
            error = "Sorry, your password is invalid. Your password must be at least 8 characters, contain at least one digit, at least one lowercase letter, one uppercase letter, and one special character (! @ # $ % ^ &)"
        } else if (errorKey === "email" && error === "is invalid") {
            error = "Please follow typical email formatting: joe@email.com"
        } else if (errorKey === "password" && (error === "can't be blank" || error === "is too short (minimum is 8 characters)")) {
            return null
        }
        return ( 
            <FormHelperText id="component-error-text">{error}</FormHelperText>
        );
    })
}

const fetchWrapper = {
    post: post,
    get: get
}

export { fetchWrapper, displayErrors }

