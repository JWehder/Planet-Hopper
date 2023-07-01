import React, { useState } from "react";
import LoginForm from "../LoginForm";
import styled from "styled-components"
import { CustomButton } from "../../../styles/Styles";
import SignupForm from "../SignupForm";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button"

function LoginModal({ show, setShow }) {
    const [showLogin, setShowLogin] = useState(true)

    const handleClose = () => setShow(false)

    function handleToggleLogin() {
        setShowLogin(!showLogin)
    }

    return (
            <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Please sign up or log in</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {showLogin ? (
                    <>
                    <LoginForm />
                    <ButtonContainer>
                    {/* <Button style={{paddingLeft: "3px"}} variant="link"><Link to="/forgot_password/enter_email">Forgot password?</Link></Button>  */}
                    </ButtonContainer> 
                    <hr />
                    <ButtonContainer>
                    <p>Don't have an account?</p>
                    <CustomButton variant= "secondary" onClick={handleToggleLogin}>Sign Up</CustomButton>
                    </ButtonContainer>
                    </>
                )
                :
                (
                    <>
                    <SignupForm setShowLogin={setShowLogin} />
                    <hr />
                    <p>Already have an account?</p>
                    <CustomButton onClick={handleToggleLogin}variant="secondary">Sign In</CustomButton>
                    </>
                )}
                </Modal.Body>
            </Modal>
        </div>
    )
}

const ButtonContainer = styled.div`
    text-align: center;
    display: inline-block;
`

export default LoginModal;