import React, { useState } from "react";
import { FloatingLabel, Form } from 'react-bootstrap';
import { StyledForm } from '../../../styles/Styles'
import { useDispatch, useSelector } from "react-redux";
import { login } from "../state/authSlice";
import Button from '@mui/material/Button';
import SuccessMessage from "../../common/SuccessMessage";
import { setLoginModal } from "../state/authSlice";

function LoginForm({ showSuccessMessage }) {
    const dispatch = useDispatch();
    const [userCredentials, setUserCredentials] = useState({
        username: "",
        password: ""
    })
    const [authError, setAuthError] = useState(null)
    
    const user = useSelector((state) => state.auth.user)

    function onChange(e) {
        setUserCredentials({
            ...userCredentials,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(login(userCredentials))
        .unwrap()
        .then(() => setLoginModal(false))
        .catch((err) => setAuthError(err))
    }

    if (user) {
        setUserCredentials({
            username: "",
            password: ""
        })
    }

    return (
            <>
                { showSuccessMessage ? 
                <SuccessMessage message="Welcome to Planet Hopper! We are so excited to have you." />
                :
                <StyledForm onSubmit={handleSubmit} style={{padding:'5px'}}>
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
                    <Button 
                    style={{margin: "10px"}}
                    color="secondary" 
                    variant="contained"
                    type="submit"
                    >
                        Login
                    </Button>
                </StyledForm>
                }
            </>
    )
}

export default LoginForm