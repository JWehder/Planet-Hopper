import React, { useState, useEffect } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/system/Container';
import Stack from '@mui/system/Stack';
import { StyledBox } from "../../../styles/Styles";
import { styled } from '@mui/system';
import PropertyContainer from "../../common/PropertyContainer";
import { useSelector } from "react-redux";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import EditBookingModal from "../components/EditBookingModal";

function BookedViewPage() {
    const user = useSelector((state) => state.auth.user)

    useEffect(() => {
        dispatch(getUsersBookings())
    }, [])

    if (!user) return <div>    
    <Spinner animation="border" role="status" />
    </div>

    return (
        <>
            <Container maxWidth="lg" fixed>
                <h2 style={{marginBottom: "30px"}}>Your Bookings</h2>
                <StyledBox>
                <Stack spacing={2}>
                    {user.bookings.map((booking) => {
                        return <PropertyContainer booking={booking} />
                    })}
                </Stack>
                </StyledBox>
            </Container>
        </>

    )
}

export default BookedViewPage;