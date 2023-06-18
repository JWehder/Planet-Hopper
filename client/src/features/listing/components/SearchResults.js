import React from "react";
import { useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import ListingCard from "./ListingCard";
import Map from "./Map";

function SearchResults() {

    const listings = useSelector((state) => state.listings.entities)
    const errors = useSelector((state) => state.listings.listingError)
    const status = useSelector((state) => state.listings.status)

    if (status === "loading") return <div>    
        <Spinner animation="border" role="status" />
        </div>

    const listingCards = listings.map((listing) => { 
        return (
              <ListingCard listing={listing} key={listing.name} />
              )
    });


    return (
        <>
        <h1>Search Results</h1>
        {listings.length > 0 ? 
        <div style={{ display: "flex" }}>
            <div style={{ flex: "1" }}>
                {listingCards} 
            </div>
            <div style={{ flex: "1", marginTop: "20px", width: "600px" }}>
                    <Map 
                    zoom={10.2} 
                    center={{ lat: listings[0].latitude, lng: listings[0].longitude }} 
                    listings={listings} 
                    />
            </div>
        </div>
        :
        <h3>{errors.error}</h3>
        }
        </>
    )
}

export default SearchResults;