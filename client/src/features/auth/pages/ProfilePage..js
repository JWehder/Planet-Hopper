import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import { useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner"
import { useDispatch } from "react-redux";
import { displayErrors } from "../../../utils/helpers";
import { StyledForm } from "../../../styles/Styles";
import { CenterDiv } from "../../../styles/Styles";
import { FloatingLabel } from "react-bootstrap";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { updateUser } from "../state/authSlice";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function ProfilePage() {
    const user = useSelector((state) => state.auth.user)
    const error = useSelector((state) => state.auth.signupError)
    console.log(user)
    const dispatch = useDispatch()

    const [userObject, setUserObject] = useState({
        id: "",
        first_name: "",
        username: "",
        password: "",
        email: "",
        bio: "",
    })

    useEffect(() => {
        if(user){
            setUserObject({
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                username: user.username,
                password: user.password,
                email: user.email,
                bio: user.bio,
            });
        }
    }, [user]);


    const StyledTextField = styled(TextField)({
        '& .MuiInputBase-input': {
            fontSize: 12,
            width: 'auto'
        }
      });

    if (!user) return <CenterDiv>    
    <Spinner animation="border" role="status" />
    </CenterDiv>
    

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(updateUser(userObject))
    }

    function changeUserValue(e) {
        console.log(e.target.name, e.target.value)
        setUserObject({
            ...userObject,
            [e.target.name]: e.target.value
        });
    }

    return (  
            <div style={{backgroundColor: '#F8F5FF', minHeight: '100vh'}}>
            <CenterDiv style={{padding: '10px'}}>
                <h2>Edit Your Profile</h2>
            </CenterDiv>
            <CenterDiv>
                <form onSubmit={handleSubmit}>
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
                    <CenterDiv>
                            <Button 
                                color="secondary" 
                                variant="contained" 
                                type="submit"
                                >
                                Save Changes
                            </Button>
                    </CenterDiv>
                </form>
            </CenterDiv>
            </div>
    )
}

export default ProfilePage;