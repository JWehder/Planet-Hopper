import React, { useState } from "react";
import { Container, BookingContainer } from "../../listing/pages/ListingPage"
import { useSelector } from "react-redux";
import styled from "styled-components";
import Button from '@mui/material/Button';
import dayjs from "dayjs";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import DateRangeModal from "../components/DateRangeModal";

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
    const history = useHistory()
    const [show, setShow] = useState(false)

    const currentListing = useSelector((state) => state.listings.currentListing)
    const user = useSelector((state) => state.auth.user)
    const booking = useSelector((state) => state.bookings.currentBooking)

    const unitTotal = () => {
        return currentListing.unit_price * booking.numberOfNights
    }

    const fees = () => {
        return currentListing.unit_price * 0.05
    }

    const goBack = () => {
        history.goBack();
    }

    const startDate = dayjs(booking.startDate).format("YYYY-MM-DD")
    const endDate = dayjs(booking.endDate).format("YYYY-MM-DD")

    const handleShow = () => setShow(true)

    console.log(booking)

    return (
        <div style={{marginLeft: "40px", marginRight: "40px", marginBottom:"40px"}}>
            <div style={{marginBottom: "20px", display: "flex"}}>
                <BackButton onClick={goBack}>
                    <ArrowLeftIcon />
                </BackButton>
                <div style={{marginLeft: "10px"}}>
                    <h2 style={{textAlign: "center"}}>Confirm your Booking</h2>
                </div>

            </div>
            <Container>
                <LeftContainer>
                    <BookingInfoContainer>
                        <ListItem item={`Dates: ${startDate} to ${endDate}`} action={<Button color="secondary" onClick={handleShow} variant="text">Edit</Button>} />
                        <DateRangeModal 
                        booking={booking} 
                        listing={currentListing} 
                        show={show} 
                        setShow={setShow} 
                        />
                        <ListItem item={`Guests: ${booking.number_of_guests}`} action={<Button color="secondary" variant="text">Edit</Button>} />
                    </BookingInfoContainer>
                    <BookingInfoContainer style={{marginTop: "15px", height: "160px"}}>
                        <div>
                            { user ?
                            <div>
                                Hey {user.first_name}, all booking info will be sent to {user.email}. 
                                <hr/>
                                <Button color="secondary" variant="contained">
                                Confirm Booking
                                </Button>
                            </div>
                            :
                            ""
                            }

                        </div>
                    </BookingInfoContainer>
                </LeftContainer>
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

const BookingInfoContainer = styled.div`
    width: 500px;
    height: 125px;
    background-color: #E5E4E4;
    border-radius: 20px;
    padding: 20px;
`

const LeftContainer = styled.div`
  flex: 1;
`

const BackButton = styled.div`
    border-radius: 50%;
    padding: 10px;
    cursor: pointer;

    &:hover {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    }
`

export default BookingPage