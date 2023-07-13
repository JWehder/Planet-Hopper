import React from "react";
import styled from "styled-components"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import Box from '@mui/system/Box';
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import PhotosCarousel from "../features/listing/components/PhotosCarousel"
import { createGlobalStyle } from 'styled-components'

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

export function CustomButton({ variant = "primary", color = "primary", ...props }) {
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

export const ErrorMessage = styled.p`
    color: rgb(200, 0, 55);
    font-size: 13px;
    margin-bottom: 4px;
`

export const Container = styled.div`
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    height: 400px;
    overflow: scroll;
    margin: 10px;
`

export const StyledForm = styled(Form)`
    color: #04005E;
    &:focus-within {
        color: #04005E;
    }
`

export const Wrapper = styled.section`
    max-width: 500px;
    margin: 40px auto;
    padding: 16px;
    background-color: #F5F5F5;
    border: 1px;
    border-radius: 10px;
    box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.3);
`

export const CenterDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

export const ListingContainer = styled.div`
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    height: 250px;
    overflow: scroll;
    margin: 10px;
`

export const StyledBox = styled(Box)`
    border-radius: 20px; 
    padding: 20px;
    margin: 20px;

`

export const LinkStyle = styled(Link)`
    text-decoration: none;
    color: inherit;
`

export const PhotoGallery = styled(PhotosCarousel)`
    width: 100px;
    margin: auto;
    border-radius: 10px;

    &:hover {
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    }

`