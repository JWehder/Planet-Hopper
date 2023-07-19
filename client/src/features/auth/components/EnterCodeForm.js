import React, { useState } from "react";
import { CenterDiv, StyledForm } from "../../../styles/Styles";
import { FloatingLabel } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import SuccessMessage from "../../common/SuccessMessage";
import { forgotPassword, resetPassword } from "../state/authSlice";
import ErrorMessage from "../../common/ErrorMessage";
import Button from "@mui/material/Button";

function EnterCodeForm({ onNextStep, email, setId }) {
    const [error, setError] = useState()
    const [code, setCode] = useState()
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [showSecondSuccessMessage, setShowSecondSuccessMessage] = useState(false)

    const dispatch = useDispatch()

    function handleSubmit(e) {
        e.preventDefault()

        dispatch(resetPassword({email: email, code: code}))
        .unwrap()
        .then((id) => {
            setId(id)
            successMessage()
        })
        .catch((error) => setError(error))
    }

    function successMessage() {
        setShowSuccessMessage(true)
        setError(null)
        setCode(null)

        setTimeout(() => {
            setShowSuccessMessage(false)
            onNextStep()
        }, 3000);

    }

    function handleClick() {
        dispatch(forgotPassword({email: email}))
        setShowSecondSuccessMessage(true)

        setTimeout(() => {
            setShowSecondSuccessMessage(false)
        }, 3000);
    }


    return (
        <>
            <CenterDiv>
            {showSuccessMessage ? <SuccessMessage message="Code Accepted!" /> : ""}

            {showSecondSuccessMessage ? <SuccessMessage message="Sent a new code to your email!" /> : ""}
            </CenterDiv>
            <StyledForm onSubmit={handleSubmit}>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Code"
                    className="mb-3"
                >
                    <StyledForm.Control
                    type="text" 
                    name="code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    isInvalid={!!error}
                    />
                    {!!error ? <ErrorMessage>{error}</ErrorMessage> : ""}
                </FloatingLabel>
                <CenterDiv>
                    <Button 
                    style={{marginRight:'2px'}} 
                    color="secondary" 
                    type="submit"
                    >
                        Submit
                    </Button>
                    <Button onClick={handleClick} color="primary">Send New Code</Button>
                </CenterDiv>
            </StyledForm>
        </>
                
    )
}

export default withRouter(EnterCodeForm);