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

function SearchBarButtonGroup() {
    const [clicked, setClicked] = useState(false)
    const [destinationClicked, setDestinationClicked] = useState(true)
    const [latlng, setLatLng] = useState({
        latitude: "",
        longitude: ""
    })

    const handleSearchButtonClick = () =>  setClicked(!clicked)
    const handleDestinationClick = () => setDestinationClicked(!destinationClicked)
    
    function handleSubmit(e) {
        e.preventDefault()

        console.log(latlng.latitude, latlng.longitude)
    }

    return (
        <>
            { clicked ? 
            <Fade in={clicked}>
            <ClickAwayListener onClickAway={handleSearchButtonClick}>
            <form>
            <SearchContainer>
                <TextSection>
                    
                    { destinationClicked ?
                    <LoadScript googleMapsApiKey={keys["GOOGLE_API_KEY"]} libraries={["places"]}>
                    <Autocomplete 
                    setLatLng={setLatLng} 
                    latlng={latlng} 
                    />
                    </LoadScript>
                        :
                    <SearchInputButton onClick={handleDestinationClick}>
                        Destination
                    </SearchInputButton>
                    }
                </TextSection>
                <VerticalLine />
                <TextSection>
                    <SearchInputButton>
                        Check in / Check out
                    </SearchInputButton>
                </TextSection>
                <VerticalLine />
                <TextSection>
                    <span style={{marginRight: "10px"}}>
                        <SearchInputButton>
                        Guests
                        </SearchInputButton>
                    </span>
                    
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
                    <span style={{marginRight: "10px"}}>
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
  height: 40px;
  padding: 20px;
  background-color: white;
  border: 3px;
  border-radius: 100px;
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out;

    &:hover {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    }
`;

const VerticalLine = styled.span`
    height: 100%;
    width: 1px;
    background-color: rgba(0, 0, 0, 0.3);
    margin: 0 5px;
`

const SearchInputButton = styled.button`
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

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
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
    height: 100%;
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