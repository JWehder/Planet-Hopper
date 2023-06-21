import React from "react";
import { useSelector } from "react-redux";
import ListingCard from "../components/ListingCard";
import Spinner from "react-bootstrap/Spinner"

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
                {listingCards}
            </div>
    )
}

export default HomePage;