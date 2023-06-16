import React from "react";
import { useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import ListingCard from "./ListingCard";
import Map from "./Map";

function SearchResults() {

    const listings = useSelector((state) => state.listings.entities)
    const errors = useSelector((state) => state.listings.listingError)

    if (!listings) {
        return <div>    
        <Spinner animation="border" role="status" />
        </div>
    }

    const listingCards = listings.map((listing) => { 
        return (
              <ListingCard name= {listing.name} city={listing.city} stateProvince={listing.state_province} photos= {listing.photos} typeOfAccomodation={listing.type_of_accomodation} unitPrice={listing.unit_price} key={listing.name} />
              )
    });

    console.log(listings)

    return (
        <>
        <h1>Search Results</h1>
        {listings.length > 0 ? 
        <div style={{ display: "flex" }}>
            <div style={{ flex: "1" }}>
                {listingCards} 
            </div>
            <div style={{ flex: "1", marginTop: "20px" }}>
                    <Map zoom={10.5} center={{ lat: listings[0].latitude, lng: listings[0].longitude }} listings={listings} />
            </div>
        </div>
        :
        <h3>{errors.error}</h3>
        }
        </>
    )
}

export default SearchResults;