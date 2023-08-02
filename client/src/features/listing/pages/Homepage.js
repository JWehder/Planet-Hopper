import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListingCard from "../components/ListingCard";
import { turnOffBooked } from "../state/listingsSlice";
import { fetchListings, getAlienListings } from "../state/listingsSlice";
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import styled from "styled-components";
import LoadingPage from "../../common/LoadingPage";
import { setLoginModal } from "../../auth/state/authSlice";

function HomePage() {
    const dispatch = useDispatch()

    const homepageListings = useSelector((state) => state.listings.entities)
    const usersCoordinates = useSelector((state) => state.listings.usersCoordinates)
    const user = useSelector((state) => state.auth.user)

    useEffect(() => {
        if (!homepageListings) {
            dispatch(fetchListings(usersCoordinates))
        }

        if (!user) {
            let timer = setTimeout(() => {
                dispatch(setLoginModal(true))
            }, 3000)
    
            return () => clearTimeout(timer)
        }
    }, [])

    if (!homepageListings) return <LoadingPage />

    const handleSpaceClick = () => {
        dispatch(getAlienListings())
    }

    return (
            <div style={{ width: '1000px', textAlign: 'center', margin: '0 auto', backgroundColor: '#F8F5FF' }}>
                <div style={{
                    padding: '10px'
                    }}
                >
                <IconContainer onClick={handleSpaceClick}>
                    <RocketLaunchIcon fontSize="medium" />
                    <p style={{fontSize: '10px', marginBottom: '2px'}}>Blast Off!</p>
                </IconContainer>
                </ div>
                {homepageListings.map((listing, index) => {
                    return (
                            <ListingCard 
                            key={`${listing.name} - ${listing.index}`} 
                            listing={listing} 
                            />
                            )
                })}
            </div>
    )
}

const IconContainer = styled.div`
    display: inline-block;
    cursor: pointer;
    box-sizing: border-box;
    padding: 8px;


    &:hover {
        border-radius: 50%;
        background-color: #E5E4E4;
    }

`

export default HomePage;