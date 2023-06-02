import { Form } from "react-bootstrap"

const post = async(url, obj, thunkAPI) => {
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
    fetch(`${url}`)
    .then((response) => response.json())
    .then((data) => data)
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
        <Form.Control.Feedback type="invalid">
        {error}
        </Form.Control.Feedback>
        );
    })
}

const fetchWrapper = {
    post: post,
    get: get
}

export { fetchWrapper, displayErrors }

