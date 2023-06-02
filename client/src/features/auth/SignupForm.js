import { React, useState, useContext } from "react";
import { StyledForm, CustomButton } from "../../styles/Styles";
import { Col, Row, FloatingLabel } from "react-bootstrap";
import { useSelector } from "react-redux";

function SignupForm({ setShowLogin }) {
    const error = useSelector((state) => state.auth.error)

    // const [isLoading, setIsLoading] = useState(false);

    const [userObject, setUserObject] = useState({
        first_name: "",
        last_name: "",
        username: "",
        password: "",
        password_confirmation: "",
        email: "",
        bio: "",
        favorite_movie: ""
    })

    function handleSubmit(e) {
        e.preventDefault()

        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(userObject)
        }).then((r) => {
            if(r.ok) {
                r.json().then((user) => { 
                    setUser(user)
                    setShowLogin(true)
                })
            } else {
                r.json().then((err) => setErrors(err.errors))
            }
        })
    }

    function changeUserValue(e) {
        setUserObject({
            ...userObject,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>  
            <StyledForm onSubmit={handleSubmit}>
                <Row>
                <Col>
                <FloatingLabel
                label="First Name"
                className="mb-3"
                >
                <StyledForm.Control 
                type="text" 
                name="first_name"
                value={userObject.first_name}
                onChange={(e) => changeUserValue(e)}
                isInvalid={!!errors && errors.first_name}
                />
                {errors && errors.first_name && displayErrors(errors.first_name)}
                </FloatingLabel>
                </Col>
                <Col>
                <FloatingLabel 
                label="Last Name" 
                className="mb-3"
                >
                <StyledForm.Control 
                type="text" 
                name="last_name"
                value={userObject.last_name}
                onChange={(e) => changeUserValue(e)}
                isInvalid={!!errors && errors.last_name}
                />
                {errors && errors.last_name && displayErrors(errors.last_name)}
                </ FloatingLabel>
                </Col>
                </Row>
                <FloatingLabel
                label="Username"
                className="mb-3"
                >
                <StyledForm.Control 
                type="text" 
                name="username"
                value={userObject.username}
                onChange={(e) => changeUserValue(e)}
                isInvalid={!!errors && errors.username}
                />
                {errors && errors.username && displayErrors(errors.username)}
                </FloatingLabel>

                <FloatingLabel 
                label="Password" 
                className="mb-3"
                >
                <StyledForm.Control 
                type="password" 
                name="password"
                value={userObject.password}
                onChange={(e) => changeUserValue(e)}
                isInvalid={!!errors && errors.password}
                />
                {errors && errors.password && displayErrors(errors.password, "password")}
                </ FloatingLabel>
                <FloatingLabel 
                label="Password Confirmation" 
                className="mb-3"
                >
                <StyledForm.Control 
                type="password" 
                name="password_confirmation"
                value={userObject.password_confirmation}
                onChange={(e) => changeUserValue(e)}
                isInvalid={!!errors && errors.password_confirmation}
                />
                {errors && errors.password_confirmation && displayErrors(errors.password_confirmation)}
                </FloatingLabel>
                <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
                >
                <StyledForm.Control
                type="email" 
                name="email"
                value={userObject.email}
                onChange={(e) => changeUserValue(e)}
                isInvalid={!!errors && errors.email}
                />
                {errors && errors.email && displayErrors(errors.email, "email")}
                </FloatingLabel>  
                <FloatingLabel
                controlId="floatingInput"
                label="Favorite Movie"
                className="mb-3"
                >
                <StyledForm.Control 
                type="text" 
                name="favorite_movie"
                value={userObject.favorite_movie}
                onChange={(e) => changeUserValue(e)}
                isInvalid={!!errors && errors.favorite_movie}
                />
                {errors && errors.favorite_movie && displayErrors(errors.favorite_movie)}
                </FloatingLabel>
                <FloatingLabel 
                controlId="floatingTextarea2" 
                label="Bio" 
                className="mb-3"
                >
                <StyledForm.Control 
                as="textarea" 
                name="bio"
                style={{ height: '100px' }}
                value={userObject.bio}
                onChange={(e) => changeUserValue(e)}
                isInvalid={!!errors && errors.bio}
                />
                {errors && errors.bio && displayErrors(errors.bio)}
                </FloatingLabel>
                <CustomButton variant= "primary" type="submit">Sign Up</CustomButton>
            </StyledForm>
        </>
    )
}

export default SignupForm;