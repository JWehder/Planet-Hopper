import React, { useEffect } from "react";
import Container from '@mui/system/Container';
import Stack from '@mui/system/Stack';
import { StyledBox } from "../../../styles/Styles";
import PropertyContainer from "../../common/PropertyContainer";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import { getUsersListings } from "../../listing/state/listingsSlice";
import ListingGallery from "../../listing/components/ListingGallery";

function BookedViewPage() {
    const dispatch = useDispatch()
    const usersListings = useSelector((state) => state.listings.usersListings)
    const user = useSelector((state) => state.auth.user)

    useEffect(() => {
        dispatch(getUsersListings())
    }, [])

    if (!usersListings) return <div>    
    <Spinner animation="border" role="status" />
    </div>

    console.log(usersListings)

    if (usersListings.length < 1) {
        return <div><h2>Your Bookings</h2>Sorry, you have no bookings to display. Please make one!</div>
    }

    const usersBookings = usersListings.reduce((accumulator, listing) => {
        const filteredBookings = listing.bookings.filter((booking) => {
            return booking.user_id === user.id;
        });
    
        if (filteredBookings.length > 0) {
        const bookingsWithListing = filteredBookings.map((booking) => {
            return {
            ...booking,
            listing: listing,
            };
        });
    
        return accumulator.concat(bookingsWithListing);
        }
       
    
        return accumulator;
    }, []);

    return (
        <>
            <Container maxWidth="lg" fixed>
                <h2 style={{marginBottom: "10px", marginTop: "20px"}}>Your Bookings</h2>
                <StyledBox>
                <Stack spacing={2}>
                    {usersBookings.map((booking) => {
                        return <PropertyContainer booking={booking} />
                    })}
                </Stack>
                </StyledBox>
                <hr />
                <ListingGallery />
            </Container>
        </>

    )
}

export default BookedViewPage;