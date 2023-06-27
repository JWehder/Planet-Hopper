import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ListingCard from "../components/ListingCard";
import Spinner from "react-bootstrap/Spinner"
import { turnOffBooked } from "../state/listingsSlice";

function HomePage() {
    const dispatch = useDispatch()

    const homepageListings = useSelector((state) => state.listings.entities)
    const status = useSelector((state) => state.listings.status)
    const booked = useSelector((state) => state.listings.booked)

    const listingCards = homepageListings.map((listing) => {
          return (
                <ListingCard listing={listing} />
                )
    });

    if (booked) {
        dispatch(turnOffBooked())
    }

    if (status === "loading") return <div>    
    <Spinner animation="border" role="status" />
    </div>

    return (
            <div style={{ width: '1000px', textAlign: 'center', margin: '0 auto', backgroundColor: '#FFFAFA' }}>
                {listingCards}
            </div>
    )
}

export default HomePage;