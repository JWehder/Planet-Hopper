import React, { useState } from "react";
import { Wrapper } from "../../../styles/Styles";
import EnterCodeForm from "../components/EnterCodeForm";
import CreateNewPasswordForm from "../components/CreateNewPasswordForm";
import { Button } from "react-bootstrap"
import { withRouter } from "react-router-dom"
import EnterEmailForm from "../components/EnterEmailForm";
import { useDispatch } from "react-redux";
import { setLoginModal } from "../state/authSlice";

function ForgotPasswordPage() {
    const dispatch = useDispatch()

    const [step, setStep] = useState(1)
    const [email, setEmail] = useState(null)
    const [id, setId] = useState(null)

    function RenderForm() {
        switch (step) {
            case 1:
              return <EnterEmailForm 
              onNextStep={() => setStep(step + 1)} 
              email={email}
              setEmail={setEmail}
              id={id}
              />
            case 2:
              return <EnterCodeForm 
              email={email} 
              onNextStep={() => setStep(step + 1)} 
              setId={setId}
              />
            case 3:
              return <CreateNewPasswordForm onNextStep={() => setStep(1)}/>
            default:
              return null;
        }
    }

    return (
        <div style={{minHeight: '90vh', backgroundColor: '#F8F5FF' }}>
            <Wrapper>
                {RenderForm()}
                <hr />
                <Button 
                onClick={() => dispatch(setLoginModal(true))} 
                variant="link"
                >
                    Remember Password?
                </Button> 
            </Wrapper>
        </div>

    )
}

export default withRouter(ForgotPasswordPage);