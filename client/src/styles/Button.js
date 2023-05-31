import React from "react";
import styled from "styled-components"
import { Button } from 'react-bootstrap';

const COLORS = {
    primary: {
        "--main": "#04005E",
        "--accent": "white"
    },
    secondary: {
        "--main": "#F0FFFF",
        "--accent": "04005E"
    }
}

function CustomButton({ variant = "primary", color = "primary", ...props }) {
    let Component;
    if (variant === "primary") {
      Component = PrimaryButton;
    } else if (variant === "secondary") {
      Component = SecondaryButton;
    } 
  
    return <Component style={COLORS[color]} {...props} />;
}

const ButtonBase = styled(Button)`
    border: 1px solid transparent;
    padding: 7px 14px;
    margin: 8px 0px;
    text-align: center;
`;

const PrimaryButton = styled(ButtonBase)`
    background-color: var(--main);
    color: var(--accent);

    &:hover {
    opacity: 0.9;
    }
`

const SecondaryButton = styled(ButtonBase)`
    background-color: white;
    color: var(--main);
    border: 2px solid var(--main);

    &:hover {
    opacity: 0.9;
    }
`

const ErrorMessage = styled.p`
    color: rgb(225, 0, 25);
    font-size: 14.25px;
    margin-bottom: 4px;
`

export { CustomButton, ErrorMessage };