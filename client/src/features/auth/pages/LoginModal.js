import React, { useState } from "react";
import LoginForm from "../LoginForm";
import styled from "styled-components"
import { CustomButton, CenterDiv } from "../../../styles/Styles";
import SignupForm from "../SignupForm";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import { setLoginModal } from "../state/authSlice";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function LoginModal() {
    const [showLogin, setShowLogin] = useState(true)
    const show = useSelector((state) => state.auth.loginModal)

    const handleClose = () => setLoginModal(false)

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
                    <CenterDiv style={{padding: '5px'}}>
                        <Link to="/forgot_password/enter_email">Forgot password?</Link>
                    </CenterDiv>
                    </ButtonContainer> 
                    <hr />
                    <CenterDiv>
                    <ButtonContainer>
                    <p>Don't have an account?</p>
                    <Button 
                    color= "secondary" 
                    onClick={handleToggleLogin}
                    >Sign Up
                    </Button>
                    </ButtonContainer>
                    </CenterDiv>
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