import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListingCard from "../components/ListingCard";
import { fetchListings } from "../state/listingsSlice";
import Spinner from "react-bootstrap/Spinner"
import styled from "styled-components";
import FormControl from '@mui/material/FormControl';

function HomePage() {

    const homepageListings = useSelector((state) => state.listings.entities)
    const status = useSelector((state) => state.listings.status)

    const listingCards = homepageListings.map((listing) => {
          return (
                <ListingCard listing={listing} />
                )
    });

    if (status === "loading") return <div>    
    <Spinner animation="border" role="status" />
    </div>

    return (
            <div style={{ width: '1100px', textAlign: 'center', margin: '0 auto', backgroundColor: '#FFFAFA' }}>
                <form>
                <SearchContainer>
                </SearchContainer>
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