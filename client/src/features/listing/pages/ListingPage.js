import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Map from "../components/Map";
import axios from "axios";
import { getListing } from "../state/listingsSlice"; 
import Spinner from "react-bootstrap/Spinner";
import styled from "styled-components"
import dayjs from "dayjs"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import GuestsInputBox from "../components/GuestsInputBox";


function ListingPage() {
    const params = useParams()
    const dispatch = useDispatch()

    const [checkinDate, setCheckinDate] = useState(dayjs())
    const [checkoutDate, setCheckoutDate] = useState(dayjs(dayjs().add(1, 'day')))

    const [guests, setGuests] = useState(1)

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

    const listing = useSelector((state) => state.listings.currentListing)

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
        }}>
            <div style={{ textAlign: "left" }}>
                <h2>{listing.name}</h2>
                <p><Link>{listing.city}, {listing.state_province === "" ? "" : listing.state_province}, {listing.country}</Link></p>
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
                        <h4>Hosted by {listing.listing_owner}</h4>
                        <span>{listing.beds} beds - </span>
                        <span>{listing.bedrooms} bedrooms - </span>
                        <span>{listing.bathrooms} bathrooms</span>
                        <p>${listing.unit_price} per night</p>
                        <p>{listing.description}</p>
                    </div>
                </ListingInfoContainer>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <BookingContainer>
                    <DatePicker
                    label="Check in"
                    value={checkinDate}
                    onChange={(newValue) => setCheckinDate(newValue)}
                    disablePast
                    />
                    <DatePicker
                    label="Check out"
                    value={checkoutDate}
                    onChange={(newValue) => setCheckoutDate(newValue)}
                    disablePast
                    />
                    <br />
                    <GuestsInputBox                     
                    handleDecreaseGuests={handleDecreaseGuests} 
                    setGuests={setGuests}
                    guests={guests}
                    />
                </BookingContainer>
                </LocalizationProvider>
                    {/* <div style={{flex: 1}}>
                        <h4>Where you are staying</h4>
                        <Map zoom={10.5} center={{ lat: listing.latitude, lng: listing.longitude }} listings={listing} />
                    </div> */}
            </div>

        </div>
    )
}

const ListingInfoContainer = styled.div`
    width: 650px;
    background-color: #E5E4E4;
    display: flex;
    border-radius: 20px;
    padding: 20px;
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
`

const BookingContainer = styled.div`
    width: 400px;
    height: 275px;
    margin-left: 20px;
    background-color: #E5E4E4;
    display: flex;
    border-radius: 20px;
    padding: 20px;
`

export default ListingPage;