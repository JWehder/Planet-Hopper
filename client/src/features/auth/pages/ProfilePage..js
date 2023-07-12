import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import { useSelector } from "react-redux";
import ClickAwayListener from "../../common/ClickAwayListener";
import Spinner from "react-bootstrap/Spinner"
import { useDispatch } from "react-redux";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton } from "@mui/material";
import { displayErrors } from "../../../utils/helpers";
import { StyledForm, CustomButton } from "../../../styles/Styles";
import styled from "styled-components";
import { CenterDiv } from "../../../styles/Styles";

function ProfilePage() {
    const user = useSelector((state) => state.auth.user)
    const error = useSelector((state) => state.auth.signupError)
    console.log(user)
    const dispatch = useDispatch()


    const [userObject, setUserObject] = useState({
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        password: user.password,
        email: user.email,
        bio: user.bio,
    })
    const [firstNameClicked, setFirstNameClicked] = useState(false)
    const [lastNameClicked, setLastNameClicked] = useState(false)
    const [usernameClicked, setUsernameClicked] = useState(false)
    const [passwordClicked, setPasswordClicked] = useState(false)
    const [emailClicked, setEmailClicked] = useState(false)
    const [bioClicked, setBioClicked] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    if (!user) return <div>    
    <Spinner animation="border" role="status" />
    </div>
    

    function handleSubmit(e) {
        e.preventDefault()
    }

    function changeUserValue(e) {
        setUserObject({
            ...userObject,
            [e.target.name]: e.target.value
        })
    }

    return (  
            <>
            <CenterDiv style={{padding: '10px'}}>
                <h2>Edit Your Profile</h2>
            </CenterDiv>
            <CenterDiv>
                <StyledForm onSubmit={handleSubmit}>
                    <ClickAwayListener onClickAway={() => setFirstNameClicked(false)}>
                    <TextField
                    onFocus={() => setFirstNameClicked(true)}
                    id="outlined-read-only-input"
                    margin="dense"
                    label="First Name"
                    name="first_name"
                    error={error && error.first_name ? true : false}
                    value={userObject.first_name}
                    onClick={() => setFirstNameClicked(true)}
                    InputProps={{
                        readOnly: !firstNameClicked,
                    }}
                    onChange={(e) => changeUserValue(e)}
                    />
                    {error && error.first_name && displayErrors(error.first_name)}
                    </ClickAwayListener>
                    <ClickAwayListener onClickAway={() => setLastNameClicked(false)}>
                    <TextField
                    id="outlined-read-only-input"
                    margin="dense"
                    name="last_name"
                    error={error && error.last_name ? true : false}
                    label="Last Name"
                    value={userObject.last_name}
                    onClick={() => setLastNameClicked(true)}
                    InputProps={{
                        readOnly: {lastNameClicked},
                    }}
                    onChange={(e) => changeUserValue(e)}
                    />
                    {error && error.last_name && displayErrors(error.last_name)}
                    </ClickAwayListener>
                    <ClickAwayListener onClickAway={() => setUsernameClicked(false)}>
                    <TextField
                    id="outlined-read-only-input"
                    label="Username"
                    margin="dense"
                    name="username"
                    error={error && error.username ? true : false}
                    value={userObject.username}
                    onClick={() => setUsernameClicked(true)}
                    InputProps={{
                        readOnly: {usernameClicked},
                    }}
                    onChange={(e) => changeUserValue(e)}
                    />
                    {error && error.username && displayErrors(error.username)}
                    </ClickAwayListener>
                    <ClickAwayListener onClickAway={() => setPasswordClicked(false)}>
                    <TextField
                    id="outlined-read-only-input"
                    label="Password"
                    style={{width: '197px'}}
                    margin="dense"
                    name="password"
                    size="normal"
                    error={error && error.password ? true : false}
                    value={userObject.password}
                    onClick={() => setPasswordClicked(true)}
                    InputProps={{
                        readOnly: !passwordClicked,
                        endAdornment: <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={() => setShowPassword(!showPassword)}
                        edge="end"
                        >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    }}
                    onChange={(e) => changeUserValue(e)}
                    />
                    {error && error.password && displayErrors(error.password)}
                    </ClickAwayListener>
                    <ClickAwayListener onClickAway={() => setEmailClicked(false)}>
                    <TextField
                    id="outlined-read-only-input"
                    label="Email"
                    margin="dense"
                    name="email"
                    error={error && error.email ? true : false}
                    value={userObject.email}
                    onClick={() => setEmailClicked(true)}
                    InputProps={{
                        readOnly: {emailClicked},
                    }}
                    onChange={(e) => changeUserValue(e)}
                    />
                    {error && error.email && displayErrors(error.email)}
                    </ClickAwayListener>
                    <ClickAwayListener onClickAway={() => setBioClicked(false)}>
                    <TextField
                    id="outlined-read-only-input"
                    label="Bio"
                    name="bio"
                    margin="dense"
                    error={error && error.bio ? true : false}
                    value={userObject.bio}
                    onClick={() => setBioClicked(true)}
                    InputProps={{
                        readOnly: {bioClicked},
                    }}
                    onChange={(e) => changeUserValue(e)}
                    />
                    {error && error.bio && displayErrors(error.bio)}
                    </ClickAwayListener>
                    <CenterDiv>
                        <CustomButton variant= "primary" type="submit">Submit Changes</CustomButton>
                    </CenterDiv>
                </StyledForm>
            </CenterDiv>
        </>
    )
}



export default ProfilePage;