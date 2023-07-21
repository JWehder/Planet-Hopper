import ErrorMessage from "../features/common/ErrorMessage"


export function getAlienDistance() {
    const alienDistanceMeasurements = ['parsecs', 'zogrons', 'quasarons', 'nebulums','warp units', 'hyperparsecs', 'exostrides']

    const alienMetric = alienDistanceMeasurements[Math.floor(Math.random() * alienDistanceMeasurements.length)]
    const distanceFromEarth = getRandomNumber(1, 20)

    return { distanceFromEarth: distanceFromEarth, alienMetric: alienMetric}
}


function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

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

const patch = async(url, obj, thunkAPI) => {
    console.log(obj)
    console.log(url)
    try {
        const response = await fetch(url, {
            method: "PATCH",
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
        return <ErrorMessage error={error} />
    })
}

const fetchWrapper = {
    post: post,
    get: get,
    patch: patch
}

export { fetchWrapper, displayErrors }

