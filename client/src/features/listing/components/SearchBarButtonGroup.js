import React, { useRef, useState } from "react";
import styled from "styled-components";
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import Fab from '@mui/material/Fab';
import Fade from 'react-bootstrap/Fade';
import Autocomplete from "./Autocomplete";
import ClickAwayListener from '@mui/base/ClickAwayListener';
import { LoadScript } from "@react-google-maps/api";
import { keys } from "../../../config";
import Popover from '@mui/material/Popover';
import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useDispatch } from "react-redux";
import axios from 'axios';
import { setListings, setErrors, setStatusToLoading, setStatusToFulfilled } from "../state/listingsSlice";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import GuestsInputBox from "./GuestsInputBox"

function SearchBarButtonGroup() {
    const dispatch = useDispatch();
    const history = useHistory();

    const startDateInputRef = useRef(null)
    const endDateInputRef = useRef(null)

    const [clicked, setClicked] = useState(false)
    const [destinationClicked, setDestinationClicked] = useState(true)
    const [searchAddress, setSearchAddress] = useState({
        address: "",
        latitude: "",
        longitude: ""
    })
    const [startDate, setStartDate] = useState(dayjs());
    const [endDate, setEndDate] = useState(dayjs(dayjs().add(1, 'day')));
    const [anchorEnd, setAnchorEnd] = useState(null);
    const [anchorStart, setAnchorStart] = useState(null)
    
    const [guests, setGuests] = useState(1)

    const handleSearchButtonClick = () =>  setClicked(!clicked)
    const showTextField = () => setDestinationClicked(true)
    const handleClickAway = () => setDestinationClicked(false)

    // guests handlers

    const handleDecreaseGuests = () => {
        if (guests === 1) {
            setGuests(1)
        } else {
            setGuests(guests - 1)
        }
    }

    // calendar and date handlers
  
    const handleCloseEnd = () => {
      setAnchorEnd(null);
    };

    const handleCloseStart = () => {
        setAnchorStart(null)
    }
  
    const openEnd = Boolean(anchorEnd);
    const openStart = Boolean(anchorStart);
    const idStart = openStart ? 'simple-popover' : undefined;
    const idEnd = openEnd ? 'simple-popover' : undefined;

    const startDateInputRect = startDateInputRef.current?.getBoundingClientRect();
    const startDateAnchorPosition = startDateInputRect ? { top: startDateInputRect.bottom + 12, left: startDateInputRect.right - 55 } : undefined

    const endDateInputRect = endDateInputRef.current?.getBoundingClientRect();
    const endDateAnchorPosition = endDateInputRect ? { top: endDateInputRect.bottom + 12, left: endDateInputRect.right - 55 } : undefined


    async function handleSubmit(e) {
        e.preventDefault()

        const searchEntry = {
            latitude: searchAddress.latitude,
            longitude: searchAddress.longitude,
            start_date: dayjs(startDate).format('YYYY-MM-DD'),
            end_date: dayjs(endDate).format('YYYY-MM-DD'),
            guests: guests
        }

        try {
            dispatch(setStatusToLoading())
            const response = await axios.post("/listings/search", searchEntry)
            dispatch(setStatusToFulfilled())
            if (response.statusText !== "OK") {
                dispatch(setErrors(response.data))
                return
            }
            dispatch(setListings(response.data))
            history.push(`/search_results/${searchAddress.address}`)
        } catch (error) {
            console.error("error occurred", error);
        }

    }

    return (
        <>
            { clicked ? 
            <Fade in={clicked}>
            <ClickAwayListener onClickAway={handleSearchButtonClick}>
            <form onSubmit={handleSubmit}>
            <SearchContainer>
                <ClickAwayListener onClickAway={handleClickAway}>
                <TextSection>
                    { destinationClicked ?
                    <LoadScript googleMapsApiKey={keys["GOOGLE_API_KEY"]} libraries={["places"]}>
                    <Autocomplete 
                    setSearchAddress={setSearchAddress} 
                    searchAddress={searchAddress} 
                    />
                    </LoadScript>
                        :
                    <SearchInputBox onClick={showTextField}>
                        Destination
                    </SearchInputBox>
                    }
                </TextSection>
                </ClickAwayListener>
                <VerticalLine />
                <TextSection>
                    <SearchInputBox 
                    onClick={() => setAnchorStart(true)}
                    style={{
                        width: "120px", 
                        marginRight: "5px", 
                        textAlign: "center"
                    }}
                    ref={startDateInputRef}
                    >
                        Check in 
                        <br />
                        {dayjs(startDate).format('YYYY-MM-DD')}
                    </SearchInputBox>

                    <Popover
                        id={idStart}
                        open={openStart}
                        anchorEl={anchorStart}
                        onClose={handleCloseStart}
                        anchorReference="anchorPosition"
                        anchorPosition={startDateAnchorPosition}
                        anchorOrigin={{
                          vertical: 'center',
                          horizontal: 'center',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'center',
                        }}
                        >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar
                             value={startDate}
                             onChange={(newValue) => setStartDate(dayjs(newValue))}
                             label="start date"
                             disablePast
                            />
                        </LocalizationProvider>
                    </Popover>
                    <SearchInputBox 
                    onClick={() => setAnchorEnd(true)}
                    style={{
                        width: "120px",
                        textAlign: "center"
                    }}
                    ref={endDateInputRef}
                    >
                        Check out 
                        <br />
                        {dayjs(endDate).format('YYYY-MM-DD')}
                    </SearchInputBox>
                    <Popover
                        id={idEnd}
                        open={openEnd}
                        anchorEl={anchorEnd}
                        onClose={handleCloseEnd}
                        anchorReference="anchorPosition"
                        anchorPosition={endDateAnchorPosition}
                        anchorOrigin={{
                          vertical: 'center',
                          horizontal: 'center',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'center',
                        }}
                        >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar
                             value={endDate}
                             onChange={(newValue) => setEndDate(dayjs(newValue))}
                             label="end date"
                             minDate={startDate.add(1, 'day')}
                            />
                        </LocalizationProvider>
                    </Popover>
                    {/* {dateError ? <p>{dateError}</p> : ""} */}
                </TextSection>
                <VerticalLine />
                <TextSection>
                    <GuestsInputBox 
                    handleDecreaseGuests={handleDecreaseGuests} 
                    setGuests={setGuests}
                    guests={guests}
                    />
                    <span>
                    <Fab type="submit" size="small" color="secondary" aria-label="edit">
                        <TravelExploreIcon />
                    </Fab>
                    </span>
                </TextSection>
            </SearchContainer>
            </form>
            </ClickAwayListener>
            </Fade>
                :
            <SearchButton onClick={handleSearchButtonClick}>
                <TextSection>Destination</TextSection>
                <VerticalLine />
                <TextSection>Dates</TextSection>
                <VerticalLine />
                <TextSection>
                    <span style={{marginRight: "35px"}}>
                        Guests
                    </span>
                    
                    <span>
                    <Fab size="small" color="secondary" aria-label="edit">
                        <TravelExploreIcon />
                    </Fab>
                    </span>
                </TextSection>
            </SearchButton>
            }
        </>
    )
}

const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 17px;
  width: 400px;
  background-color: white;
  border: 1px solid #E5E4E4;
  border-radius: 100px;
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out;

    &:hover {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    }
`;

export const SearchInputBox = styled.span`
    display: flex;
    align-items: center;
    height: 20px;
    padding: 20px;
    background-color: transparent;
    border-radius: 100px;
    font-size: 12px;
    cursor: pointer;
    transition: box-shadow 0.3s ease-in-out;

        &:hover {
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
        }
`

const VerticalLine = styled.span`
    height: 100%;
    width: 1px;
    background-color: rgba(0, 0, 0, 0.3);
    margin: 0 5px;
`

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  height: 70px;
  width: 800px;
  padding: 20px;
  background-color: white;
  border: 3px;
  border-radius: 100px;
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out;
  border: 1px solid #E5E4E4;

    &:hover {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    }

    .vertical-line {
    height: 80%;
    width: 1px;
    background-color: #D1D1D1;
    margin: 0 5px;
  }
`

const TextSection = styled.span`
  flex: 1;
  text-align: center;
  font-size: 12px;
  position: relative;
  padding: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  height: 100%;

`;


export default SearchBarButtonGroup;