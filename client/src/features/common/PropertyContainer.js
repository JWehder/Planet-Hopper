import React, { useState } from "react";
import Box from '@mui/system/Box';
import { useSelector } from "react-redux";
import axios from "axios";

function PropertyContainer() {
    const [bookedListings, setBookedListings] = useState(null)

    const usersBookings = useSelector((state) => state.auth.user.bookings)

    const bookedListingsIds = userBookings.map((booking) => booking.listing_id)

    const getUsersListings = async() => {

        try {
            const response = await axios.post('/usersListings', {
                listingIds: bookedListingsIds
            })
            setBookedListings(response.data)

        } catch(error) {
            console.error(error)
        }
    }
    

    if (!bookedListings) return <div>    
    <Spinner animation="border" role="status" />
    </div>

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ flex: 1 }}>

            </div>
            <div style={{ flex: 1 }}>

            </div>
        </div>
    )
}

export default PropertyContainer;