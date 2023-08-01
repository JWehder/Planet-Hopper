import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { displayErrors } from "../../../utils/helpers";
import { StyledForm } from "../../../styles/Styles";
import { CenterDiv } from "../../../styles/Styles";
import { FloatingLabel } from "react-bootstrap";
import Button from '@mui/material/Button';
import { updateUser } from "../state/authSlice";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LoadingPage from "../../common/LoadingPage";
import SuccessMessage from "../../common/SuccessMessage";

function ProfilePage() {
    const user = useSelector((state) => state.auth.user)

    const dispatch = useDispatch()

    const [error, setError] = useState(null)
    const [savedChanges, setSavedChanges] = useState(false)

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

    if (!user) return <LoadingPage />

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(updateUser(userObject))
        .unwrap()
        .then(() => setSavedChanges(true))
        .catch((err) => setError(err))
    }

    function changeUserValue(e) {
        setUserObject({
            ...userObject,
            [e.target.name]: e.target.value
        });
    }

    function showSavedChanges() {
        if (savedChanges) {
            setTimeout(() => {
                setSavedChanges(null)
            }, 5000);
    
            return <SuccessMessage message="Saved Changes" />
        }
    }

    return (  
            <div style={{backgroundColor: '#F8F5FF', minHeight: '100vh'}}>
            
            <CenterDiv style={{padding: '10px'}}>
                <h2>Edit Your Profile</h2>
            </CenterDiv>
            <CenterDiv style={{padding: '10px'}}>
                {showSavedChanges()}
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