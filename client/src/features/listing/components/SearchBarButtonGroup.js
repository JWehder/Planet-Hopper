import React, { useState } from "react";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import styled from "styled-components";
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import Fab from '@mui/material/Fab';
import Fade from 'react-bootstrap/Fade';
import { Autocomplete } from "@react-google-maps/api";

function SearchBarButtonGroup() {
    const [clicked, setClicked] = useState(false)
    const [destinationClicked, setDestinationClicked] = useState(false)

    const handleSearchButtonClick = () => setClicked(!clicked)
    const handleDestinationClick = () => setDestinationClicked(!destinationClicked)

    return (
        <>
            { clicked ? 
            <Fade in={clicked}>
            <SearchContainer>
                <TextSection>
                    { destinationClicked ?
                    <Autocomplete />
                        
                    }
                    <SearchInputButton onClick={handleDestinationClick}>
                        Destination
                    </SearchInputButton>
                </TextSection>
                <span className="vertical-line" />
                <TextSection>
                    <SearchInputButton>
                        Dates
                    </SearchInputButton>
                </TextSection>
                <span className="vertical-line" />
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
            </Fade>
                :
            <SearchButton onClick={handleSearchButtonClick}>
                <TextSection>Destination</TextSection>
                <span className="vertical-line" />
                <TextSection>Dates</TextSection>
                <span className="vertical-line" />
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

    .vertical-line {
    height: 100%;
    width: 1px;
    background-color: #D1D1D1;
    margin: 0 5px;
  }
`;

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
  justify-content: space-between;

  /* &:not(:last-child)::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    height: 90%;
    width: 1px;
    background-color: #ccc;
  } */
`;


export default SearchBarButtonGroup;