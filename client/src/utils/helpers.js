const post = (url, value) => {
    return fetch(`${url}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(value),
    })
        .then((response) => response.json())
        .then((data) => data)
}

const get = url => {
    return fetch(`${url}`)
    .then((response) => response.json())
    .then((data) => data)
}

export const fetchWrapper = {
    post: post,
    get: get
}

