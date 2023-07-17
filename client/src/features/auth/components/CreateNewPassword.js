import React, { useState } from "react";
import StyledForm from "../styles/StyledForm";
import { withRouter } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import CustomButton from "../styles/Button";
import { displayErrors } from "../../../utils/helpers";

function CreateNewPasswordForm(props) {
    const dispatc
    
    const [password, setPassword] = useState("")
    const [password_confirmation, setPasswordConfirmation] = useState("")
    const [errors, setErrors] = useState()

    function handleSubmit(e) {
        e.preventDefault()

        fetch(`/users/${user.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({password: password,password_confirmation: password_confirmation})
        }).then((r) => {
                if(r.ok) {
                    r.json().then(() => {
                        props.onNextStep();
                        props.history.push("/login")
                    })
                } else {
                    r.json().then((err) => setErrors(err.errors))
                }
            })
    }

    return (
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
                <CustomButton variant="primary" type="submit">Submit</CustomButton>
            </StyledForm>
    )
}

export default withRouter(CreateNewPasswordForm);