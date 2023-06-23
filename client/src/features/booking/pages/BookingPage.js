import React from "react";
import { Container, BookingContainer, ListingInfoContainer } from "../../listing/pages/ListingPage"
import { useSelector } from "react-redux";
import styled from "styled-components";
import Button from '@mui/material/Button';
import dayjs from "dayjs";

function ListItem ({ item, action }) {
    return (
        <div style={{display: "flex"}}>
        <div style={{
            flex: 1,
            textAlign: "left"
        }}>
            <Text>{item}</Text>
        </div>
        <div style={{
            flex: 1,
            textAlign: "right"
        }}>
            <Text>{action}</Text>
        </div>
    </div>
    )
}


function BookingPage() {

    const currentListing = useSelector((state) => state.listings.currentListing)
    const booking = useSelector((state) => state.bookings.currentBooking)

    const unitTotal = () => {
        return currentListing.unit_price * booking.numberOfNights
    }

    const fees = () => {
        return currentListing.unit_price * 0.05
    }

    const startDate = dayjs(booking.startDate).format("YYYY-MM-DD")
    const endDate = dayjs(booking.endDate).format("YYYY-MM-DD")

    return (
        <div style={{marginLeft: "40px", marginRight: "40px"}}>
            <Container>
                <ListingInfoContainer>
                    <ListItem item={`Dates: ${startDate} - ${endDate}`} action={<Button variant="text">Text</Button>} />

                </ListingInfoContainer>
                <BookingContainer>
                    <div style={{display:"flex", fontSize: "12px", justifyContent: "center"}}>
                        <img style={{width: "50px", height:"40px", marginRight: "10px"}} src={currentListing.photos[0]} alt={currentListing.name} />
                        <Text>{currentListing.name}</Text>
                    </div>
                    <hr/>
                    <div>
                    <h5>Pricing Details</h5>
                    <ListItem item={`$${currentListing.unit_price} X ${booking.numberOfNights} nights`} action={`$${unitTotal()}`} />
                    <ListItem item={"PH Fees (5%)"} action={`$${fees()}`} />
                    <hr />
                    <ListItem item={"Total"} action={`$${unitTotal() + fees()}`} />
                    </div>

                    <div>
                        <p></p>
                    </div>
                </BookingContainer>
            </Container>
        </div>
    )
}

const Text = styled.p`
    font-size: 12px;
`

export default BookingPage