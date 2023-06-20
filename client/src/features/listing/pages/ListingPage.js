import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Map from "../components/Map";
import { getListing } from "../state/listingsSlice"; 
import Spinner from "react-bootstrap/Spinner";
import styled from "styled-components"
import dayjs from "dayjs"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import GuestsInputBox from "../components/GuestsInputBox";
import Button from '@mui/material/Button';
import { DateRange } from "react-date-range";
import isSameDay from 'date-fns/isSameDay'

function ListingPage() {
    const params = useParams()
    const dispatch = useDispatch()

    const [checkinDate, setCheckinDate] = useState(dayjs())
    const [checkoutDate, setCheckoutDate] = useState(dayjs(checkinDate).add(1, 'day'))
    const [nights, setNights] = useState(1)
    const [guests, setGuests] = useState(1)

    const listing = useSelector((state) => state.listings.currentListing)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(dayjs(checkinDate).format("YYYY-MM-DD"), dayjs(checkoutDate).format("YYYY-MM-DD"))
        console.log(guests)
    }

    const shouldDisableDate = (date) => {
        const currentDate = new Date(date)
        return listing.booked_dates.some((booked_date) =>
          isSameDay(booked_date, currentDate)
        );
    };

    const calculateNights = (checkin, checkout) => {

        const checkinDateParse = new Date(dayjs(checkin).format("YYYY-MM-DD"))
        const checkoutDateParse = new Date(dayjs(checkout).format("YYYY-MM-DD"))

        const differenceInTime = checkoutDateParse.getTime() - checkinDateParse.getTime()

        return differenceInTime / (1000 * 3600 * 24)

    }

    const handleDecreaseGuests = () => {
        if (guests === 1) {
            setGuests(1)
        } else {
            setGuests(guests - 1)
        }
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
            width: "1000px",
            padding: "40px"
        }}
        >
            <div style={{ textAlign: "left" }}>
                <h2>{listing.name}</h2>
                <p style={{
                    fontSize: "13px"
                }}
                >
                     {listing.city}, {listing.state_province === "" ? "" : listing.state_province}, {listing.country} - {Math.floor(listing.distance_from_user)}mi away
                </p>
            </div>
            <div>
                <ImageList
                    sx={{ width: 900, height: 320 }}
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
            <div style={{
                display: "flex"
            }}>
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
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <form onSubmit={handleSubmit}>
                <BookingContainer>
                    <h4 style={{marginBottom:"0px"}}>Book Now</h4>
                    <hr />
                    <div style={{
                        display: "flex",
                        marginTop: "5px"
                    }}>
                    <DatePicker
                    label="Check in"
                    value={checkinDate}
                    onChange={(newValue) => {
                        setCheckinDate(newValue)
                        setNights(calculateNights(newValue, checkoutDate))
                    }}
                    showDaysOutsideCurrentMonth
                    shouldDisableDate={shouldDisableDate}
                    disablePast
                    />
                    <DatePicker
                    label="Check out"
                    value={checkoutDate}
                    minDate={dayjs(checkinDate).add(1, 'day')}
                    onChange={(newValue) => {
                        setCheckoutDate(newValue)
                        setNights(calculateNights(checkinDate, newValue))
                    }}
                    showDaysOutsideCurrentMonth
                    shouldDisableDate={shouldDisableDate}
                    disablePast
                    />
                    </div>
                    <div style={{
                          marginTop: "5px"
                    }}
                    >
                    <GuestsInputBox                     
                    handleDecreaseGuests={handleDecreaseGuests} 
                    setGuests={setGuests}
                    guests={guests}
                    style={{
                        textAlign: "center"
                    }}
                    />
                    </div>
                    <div style={{textAlign: "left"}}>
                    {nights === 0 ? "" : `
                    ${nights} night(s) X $${listing.unit_price} = $${nights * listing.unit_price} total`}
                    </div>
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
            </div>
            <div>
                    <h4>Where you are staying</h4>
                    <Map zoom={10.5} center={{ lat: listing.latitude, lng: listing.longitude }} listings={listing} />
            </div>

        </div>
    )
}

const ListingInfoContainer = styled.div`
    width: 650px;
    height: 275px;
    background-color: #E5E4E4;
    display: flex;
    border-radius: 20px;
    padding: 20px;
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
`

const BookingContainer = styled.div`
    width: 350px;
    height: 325px;
    margin-left: 15px;
    background-color: #E5E4E4;
    border-radius: 20px;
    padding: 20px;
`

export default ListingPage;