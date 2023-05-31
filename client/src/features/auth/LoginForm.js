import React, { useState } from "react";
import { FloatingLabel, Form } from 'react-bootstrap';
import StyledForm from '../../styles/StyledForm'
import CustomButton from "../../styles/Button";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function LoginForm(props) {
    const dispatch = useDispatch();
    const [loginUser, setLoginUser] = useState({
        username: "",
        password: ""
    })
    const authError = useSelector((state) => state.auth.error)

    function onChange(e) {
        setLoginUser({
            ...loginUser,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(loginUser(loginUser))
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
                value= {loginUser.username}
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
                value={loginUser.passwowrd}
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

export default withRouter(LoginForm);