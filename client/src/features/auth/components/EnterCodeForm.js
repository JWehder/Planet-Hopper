import React, { useState } from "react";
import { StyledForm } from "../../../styles/Styles";
import { CustomButton } from "../../../styles/Styles";
import { FloatingLabel } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import SuccessMessage from "../../common/SuccessMessage";
import { resetPassword } from "../state/authSlice";
import ErrorMessage from "../../common/ErrorMessage";


function EnterCodeForm(props) {
    const [error, setError] = useState()
    const [code, setCode] = useState("")
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    
    const dispatch = useDispatch()

    function handleSubmit(e) {
        e.preventDefault()

        dispatch(resetPassword(code))
        .unwrap()
        .then(() => successMessage())
        .catch((error) => setError(error))
    }

    function successMessage() {
        setShowSuccessMessage(true)
        
        setTimeout(() => {
            setShowSuccessMessage(false)
            props.onNextStep()
        }, 3000);

    }



    return (
        <>
            {showSuccessMessage ? <SuccessMessage message="We sent you a code to your email!" /> : ""}
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
                    <ErrorMessage>{error}</ErrorMessage>
                </FloatingLabel>
                <CustomButton variant="primary" type="submit">Submit</CustomButton>
            </StyledForm>
        </>
                
    )
}

export default withRouter(EnterCodeForm);