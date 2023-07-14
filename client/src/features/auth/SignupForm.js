import { React, useState } from "react";
import { StyledForm } from "../../styles/Styles";
import { Col, Row, FloatingLabel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "./state/authSlice";
import { displayErrors } from "../../utils/helpers";
import Button from '@mui/material/Button';

function SignupForm({ setShowLogin }) {
    // const [isLoading, setIsLoading] = useState(false);
    const error = useSelector((state) => state.auth.signupError)
    const dispatch = useDispatch();

    const [userObject, setUserObject] = useState({
        first_name: "",
        last_name: "",
        username: "",
        password: "",
        password_confirmation: "",
        email: "",
        bio: "",
    })

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(signup(userObject))
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
                isInvalid={!!error && error.first_name}
                />
                {error && error.first_name && displayErrors(error.first_name)}
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
                isInvalid={!!error && error.last_name}
                />
                {error && error.last_name && displayErrors(error.last_name)}
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
                isInvalid={!!error && error.username}
                />
                {error && error.username && displayErrors(error.username)}
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
                isInvalid={!!error && error.password}
                />
                {error && error.password && displayErrors(error.password, "password")}
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
                isInvalid={!!error && error.password_confirmation}
                />
                {error && error.password_confirmation && displayErrors(error.password_confirmation)}
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
                isInvalid={!!error && error.email}
                />
                {error && error.email && displayErrors(error.email, "email")}
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
                isInvalid={!!error && error.bio}
                />
                {error && error.bio && displayErrors(error.bio)}
                </FloatingLabel>
                <Button 
                color= "secondary" 
                type="submit"
                variant="contained"
                >
                    Sign Up
                </Button>
            </StyledForm>
        </>
    )
}

export default SignupForm;