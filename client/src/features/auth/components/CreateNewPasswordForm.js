import React, { useState } from "react";
import { CenterDiv, StyledForm } from "../../../styles/Styles";
import { withRouter } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { displayErrors } from "../../../utils/helpers";
import { useDispatch } from "react-redux";
import { setLoginModal, updateUser } from "../state/authSlice";
import Button from "@mui/material/Button";
import InputGroup from 'react-bootstrap/InputGroup';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';

// I can set the session id so that the user is capable of updating their password
// let the user update, then push them to the homepage with the login modal open.

function CreateNewPasswordForm({ onNextStep, history }) {
    const dispatch = useDispatch()
    
    const [password, setPassword] = useState("")
    const [password_confirmation, setPasswordConfirmation] = useState("")
    const [errors, setErrors] = useState()

    function handleSubmit(e) {
        e.preventDefault()

        dispatch(updateUser({password: password,password_confirmation: password_confirmation}))
        .unwrap()
        .then(() => {
            onNextStep()
            setErrors(null)
            setPassword(null)
            setPasswordConfirmation(null)
            history.push("/")
            dispatch(setLoginModal(true))
        })
        .catch((err) => setErrors(err))
    }

    return (
            <>            
            <h3 style={{"textAlign": "center"}}>Change Your Password</h3>
            <hr />
            <StyledForm onSubmit= {handleSubmit}>
                <FloatingLabel 
                label="Password" 
                className="mb-3"
                >
                <StyledForm.Control 
                type="password" 
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={!!errors && errors.password}
                />
                {!!errors && errors.password && displayErrors(errors.password, "password")}
                </ FloatingLabel>
                <InputGroup className="mb-3">
                <FloatingLabel 
                label="Password Confirmation" 
                className="mb-3"
                >
                <StyledForm.Control 
                type="password" 
                name="password_confirmation"
                value={password_confirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                isInvalid={!!errors && errors.password_confirmation}
                />
                {!!errors && errors.password_confirmation && displayErrors(errors.password_confirmation)}
                </FloatingLabel>
                <CenterDiv>
                <IconButton aria-label="delete">
                    <VisibilityIcon color="secondary" />
                </IconButton>
                </CenterDiv>
                </InputGroup>
                <Button 
                variant="contained" 
                color="secondary" 
                type="submit"
                >
                    Submit
                </Button>
            </StyledForm>
            </>
    )
}

export default withRouter(CreateNewPasswordForm);