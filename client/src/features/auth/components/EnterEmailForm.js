import React, { useState } from "react";
import { StyledForm } from "../../../styles/Styles";
import { Form, FloatingLabel } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../state/authSlice";
import SuccessMessage from "../../common/SuccessMessage";
import ErrorMessage from "../../common/ErrorMessage";
import Button from "@mui/material/Button";

function EnterEmailForm({ email, onNextStep, setEmail }) {
    const dispatch = useDispatch()

    const [error, setError] = useState("")
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)

    function handleSubmit(e) {
        e.preventDefault()

        dispatch(forgotPassword({email: email}))
        .unwrap()
        .then(() => successMessage())
        .catch((err) => setError(err))

    }

    const successMessage = () => {
        setError(null)
        setShowSuccessMessage(true)

        setTimeout(() => {
            onNextStep()
            setShowSuccessMessage(false)
        }, 7000);
    }

    return (
        <>
            <h3 style={{"textAlign": "center"}}>Search for your account</h3>
            <hr />
            {showSuccessMessage ? <SuccessMessage message="Success! We sent you an email!" /> : ""}
            <StyledForm style= {{"textAlign": "center"}} onSubmit={handleSubmit}>
                    <Form.Label>Please enter the email associated with your account</Form.Label>
                    <FloatingLabel
                    controlId="floatingInput"
                    label="Email"
                    className="mb-3"
                    >
                    <StyledForm.Control
                    type="email" 
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    isInvalid={!!error}
                    />
                    {!!error ? <ErrorMessage>{error}. Please check your spelling and try again.</ErrorMessage> : ""}
                    </FloatingLabel>
                <Button 
                color= "secondary" 
                type="submit"
                >Send Code
                </Button>
            </StyledForm>
        </>
    )
}

export default withRouter(EnterEmailForm);