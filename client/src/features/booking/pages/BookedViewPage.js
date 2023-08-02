import React, { useEffect, useState } from "react";
import Container from '@mui/system/Container';
import Stack from '@mui/system/Stack';
import { FullPageContainer, StyledBox } from "../../../styles/Styles";
import PropertyContainer from "../components/PropertyContainer";
import { useDispatch, useSelector } from "react-redux";
import { getUsersListings } from "../../listing/state/listingsSlice";
import ListingGallery from "../../listing/components/ListingGallery";
import LoadingPage from "../../common/LoadingPage";

function NoBookings() {
    return (
        <FullPageContainer>
            <div style={{textAlign: 'center'}}>
                Sorry, you have no bookings to display. Please make one!
            </div>
        </FullPageContainer>
    )
}

function BookedViewPage() {
    const dispatch = useDispatch()
    const usersListings = useSelector((state) => state.listings.usersListings)
    const user = useSelector((state) => state.auth.user)

    const [usersBookings, setUsersBookings] = useState(determineUsersBookings())

    useEffect(() => {
        if (!usersListings) {
            dispatch(getUsersListings())
        }

    }, [dispatch, user, usersListings])

    useEffect(() => {
        setUsersBookings(determineUsersBookings())
    }, [usersListings])

    if (!usersListings || !usersBookings) return <LoadingPage />

    if (usersListings.length < 1) {
        return <NoBookings />
    }

    function determineUsersBookings() {
        if (!user || !usersListings) {
            return []
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
        
        let today = new Date();

        return usersBookings.sort((a, b) => {
            return Math.abs(today - new Date(a.start_date)) - Math.abs(today - new Date(b.start_date));
        });
    }

    return (
        <>
            <Container maxWidth="lg" fixed style={{textAlign: 'center', backgroundColor: '#F8F5FF'}}>
                <h2 style={{marginBottom: "10px", padding: "10px"}}>Your Bookings</h2>
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