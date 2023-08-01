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
import { CenterDiv, ErrorMessage } from "../../../styles/Styles";
import { setLoginModal } from "../../auth/state/authSlice";
import IconButton from "@mui/material/IconButton";
import SuccessMessagePage from "../components/SuccessMessagePage"



function ListItem ({ item, action }) {
    return (
        <div style={{display: "flex"}}>
        <div style={{
            flex: 1,
            textAlign: "left",
            padding: "0px",
            display: "flex",
            alignItems:"center"
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
    const [bookingErrors, setBookingErrors] = useState(null)
    const [successMessage, setSuccessMessage] = useState(false)

    const currentListing = useSelector((state) => state.listings.currentListing)
    const user = useSelector((state) => state.auth.user)
    const booking = useSelector((state) => state.bookings.currentBooking)

    const unitTotal = () => {
        return currentListing.unit_price * booking.numberOfNights
    }

    const fees = () => {
        return parseInt(((unitTotal() * 0.05).toFixed(2)))
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
            number_of_guests: booking.number_of_guests
        }

        dispatch(createBooking(bookingObj))
        .unwrap()
        .then(() => setSuccessMessage(true))
        .catch((err) => console.log(err))
    }

    if (!booking) {
        props.history.push(`/listings/${currentListing.name}/${currentListing.id}`)
        return
    }

    const startDate = dayjs(booking.startDate).format("YYYY-MM-DD")
    const endDate = dayjs(booking.endDate).format("YYYY-MM-DD")

    const handleDateShow = () => setShowDatesModal(true)
    const handleGuestsShow = () => setShowGuestsModal(true)

    function handleClick() {
        dispatch(setLoginModal(true))
    }

    if (successMessage) {
        return <SuccessMessagePage />
    }

    return (
        <div style={{marginLeft: "40px", marginRight: "40px", minHeight: '100vh'}}>
            {bookingErrors && <ErrorMessage>{bookingErrors}</ErrorMessage>}
            <div style={{padding: "20px", display: "flex"}}>
                <IconButton onClick={goBack}>
                    <ArrowLeftIcon color="secondary" />
                </IconButton>
                <CenterDiv style={{marginLeft: "10px"}}>
                    <h2 style={{textAlign: "center"}}>Confirm your Booking</h2>
                </CenterDiv>
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
                    <BookingInfoContainer style={{marginTop: "15px"}}>
                        <div>
                            { user ?
                            <form onSubmit={handleBookingSubmit}>
                            <div>
                                <div style={{textAlign: 'center'}}> 
                                    Hey {user.first_name}, all booking info will be sent to {user.email}. 
                                </div>
                                <hr/>
                                <CenterDiv>
                                    <Button 
                                    color="secondary" 
                                    variant="contained" 
                                    type="submit"
                                    >
                                    Confirm Booking
                                    </Button>
                                </CenterDiv>
                            </div>
                            </form>
                            :
                            <div>
                            <CenterDiv style={{marginBottom: '15px'}}>
                                You must sign in before booking
                            </CenterDiv>
                            <CenterDiv>
                                <Button 
                                color="secondary" 
                                variant="contained" 
                                type="submit"
                                onClick={handleClick}
                                >
                            Sign in
                            </Button>
                            </CenterDiv>
                            </div>
                            }

                        </div>
                    </BookingInfoContainer>
                </LeftContainer>
                <BookingContainer>
                    <div style={{
                        display:"flex", 
                        fontSize: "12px", 
                        justifyContent: "center"
                        }}
                    >
                        <img style={{
                            width: "50px", 
                            height:"40px", 
                            marginRight: "10px"
                            }} 
                            src={currentListing.photos[0]} 
                            alt={currentListing.name} 
                        />
                        <Text>{currentListing.name}</Text>
                    </div>
                    <hr/>
                    <div>
                    <h5 style={{textAlign: "center"}}>Pricing Details</h5>
                    <ListItem 
                    item={`$${currentListing.unit_price} X ${booking.numberOfNights} nights`} 
                    action={`$${unitTotal()}`} 
                    />
                    <ListItem 
                    item={"PH Fees (5%)"} 
                    action={`$${fees()}`} 
                    />
                    <hr />
                    <ListItem 
                    item={"Total"} 
                    action={`$${unitTotal() + fees()}`} 
                    />
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
    min-height: 100px;
    background-color: transparent;
    border-radius: 20px;
    padding: 20px;
    border: 2px solid #E5E4E4;
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