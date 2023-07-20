import { React, useState } from "react";
import { StyledForm } from "../../../styles/Styles";
import { Col, Row, FloatingLabel } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { signup } from "../state/authSlice";
import { displayErrors } from "../../../utils/helpers";
import Button from '@mui/material/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { CenterDiv } from "../../../styles/Styles";

function SignupForm({ setShowLogin, setShowSuccessMessage }) {
    // const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordConf, setShowPasswordConf] = useState(false)
    const [error, setError] = useState(null)

    const [userObject, setUserObject] = useState({
        first_name: "",
        last_name: "",
        username: "",
        password: "",
        password_confirmation: "",
        email: "",
        bio: "",
    })

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(signup(userObject))
        .unwrap()
        .then(() => {
            setShowSuccessMessage(true)
            setShowLogin(true)
        })
        .catch((err) => setError(err))
    }

    function changeUserValue(e) {
        setUserObject({
            ...userObject,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>  
            <StyledForm style={{padding: '5px'}} onSubmit={handleSubmit}>
                <Row>
                <Col>
                <FloatingLabel
                label="First Name"
                className="mb-3"
                >
                <StyledForm.Control 
                type="text" 
                name="first_name"
                value={userObject.first_name}
                onChange={(e) => changeUserValue(e)}
                isInvalid={!!error && error.first_name}
                />
                {error && error.first_name && displayErrors(error.first_name)}
                </FloatingLabel>
                </Col>
                <Col>
                <FloatingLabel 
                label="Last Name" 
                className="mb-3"
                >
                <StyledForm.Control 
                type="text" 
                name="last_name"
                value={userObject.last_name}
                onChange={(e) => changeUserValue(e)}
                isInvalid={!!error && error.last_name}
                />
                {error && error.last_name && displayErrors(error.last_name)}
                </ FloatingLabel>
                </Col>
                </Row>
                <FloatingLabel
                label="Username"
                className="mb-3"
                >
                <StyledForm.Control 
                type="text" 
                name="username"
                value={userObject.username}
                onChange={(e) => changeUserValue(e)}
                isInvalid={!!error && error.username}
                />
                {error && error.username && displayErrors(error.username)}
                </FloatingLabel>
                <InputGroup className="mb-3">
                <FloatingLabel 
                label="Password" 
                className="mb-3"
                >
                <StyledForm.Control 
                type={showPassword ? "text" : "password"}
                name="password"
                value={userObject.password}
                onChange={(e) => changeUserValue(e)}
                isInvalid={!!error && error.password}
                />
                {!!error && error.password && displayErrors(error.password, "password")}
                </ FloatingLabel>
                <CenterDiv style={{height: '58px', margin: '2px'}}>
                { showPassword ?
                    <IconButton 
                    aria-label="show" 
                    onClick={() => setShowPassword(false)}
                    >
                        <VisibilityOffIcon color="secondary" />
                    </IconButton>
                    :
                    <IconButton 
                    aria-label="show" 
                    onClick={() => setShowPassword(true)}
                    >
                        <VisibilityIcon color="secondary" />
                    </IconButton>
                }
                </CenterDiv>
                </InputGroup>
                <InputGroup className="mb-3">
                <FloatingLabel 
                label="Password Confirmation" 
                className="mb-3"
                >
                <StyledForm.Control 
                type={showPasswordConf ? "text" : "password"}
                name="password_confirmation"
                value={userObject.password_confirmation}
                onChange={(e) => changeUserValue(e)}
                isInvalid={!!error && error.password_confirmation}
                />
                {!!error && error.password_confirmation && displayErrors(error.password_confirmation)}
                </FloatingLabel>
                <CenterDiv style={{height: '58px', margin: '2px'}}>
                { showPasswordConf ?
                    <IconButton 
                    aria-label="show" 
                    onClick={() => setShowPasswordConf(false)}
                    >
                        <VisibilityOffIcon color="secondary" />
                    </IconButton>
                    :
                    <IconButton 
                    aria-label="show" 
                    onClick={() => setShowPasswordConf(true)}
                    >
                        <VisibilityIcon color="secondary" />
                    </IconButton>
                }
                </CenterDiv>
                </InputGroup>
                <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
                >
                <StyledForm.Control
                type="email" 
                name="email"
                value={userObject.email}
                onChange={(e) => changeUserValue(e)}
                isInvalid={!!error && error.email}
                />
                {error && error.email && displayErrors(error.email, "email")}
                </FloatingLabel>  
                <FloatingLabel 
                controlId="floatingTextarea2" 
                label="Bio" 
                className="mb-3"
                >
                <StyledForm.Control 
                as="textarea" 
                name="bio"
                style={{ height: '100px' }}
                value={userObject.bio}
                onChange={(e) => changeUserValue(e)}
                isInvalid={!!error && error.bio}
                />
                {error && error.bio && displayErrors(error.bio)}
                </FloatingLabel>
                <Button 
                color= "secondary" 
                type="submit"
                variant="contained"
                >
                    Sign Up
                </Button>
            </StyledForm>
        </>
    )
}

export default SignupForm;