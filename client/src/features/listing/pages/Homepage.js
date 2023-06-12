import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import ListingCard from "../components/ListingCard";
import Autocomplete from "../components/Autocomplete";
import { fetchListings } from "../state/listingsSlice";
import Spinner from "react-bootstrap/Spinner"
import DateRangePickerValue from "../components/DateRangePicker";
import styled from "styled-components";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function HomePage() {
    const dispatch = useDispatch();
    const inputRef = useRef();
    const [isLoaded, setIsLoaded] = useState(false)
    const [guests, setGuests] = useState('');
    const [startDate, setStartDate] = React.useState(dayjs());
    const [endDate, setEndDate] = React.useState(dayjs(dayjs().add(1, 'day')));

    const homepageListings = useSelector((state) => state.listings.entities)

    const handleChange = (event) => {
      setGuests(event.target.value);
    };

    useEffect(() => {
        fetchCoordinates()
      }, []);

    const handlePlaceChanged = () => { 
    const [ place ] = inputRef.current.getPlaces();
    if(place) { 
        console.log(place.formatted_address)
        console.log(place.geometry.location.lat())
        console.log(place.geometry.location.lng())
    } 
}

    function handleSubmit(e) {
        e.preventDefault()

        console.log(guests)
        console.log(startDate)
        console.log()
    }

    const fetchCoordinates = async () => {
        if (navigator.geolocation) {
            try {
                const coordinates = await usersCoordinates();
                dispatch(fetchListings(coordinates))
                setIsLoaded(true)
            } catch (error) {
                console.error("Error:", error)
            }
        } else {
            dispatch(fetchListings({latitude: 0.0, longitude: 0.0}))
            console.log("Geolocation is not supported by this browser")
        }
    }

      const usersCoordinates = () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    resolve({ latitude, longitude });
                },
                (error) => {
                    reject(error)
                }
            );
        });
      };

    const listingCards = homepageListings.map((listing) => {
          return (
                <ListingCard name= {listing.name} city={listing.city} stateProvince={listing.state_province} photos= {listing.photos} typeOfAccomodation={listing.type_of_accomodation} unitPrice={listing.unit_price} key={listing.name} />
                )
    });

    if (!isLoaded) return <div>    
        <Spinner animation="border" role="status" />
  </div>

    return (
            <div style={{ width: '1100px', textAlign: 'center', margin: '0 auto', backgroundColor: '#FFFAFA' }}>
                <form onSubmit={() => console.log("submitted!")}>
                <SearchContainer>
                    <Autocomplete 
                    inputRef={inputRef}
                    handlePlaceChanged={handlePlaceChanged}
                    />
                    <DateRangePickerValue 
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    />
                    <InputLabel id="select-label">Guests</InputLabel>
                    <Select
                    labelId="select-label"
                    id="demo-simple-select"
                    value={guests}
                    label="Guests"
                    onChange={handleChange}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </SearchContainer>
                <button onSubmit={(e) => handleSubmit(e)}>submit</button>
                </form>
                {listingCards}
            </div>
    )
}

const SearchContainer = styled.div`
  display: flex;
  justify-content: center; /* horizontally center */
  align-items: center; /* vertically center */
  height: 10vh; /* adjust the height to fit your requirements */
`

const StyledForm = styled(FormControl)`
    display: flex;
    justify-content: center; /* horizontally center */
    align-items: center; /* vertically center */
    height: 10vh; /* adjust the height to fit your requirements */
`

export default HomePage;