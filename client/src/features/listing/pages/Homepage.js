import React, { useEffect, useState } from "react";
import CategoryContainer from "../CategoryContainer";
import { fetchListings } from "../state/listingsSlice";
import { useDispatch, useSelector } from "react-redux";
import ListingCard from "../ListingCard";

function HomePage() {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [locationObj, setLocationObj] = useState({
        latitude: "",
        longitude: "",
    })

    const homepageListingsObj = useSelector((state) => state.listings.entities)

    useEffect(() => {
        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocationObj({...locationObj, latitude: position.coords.latitude})
                    setLocationObj({...locationObj, longitude: position.coords.longitude})
                }
            )
        } else {
            console.log("Geolocation is not supported by this browser")
        }
        dispatch(fetchListings(locationObj));
      }, [dispatch, locationObj]);

    const categoryContainers = Object.keys(homepageListingsObj).map((category) => {
          const listings = homepageListingsObj[category];
          return (
          <CategoryContainer category= {category} key={category}>
            {listings.map((listing) => {
                return (
                <ListingCard name= {listing.name} city={listing.city} state_province={listing.state_province} planet={listing.poster} key={movie.title} />
                )
            })}
          </CategoryContainer>
          );
    })

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