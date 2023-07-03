import React, { useState } from "react";
import { Container, BookingContainer } from "../../listing/pages/ListingPage"
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Button from '@mui/material/Button';
import dayjs from "dayjs";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { useHistory, useParams, withRouter } from "react-router-dom/cjs/react-router-dom.min";
import DateRangeModal from "../components/DateRangeModal";
import EditGuestsModal from "../components/EditGuestsModal";
import { createBooking } from "../../listing/state/listingsSlice";
import { setCurrentBooking } from "../state/bookingsSlice";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ErrorMessage } from "../../../styles/Styles";

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


function BookPage(props) {
    const history = useHistory()
    const dispatch = useDispatch()
    const params = useParams()

    const [showDatesModal, setShowDatesModal] = useState(false)
    const [showGuestsModal, setShowGuestsModal] = useState(false)

    const currentListing = useSelector((state) => state.listings.currentListing)
    const user = useSelector((state) => state.auth.user)
    const booking = useSelector((state) => state.bookings.currentBooking)
    const booked = useSelector((state) => state.listings.booked)
    const bookingErrors = ((state) => state.bookings.bookingError)

    const unitTotal = () => {
        return currentListing.unit_price * booking.numberOfNights
    }

    const fees = () => {
        return unitTotal() * 0.05
    }

    const goBack = () => {
        history.goBack();
    }

    const handleBookingSubmit = (e) => {
        e.preventDefault()

        console.log(booking.startDate, booking.endDate)

        const bookingObj = {
            start_date: dayjs(booking.startDate).format("YYYY-MM-DD"),
            end_date: dayjs(booking.endDate).format("YYYY-MM-DD"),
            listing_id: booking.listing_id,
            user_id: user.id,
            number_of_guests: booking.number_of_guests,
            price: unitTotal(),
            fees: fees()
        }

        dispatch(createBooking(bookingObj))
    }

    if (!booking) {
        props.history.push(`/listings/${params.id}`)
        return
    }

    console.log(booking)

    const startDate = dayjs(booking.startDate).format("YYYY-MM-DD")
    const endDate = dayjs(booking.endDate).format("YYYY-MM-DD")

    const handleDateShow = () => setShowDatesModal(true)
    const handleGuestsShow = () => setShowGuestsModal(true)

    if (booked) {
        setTimeout(() => {
            dispatch(setCurrentBooking(null))
            props.history.push("/");
        }, 7000);

        return (
            <>
            <div>
                <CheckCircleIcon style={{color: "green"}} fontSize="large"/> Booked! 
            </div>
            <div>
                Please check your email for your receipt. Returning you to the homepage page now....
            </div>
            </>
        )
    }

    return (
        <div style={{marginLeft: "40px", marginRight: "40px", marginBottom:"40px"}}>
            {bookingErrors && <ErrorMessage>{bookingErrors}</ErrorMessage>}
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
                        <ListItem item={`Dates: ${startDate} to ${endDate}`} action={<Button color="secondary" onClick={handleDateShow} variant="text">Edit</Button>} />
                        <DateRangeModal 
                        booking={booking} 
                        listing={currentListing} 
                        show={showDatesModal} 
                        setShow={setShowDatesModal} 
                        />
                        <ListItem item={`Guests: ${booking.number_of_guests}`} action={<Button onClick={handleGuestsShow} color="secondary" variant="text">Edit</Button>} />
                        <EditGuestsModal
                        booking={booking}
                        show={showGuestsModal}
                        setShow={setShowGuestsModal}
                        />
                    </BookingInfoContainer>
                    <BookingInfoContainer style={{marginTop: "15px", height: "160px"}}>
                        <div>
                            { user ?
                            <form onSubmit={handleBookingSubmit}>
                            <div>
                                Hey {user.first_name}, all booking info will be sent to {user.email}. 
                                <hr/>
                                <Button 
                                color="secondary" 
                                variant="contained" 
                                type="submit"
                                >
                                Confirm Booking
                                </Button>
                            </div>
                            </form>
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

export default withRouter(BookPage)