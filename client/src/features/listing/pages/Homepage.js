import React, { useEffect, useState } from "react";
import CategoryContainer from "../CategoryContainer";
import { fetchAllListings, fetchListings } from "../state/listingsSlice";
import { useDispatch, useSelector } from "react-redux";
import ListingCard from "../ListingCard";

function HomePage() {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [locationObj, setLocationObj] = useState()

    const homepageListingsObj = useSelector((state) => state.listings.entities)

    useEffect(() => {
        dispatch(fetchAllListings())
    }, [])

    useEffect(() => {
        fetchCoordinates()
      }, []);

    const fetchCoordinates = async () => {
        if (navigator.geolocation) {
            try {
                const coordinates = await usersCoordinates();
                dispatch(fetchListings(coordinates))
                setLocationObj(coordinates)
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

    // const categoryContainers = Object.keys(homepageListingsObj).map((category) => {
    //       const listings = homepageListingsObj[category];
    //       return (
    //       <CategoryContainer category= {category} key={category}>
    //         {listings.map((listing) => {
    //             return (
    //             <ListingCard name= {listing.name} city={listing.city} state_province={listing.state_province} planet={listing.planet} key={listing.name} />
    //             )
    //         })}
    //       </CategoryContainer>
    //       );
    // })

    // const userListings = () => {
    //     return (
    //         <CategoryContainer show={show} setShow= {setShow} category= "movies you have reviewed" key="Reviewed Movies">
    //         {user.unique_movies.map((movie) => {
    //             return (
    //             <MovieCard overall_rating= {movie.overall_rating} id={movie.id} title={movie.title} poster={movie.poster} key={movie.title} />
    //             )
    //         })}
    //       </CategoryContainer>
    //     )
    // }

    if (isLoading) {
        return <div style={{textAlign: 'center'}}>Loading...</div>
    }

    return (
            <div style={{ width: '900px', textAlign: 'center', margin: '0 auto', backgroundColor: '#FFFAFA' }}>
            </div>
    )
}

export default HomePage;