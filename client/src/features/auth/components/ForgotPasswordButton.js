import React from "react";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { setLoginModal } from "../state/authSlice";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

function ForgotPasswordButton({ history, children }) {
    const dispatch = useDispatch()

    function handleClick() {
        dispatch(setLoginModal(false))
        history.push("/forgot_password")
    }


    return <Button variant="link" onClick={handleClick}> {children} </Button>
}

export default withRouter(ForgotPasswordButton);