import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import styled from "styled-components"
import { CenterDiv } from "../../../styles/Styles";
import SignupForm from "../components/SignupForm";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setLoginModal } from "../state/authSlice";
import Button from '@mui/material/Button';
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import ForgotPasswordButton from "../components/ForgotPasswordButton";

function LoginModal(props) {
    const dispatch = useDispatch()

    const [showLogin, setShowLogin] = useState(true)
    const show = useSelector((state) => state.auth.loginModal)

    const handleClose = () => dispatch(setLoginModal(false))

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
                    <CenterDiv>
                        <ForgotPasswordButton>Forgot Password?</ForgotPasswordButton>
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
                    <CenterDiv>
                        <ButtonContainer>
                            <p>Already have an account?</p>
                            <Button 
                            onClick={handleToggleLogin} 
                            color="secondary"
                            >
                                Sign In
                            </Button>
                        </ButtonContainer>
                    </CenterDiv>
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

export default withRouter(LoginModal);