import React, { useState, useEffect } from "react";
import Container from '@mui/system/Container';
import Stack from '@mui/system/Stack';
import { StyledBox } from "../../../styles/Styles";
import PropertyContainer from "../../common/PropertyContainer";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import EditBookingModal from "../components/EditBookingModal";
import { getUsersBookings } from "../state/bookingsSlice";

function BookedViewPage() {
    const dispatch = useDispatch()
    const usersBookings = useSelector((state) => state.bookings.entities)

    useEffect(() => {
        dispatch(getUsersBookings())
    }, [])

    if (!usersBookings) return <div>    
    <Spinner animation="border" role="status" />
    </div>

    console.log(usersBookings)

    return (
        <>
            <Container maxWidth="lg" fixed>
                <h2 style={{marginBottom: "30px"}}>Your Bookings</h2>
                <StyledBox>
                <Stack spacing={2}>
                    {usersBookings.map((booking) => {
                        return <PropertyContainer booking={booking} />
                    })}
                </Stack>
                </StyledBox>
            </Container>
        </>

    )
}

export default BookedViewPage;