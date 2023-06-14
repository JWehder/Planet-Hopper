import React, { useState } from "react";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import styled from "styled-components";
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import Fab from '@mui/material/Fab';
import Fade from 'react-bootstrap/Fade';
import Autocomplete from "./Autocomplete";
import ClickAwayListener from '@mui/base/ClickAwayListener';
import { LoadScript } from "@react-google-maps/api";
import { keys } from "../../../config";
import Popover from '@mui/material/Popover';
import DateRangePicker from "./DateRangePicker";
import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';


function SearchBarButtonGroup() {
    const [clicked, setClicked] = useState(false)
    const [destinationClicked, setDestinationClicked] = useState(true)
    const [latlng, setLatLng] = useState({
        latitude: "",
        longitude: ""
    })
    const [startDate, setStartDate] = useState(dayjs());
    const [endDate, setEndDate] = useState(dayjs(dayjs().add(1, 'day')));
    
    const [anchorEnd, setAnchorEnd] = useState(null);
    const [anchorStart, setAnchorStart] = useState(null)

    const handleSearchButtonClick = () =>  setClicked(!clicked)
    const showTextField = () => setDestinationClicked(true)
    const handleClickAway = () => setDestinationClicked(false)

    // selection of dates input
  
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


    function handleSubmit(e) {
        e.preventDefault()

        console.log(latlng.latitude, latlng.longitude)
    }

    return (
        <>
            { clicked ? 
            <Fade in={clicked}>
            <ClickAwayListener onClickAway={handleSearchButtonClick}>
            <SearchContainer>
                <ClickAwayListener onClickAway={handleClickAway}>
                <TextSection>
                    { destinationClicked ?
                    <LoadScript googleMapsApiKey={keys["GOOGLE_API_KEY"]} libraries={["places"]}>
                    <Autocomplete 
                    setLatLng={setLatLng} 
                    latlng={latlng} 
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
                    <SearchInputBox onClick={() => setAnchorStart(true)}>
                        Check in 
                    </SearchInputBox>
                    <Popover
                        id={idStart}
                        open={openStart}
                        anchorEl={anchorStart}
                        onClose={handleCloseStart}
                        anchorReference="anchorPosition"
                        anchorPosition={{ top: 125, left: 300 }}
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
                            />
                        </LocalizationProvider>
                    </Popover>
                    <SearchInputBox onClick={() => setAnchorEnd(true)}>
                        Check out 
                    </SearchInputBox>
                    <Popover
                        id={idEnd}
                        open={openEnd}
                        anchorEl={anchorEnd}
                        onClose={handleCloseEnd}
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
                            />
                        </LocalizationProvider>
                    </Popover>
                </TextSection>
                <VerticalLine />
                <TextSection>
                    <span style={{marginRight: "10px"}}>
                        <SearchInputBox>
                        Guests
                        </SearchInputBox>
                    </span>
                    
                    <span>
                    <Fab type="submit" size="small" color="secondary" aria-label="edit">
                        <TravelExploreIcon />
                    </Fab>
                    </span>
                </TextSection>
            </SearchContainer>
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
  border: 3px;
  border-radius: 100px;
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out;

    &:hover {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    }
`;

const SearchInputBox = styled.span`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 20px;
    padding: 20px;
    background-color: white;
    border: 3px;
    border-radius: 100px;
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
  width: 50%;
  padding: 20px;
  background-color: white;
  border: 3px;
  border-radius: 100px;
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out;

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