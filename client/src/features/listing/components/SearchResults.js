import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ListingCard from "./ListingCard";
import Map from "./Map";
import LoadingPage from "../../common/LoadingPage";
import NotFoundPage from "../../common/NotFoundPage";

function SearchResults() {

    const listings = useSelector((state) => state.listings.searchResults)
    const errors = useSelector((state) => state.listings.listingError)

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 8000);

        return () => clearTimeout(timer);
    }, [])

    if (isLoading) {
        return <LoadingPage />;
    }

    if (errors || !listings) {
        return <NotFoundPage />;
    }

    const listingCards = listings.map((listing) => { 
        return (
              <ListingCard listing={listing} key={listing.name} />
              )
    });

    return (
        <div style={{minHeight: "90vh"}}>
        <h1 style={{textAlign: 'center', padding: '10px'}}>Search Results</h1>
        {listings.length > 0 ? 
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "10px" }}>
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
        </div>
    )
}

export default SearchResults;