import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import { useSelector } from "react-redux";
import ClickAwayListener from '@mui/base/ClickAwayListener';
import Spinner from "react-bootstrap/Spinner"
import { useDispatch } from "react-redux";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';

function ProfilePage() {
    const user = useSelector((state) => state.auth.user)
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
        dispatch(signupUser(userObject))
    }

    function changeUserValue(e) {
        setUserObject({
            ...userObject,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>  
            <StyledForm onSubmit={handleSubmit}>
                <Row>
                <Col>
                <ClickAwayListener onClickAway={() => setFirstNameClicked(false)}>
                <TextField
                id="outlined-read-only-input"
                label="First Name"
                name="first_name"
                error={error && error.first_name ? true : false}
                value={userObject.first_name}
                onClick={() => setFirstNameClicked(true)}
                InputProps={{
                    readOnly: {firstNameClicked},
                }}
                onChange={(e) => changeUserValue(e)}
                />
                {error && error.first_name && displayErrors(error.first_name)}
                </ClickAwayListener>
                <ClickAwayListener onClickAway={() => setLastNameClicked(false)}>
                <TextField
                id="outlined-read-only-input"
                name="last_name"
                error={error && error.last_name ? true : false}
                label="Read Only"
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
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={() => setShowPassword(!showPassword)}
                        edge="end"
                        >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                    label="Password"
                    name="password"
                    onChange={(e) => changeUserValue(e)}
                    InputProps={{
                        readOnly: {passwordClicked},
                    }}
                />
                {error && error.password && displayErrors(error.password)}
                <TextField
                id="outlined-read-only-input"
                label="Password"
                name="first_name"
                error={error && error.first_name ? true : false}
                value={userObject.first_name}
                onClick={() => setFirstNameClicked(true)}
                InputProps={{
                    readOnly: {firstNameClicked},
                }}
                onChange={(e) => changeUserValue(e)}
                />
                {error && error.first_name && displayErrors(error.first_name)}
                </ClickAwayListener>
                <FloatingLabel 
                label="Password" 
                className="mb-3"
                >
                <StyledForm.Control 
                type="password" 
                name="password"
                value={userObject.password}
                onChange={(e) => changeUserValue(e)}
                isInvalid={!!error && error.password}
                />
                {error && error.password && displayErrors(error.password, "password")}
                </ FloatingLabel>
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
                controlId="floatingInput"
                label="Profile Picture"
                className="mb-3"
                >
                <StyledForm.Control 
                type="text" 
                name="profile_picture"
                value={userObject.profile_picture}
                onChange={(e) => changeUserValue(e)}
                isInvalid={!!error && error.profile_picture}
                />
                {error && error.profile_picture && displayErrors(error.profile_picture)}
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
                <Form.Check 
                type="switch"
                id="custom-switch"
                label="Would you like to be a host?"
                value={userObject.host}
                onClick={() => {
                    setUserObject({...userObject, host: !userObject.host})
                }
                }
                />
                <CustomButton variant= "primary" type="submit">Sign Up</CustomButton>
            </StyledForm>
        </>
    )
}

export default ProfilePage;