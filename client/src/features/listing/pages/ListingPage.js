import React from "react";
import SearchResults from "../components/SearchResults";
import ListingInfo from "../components/ListingInfo";
import Map from "../components/Map";
import { useSelector } from "react-redux";

function ListingPage() {
    const sameCityListings = useSelector((state) => state.listings.find((listing) => listing.city === "New York")) 

    return (
        <div>
            <SearchResults />
            <ListingInfo />
            <Map />
        </div>
    )
}

export default ListingPage;