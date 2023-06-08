import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListingCard from "../components/ListingCard";
import SearchForm from "../components/SearchForm"

function HomePage() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true)

    const homepageListings = useSelector((state) => state.listings.entities)

    const categories = {
        nashville: [],
        newYork: [],
        losAngeles: []
    }

    if (homepageListings) {
        homepageListings.forEach((listing) => {
            if (listing.city === "New York") {
                categories.newYork.push(listing)
            } else if (listing.city === "Nashville-Davidson") {
                categories.nashville.push(listing)
            } else if (listing.city === "Los Angeles") {
                categories.losAngeles.push(listing)
            } 
        })
    }

    useEffect(() => {
        fetchCoordinates()
      }, []);

    const fetchCoordinates = async () => {
        if (navigator.geolocation) {
            try {
                const coordinates = await usersCoordinates();
                dispatch(fetchListings(coordinates))
                setIsLoading(false)
            } catch (error) {
                console.error("Error:", error)
            }
        } else {
            dispatch(fetchListings({latitude: 0.0, longitude: 0.0}))
            console.log("Geolocation is not supported by this browser")
        }
    }

      const usersCoordinates = () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    resolve({ latitude, longitude });
                },
                (error) => {
                    reject(error)
                }
            );
        });
      };

    const listingCards = homepageListings.map((listing) => {
          return (
                <ListingCard name= {listing.name} city={listing.city} stateProvince={listing.state_province} photos= {listing.photos} typeOfAccomodation={listing.type_of_accomodation} unitPrice={listing.unit_price} key={listing.name} />
                )
    });

    if (isLoading) {
        return <div style={{textAlign: 'center'}}>Loading...</div>
    }

    return (
            <div style={{ width: '900px', textAlign: 'center', margin: '0 auto', backgroundColor: '#FFFAFA' }}>
                <SearchForm />
                {listingCards}
            </div>
    )
}

export default HomePage;