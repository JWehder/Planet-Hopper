import React, { useState } from "react";
import { FloatingLabel, Form } from 'react-bootstrap';
import { CustomButton, StyledForm } from '../../styles/Styles'
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./state/authSlice";

function LoginForm(props) {
    const dispatch = useDispatch();
    const [userCredentials, setUserCredentials] = useState({
        username: "",
        password: ""
    })
    const authError = useSelector((state) => state.auth.loginError)

    function onChange(e) {
        setUserCredentials({
            ...userCredentials,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(loginUser(userCredentials))
    }

    return (
            <StyledForm onSubmit={handleSubmit}>
                <FloatingLabel
                controlId="floatingInput"
                label="Username"
                className="mb-3"
                >
                <StyledForm.Control 
                type="text" 
                placeholder="Username" 
                value= {userCredentials.username}
                name="username"
                onChange={(e) => onChange(e)}
                isInvalid={!!authError}
                />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password">
                <StyledForm.Control 
                type="password" 
                placeholder="Password"
                name="password"
                value={userCredentials.password}
                onChange={(e) => onChange(e)}
                isInvalid={!!authError}
                />
                
                {authError && 
                <Form.Control.Feedback type="invalid">
                {authError}
                </Form.Control.Feedback>
                }
                </FloatingLabel>
                <CustomButton variant="primary" type="submit">Login</CustomButton>
            </StyledForm>
    )
}

export default LoginForm