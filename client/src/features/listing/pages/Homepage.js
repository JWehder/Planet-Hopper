import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListingCard from "../components/ListingCard";
import Spinner from "react-bootstrap/Spinner"
import { turnOffBooked } from "../state/listingsSlice";
import { fetchListings } from "../state/listingsSlice";

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

    return (
            <div style={{ width: '1000px', textAlign: 'center', margin: '0 auto', backgroundColor: '#FFFAFA' }}>
                {homepageListings.map((listing) => {
                    return (
                            <ListingCard listing={listing} />
                            )
                })}
            </div>
    )
}

export default HomePage;