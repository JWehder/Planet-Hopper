import React, { useState } from "react";
import styled from "styled-components";
import LoginForm from "../LoginForm";
import CustomButton from "../styles/Button";
import SignupForm from "../components/SignupForm";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom"

function LoginPage() {
    const [showLogin, setShowLogin] = useState(true)

    function handleToggleLogin() {
        setShowLogin(!showLogin)
    }

    return (
        <>  
            <Modal>
                {showLogin ? (
                    <>
                    <LoginForm />
                    <ButtonContainer>
                    <Button style={{paddingLeft: "3px"}} variant="link"><Link to="/forgot_password/enter_email">Forgot password?</Link></Button>
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
                    <SignupForm setShowLogin={setShowLogin}/>
                    <hr />
                    <p>Already have an account?</p>
                    <CustomButton onClick={handleToggleLogin}variant="secondary">Sign In</CustomButton>
                    </>
                )}
            </Modal>
        </>
    )
}

const ButtonContainer = styled.div`
    text-align: center;
    display: inline-block;
`

export default LoginPage;