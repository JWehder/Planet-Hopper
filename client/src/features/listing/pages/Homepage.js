import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListingCard from "../components/ListingCard";
import Spinner from "react-bootstrap/Spinner"
import { turnOffBooked } from "../state/listingsSlice";
import { fetchListings } from "../state/listingsSlice";
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import styled from "styled-components";

function HomePage() {
    const dispatch = useDispatch()

    const homepageListings = useSelector((state) => state.listings.entities)
    const booked = useSelector((state) => state.listings.booked)
    const usersCoordinates = useSelector((state) => state.listings.usersCoordinates)

    useEffect(() => {
        dispatch(fetchListings(usersCoordinates))
    }, [])

    if (booked) {
        dispatch(turnOffBooked())
    }

    if (!homepageListings) return <div>    
    <Spinner animation="border" role="status" />
    </div>

    console.log(homepageListings)

    return (
            <div style={{ width: '1000px', textAlign: 'center', margin: '0 auto', backgroundColor: '#FFFAFA' }}>
                <div style={{
                    borderTop: '1px solid #E5E4E4', 
                    borderBottom: '1px solid #E5E4E4',
                    padding: '12px'
                    }}
                >
                <IconContainer>
                    <RocketLaunchIcon fontSize="medium" />
                    <p style={{fontSize: '10px', marginBottom: '2px'}}>Blast Off!</p>
                </IconContainer>
                {/* <Tooltip title="blast off!">
                <IconButton
                    aria-label="go intergalactic"
                    // onClick={}
                    // onMouseDown={}
                >
                    <RocketLaunchIcon />
                </IconButton>
                </Tooltip> */}
                </ div>
                {homepageListings.map((listing) => {
                    return (
                            <ListingCard listing={listing} />
                            )
                })}
            </div>
    )
}

const IconContainer = styled.div`
    display: inline-block;
    cursor: pointer;

    &:hover {
        border-top: 2px solid #E5E4E4;
        border-bottom: 2px solid #E5E4E4;
    }

`

export default HomePage;