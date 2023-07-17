import React, { useState } from "react";
import StyledForm from "../styles/StyledForm";
import CustomButton from "../styles/Button";
import { Form, FloatingLabel } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../state/authSlice";
import SuccessMessage from "../../common/SuccessMessage";

function EnterEmailForm(props) {
    const dispatch = useDispatch()

    const emailSent = ((state) => state.auth.emailSent)
    const error = useSelector((state) => state.auth.forgotPasswordError)

    const [email, setEmail] = useState("")
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)

    function handleSubmit(e) {
        e.preventDefault()

        dispatch(forgotPassword(email))

    }

    if (emailSent) {
        setShowSuccessMessage(true)

        setTimeout(() => {
            props.history.push("/forgot_password/enter_code");
            
        }, 3000);
    }

    return (
        <>
            <h3 style={{"textAlign": "center"}}>Search for your account</h3>
            <hr />
            {showSuccessMessage ? <SuccessMessage message="If your email address is in our system, we sent a code there!" /> : ""}
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
                    {!!error ? <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback> : ""}
                    </FloatingLabel>
                <CustomButton variant= "primary" type="submit">Send Code</CustomButton>
            </StyledForm>
        </>
    )
}

export default withRouter(EnterEmailForm);