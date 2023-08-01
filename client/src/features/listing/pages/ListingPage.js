import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Map from "../components/Map";
import { getListing } from "../state/listingsSlice"; 
import styled from "styled-components"
import GuestsInputBox from "../components/GuestsInputBox";
import Button from '@mui/material/Button';
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { setCurrentBooking } from "../../booking/state/bookingsSlice";
import DateCalendars from "../../common/DateCalendars";
import { checkDatesInvalidity } from "../../common/DateCalendars";
import { ErrorMessage } from "../../../styles/Styles";
import ListingGallery from "../components/ListingGallery";
import { CenterDiv } from "../../../styles/Styles";
import LoadingPage from "../../common/LoadingPage";
import { getAlienDistance } from "../../../utils/helpers";

function ListingPage({ history }) {
    const params = useParams()
    const dispatch = useDispatch()

    const listing = useSelector((state) => state.listings.currentListing)

    const [checkinDate, setCheckinDate] = useState(null)
    const [checkoutDate, setCheckoutDate] = useState(null)
    const [nights, setNights] = useState(1)
    const [guests, setGuests] = useState(1)
    const [distance, setDistance] = useState()
    const [guestsError, setGuestsError] = useState(null)
    const [dateError, setDateError] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()

        if (checkDatesInvalidity(checkinDate, checkoutDate)) {
            setDateError("Please enter valid dates.")
            return
        }

        const bookingObj = {
            startDate: checkinDate,
            endDate: checkoutDate,
            listing_id: listing.id,
            number_of_guests: guests,
            numberOfNights: nights
        }

        setDateError(null)

        history.push(`/book/${listing.name}/${listing.id}`)
        dispatch(setCurrentBooking(bookingObj))
    }

    useEffect(() => {
        dispatch(getListing(params.id))
        .unwrap()
        .then((data) => distanceFromUser(data))
        .catch(() => history.push("/"))
    }, [])

    function srcset(image, size, rows = 1, cols = 1) {
        return {
          src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
          srcSet: `${image}?w=${size * cols}&h=${
            size * rows
          }&fit=crop&auto=format&dpr=2 2x`,
        };
    }

    if (!listing) return <LoadingPage />

    function distanceFromUser(data) {

        if (data.planet !== "Earth") {
            setDistance(` - ${getAlienDistance().distanceFromEarth} ${getAlienDistance().alienMetric}`)
            return
        } else if (!data.distance_from_user) {
            setDistance(null)
            return
        }
        setDistance(` - ${Math.floor(data.distance_from_user)}mi away`)
    }

    return (
        <div>
        <div style={{
            width: "850px",
            marginLeft: "40px",
            marginRight: "40px",
            marginBottom: "15px"
        }}
        >
            <TitleContainer>
                <h2>{listing.name}</h2>
                <p style={{
                    fontSize: "13px"
                }}
            >
                     {listing.city}{listing.state_province === "" ? "" :`, ${listing.state_province}`}, {listing.country}{distance}
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
                    <div>
                        <CenterDiv>
                            <h4>Where you are staying</h4>
                        </CenterDiv>
                        <CenterDiv>
                        <Map 
                        zoom={10.5} 
                        center={{ lat: listing.latitude, lng: listing.longitude }} 
                        listings={listing}
                        /> 
                        </CenterDiv>
                    </div>
                </LeftContainer>
                    <form onSubmit={handleSubmit}>
                    <BookingContainer>
                        <CenterDiv>
                            <h4 style={{marginBottom:"0px"}}>Book Now</h4>
                        </CenterDiv>
                        <hr />
                        <CenterDiv>
                        {dateError && 
                        <ErrorMessage>
                        {dateError}
                        </ErrorMessage>
                        }
                        </CenterDiv>
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
                        <CenterDiv>
                        {guestsError && 
                        <ErrorMessage>
                        {guestsError}
                        </ErrorMessage>
                        }
                        </CenterDiv>
                        <CenterDiv style={{margin: "10px"}}>
                        <GuestsInputBox                     
                        max_guests={listing.max_guests_allowed}
                        setGuests={setGuests}
                        guests={guests}
                        setGuestsError={setGuestsError}
                        />
                        </CenterDiv>
 
                        
                        </div>
                        <div style={{textAlign: "center"}}>
                        {nights <= 0 ? "" : `
                        ${nights} night(s) X $${listing.unit_price} = $${nights * listing.unit_price} total`}
                        </div>
                        <hr />
                        <CenterDiv>
                            <Button 
                            color="secondary" 
                            variant="outlined"
                            type="submit"
                            >
                            Book
                            </Button>
                        </CenterDiv>
                </BookingContainer>
                </form>
            </Container>
            
        </div>
        <hr />
            <ListingGallery />
        </div>
    )
}

export const ListingInfoContainer = styled.div`
    width: 600px;
    height: 275px;
    display: flex;
    border-radius: 20px;
    padding: 20px;
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
`

export const BookingContainer = styled.div`
    min-height: 200px;
    width: 340px;
    margin-left: 15px;
    border-radius: 20px;
    padding: 20px;
    position: sticky;
    top: 0;
    border: 2px solid #E5E4E4;
`

export const Container = styled.div`
    display: flex;
    width: 850px;
`

const TitleContainer = styled.div`
    text-align: left; 
    padding: 10px;
    /* position: sticky; 
    top: 0;
    background-color: #FFFAFA; */
`

const LeftContainer = styled.div`
  margin-right: 15px;
  flex: 1;
`

export default withRouter(ListingPage)