import React from "react";
import { useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import ListingCard from "./ListingCard";

function SearchResults() {

    const listings = useSelector((state) => state.listings.entities)
    const errors = useSelector((state) => state.listings.listingError)

    if (!listings || !errors) {
        return <div>    
        <Spinner animation="border" role="status" />
        </div>
    }

    const listingCards = listings.map((listing) => {
        return (
              <ListingCard name= {listing.name} city={listing.city} stateProvince={listing.state_province} photos= {listing.photos} typeOfAccomodation={listing.type_of_accomodation} unitPrice={listing.unit_price} key={listing.name} />
              )
    });


    return (
        <div>
            <h1>Search Results</h1>
            {listings ?
            {listingCards} 
            :
            <h3>{errors.error}</h3>
        }
            
        </div>
    )
}

export default SearchResults;