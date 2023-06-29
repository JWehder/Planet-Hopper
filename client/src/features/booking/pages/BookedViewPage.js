import React from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/system/Container';
import Stack from '@mui/system/Stack';
import { StyledBox } from "../../../styles/Styles";
import { styled } from '@mui/system';
import { useSelector } from "react-redux";

function BookedViewPage() {
    const user = useSelector((state) => state.auth.user)

    console.log(user)

    return (
        <>
            <Container maxWidth="lg" fixed>
                <StyledBox style={{height: '100px'}}>
                <Stack spacing={2}>

                </Stack>
                </StyledBox>
            </Container>
        </>

    )
}

export default BookedViewPage;