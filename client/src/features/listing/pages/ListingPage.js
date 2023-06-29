import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Map from "../components/Map";
import { getListing } from "../state/listingsSlice"; 
import Spinner from "react-bootstrap/Spinner";
import styled from "styled-components"
import dayjs from "dayjs"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import GuestsInputBox from "../components/GuestsInputBox";
import Button from '@mui/material/Button';
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { setCurrentBooking, setDateError } from "../../booking/state/bookingsSlice";
import DateCalendars from "../../common/DateCalendars";
import { checkDatesValidity, convertToDate } from "../../common/DateCalendars";
import { ErrorMessage } from "../../../styles/Styles";


function ListingPage(props) {
    const params = useParams()
    const dispatch = useDispatch()

    const guestsError = useSelector((state) => state.bookings.guestsError)
    const dateError = useSelector((state) => state.bookings.dateError)
    const listing = useSelector((state) => state.listings.currentListing)
    const user = useSelector((state) => state.auth.user)

    const [checkinDate, setCheckinDate] = useState(null)
    const [checkoutDate, setCheckoutDate] = useState(null)
    const [nights, setNights] = useState(1)
    const [guests, setGuests] = useState(1)

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!checkDatesValidity(checkinDate, checkoutDate)) {
            dispatch(setDateError("Please enter valid dates."))
            return
        }

        const bookingObj = {
            startDate: checkinDate,
            endDate: checkoutDate,
            listing_id: listing.id,
            user_id: user.id,
            number_of_guests: guests,
            numberOfNights: nights
        }
        console.log(bookingObj)

        props.history.push(`/listings/${listing.id}/book`)
        dispatch(setCurrentBooking(bookingObj))
    }


    useEffect(() => {
        dispatch(getListing(params.value))
    }, [])

    function srcset(image, size, rows = 1, cols = 1) {
        return {
          src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
          srcSet: `${image}?w=${size * cols}&h=${
            size * rows
          }&fit=crop&auto=format&dpr=2 2x`,
        };
    }

    console.log(listing)

    if (!listing) return <div>    
    <Spinner animation="border" role="status" />
    </div>

    return (
        <div style={{
            width: "850px",
            padding: "20px",
            marginLeft: "40px",
            marginRight: "40px"
        }}
        >
            <TitleContainer>
                <h2>{listing.name}</h2>
                <p style={{
                    fontSize: "13px"
                }}
                >
                     {listing.city}, {listing.state_province === "" ? "" : listing.state_province}, {listing.country} - {Math.floor(listing.distance_from_user)}mi away
                </p>
            </TitleContainer>
            <div>
                <ImageList
                    sx={{ width: 970, height: 320 }}
                    variant="quilted"
                    cols={8}
                    rows={4}
                    rowHeight={75}
                    style={{ borderRadius: "20px" }}
                    >
                    {listing.photos.map((photo) => {
                        if (listing.photos.indexOf(photo) === 0) {
                            return <ImageListItem key={listing.name} cols= {4} rows={4}>
                            <img
                                {...srcset(photo, 121, 4, 4)}
                                alt={listing.name}
                                loading="lazy"
                            />
                            </ImageListItem>
                        }
                         return <ImageListItem key={listing.name} cols={2} rows={2}>
                        <img
                            {...srcset(photo, 100, 2, 2)}
                            alt={listing.title}
                            loading="lazy"
                        />
                        </ImageListItem>
                    })}
                </ImageList>
            </div>
            <Container>
                <LeftContainer>
                    <ListingInfoContainer>
                        <div style={{
                            textAlign: "left",
                        }}
                        >
                            <h4>{listing.type_of_accomodation ? `${listing.type_of_accomodation} h` : "H"}osted by {listing.listing_owner}</h4>
                            <span>{listing.beds} beds - </span>
                            <span>{listing.bedrooms} bedrooms - </span>
                            <span>{listing.bathrooms} bathrooms</span>
                            <p>${listing.unit_price} per night</p>
                            <p>{listing.description}</p>
                        </div>
                    </ListingInfoContainer>
                    <hr />
                    <div style={{
                    alignItems: "center",
                    justifyContent: "center",
                    
                    }}>
                        <h4>Where you are staying</h4>
                        <Map 
                        zoom={10.5} 
                        center={{ lat: listing.latitude, lng: listing.longitude }} 
                        listings={listing}
                        style={{
                            width: '1000'
                        }}
                        /> 
                    </div>
                </LeftContainer>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <form onSubmit={handleSubmit}>
                    <BookingContainer>
                        <h4 style={{marginBottom:"0px"}}>Book Now</h4>
                        <hr />
                        <DateCalendars
                        setCheckinDate={setCheckinDate}
                        setCheckoutDate={setCheckoutDate}
                        listing={listing}
                        setNights={setNights}
                        checkinDate={checkinDate}
                        setDateError={setDateError}
                        checkoutDate={checkoutDate}
                        />
                        <div style={{
                            marginTop: "5px"
                        }}
                        >
                        <GuestsInputBox                     
                        max_guests={listing.max_guests_allowed}
                        setGuests={setGuests}
                        guests={guests}
                        />
                        {guestsError && 
                        <ErrorMessage>
                        {guestsError}
                        </ErrorMessage>
                        }
                        </div>
                        <div style={{textAlign: "left"}}>
                        {nights <= 0 ? "" : `
                        ${nights} night(s) X $${listing.unit_price} = $${nights * listing.unit_price} total`}
                        </div>
                        {dateError && 
                        <ErrorMessage>
                        {dateError}
                        </ErrorMessage>
                        }
                        <hr />
                        <Button 
                        color="secondary" 
                        variant="outlined"
                        type="submit"
                        >
                        Book
                        </Button>
                </BookingContainer>
                </form>
                </LocalizationProvider>
            </Container>

        </div>
    )
}

export const ListingInfoContainer = styled.div`
    width: 600px;
    height: 275px;
    background-color: #E5E4E4;
    display: flex;
    border-radius: 20px;
    padding: 20px;
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
`

export const BookingContainer = styled.div`
    width: 340px;
    margin-left: 15px;
    background-color: #E5E4E4;
    border-radius: 20px;
    padding: 20px;
    position: sticky;
    top: 0;
`

export const Container = styled.div`
    display: flex;
    width: 850px;
`

const TitleContainer = styled.div`
    text-align: left; 
    /* position: sticky; 
    top: 0;
    background-color: #FFFAFA; */
`

const LeftContainer = styled.div`
  margin-right: 15px;
  flex: 1;
`

export default withRouter(ListingPage)