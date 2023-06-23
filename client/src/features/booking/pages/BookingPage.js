import React from "react";
import { Container, BookingContainer, ListingInfoContainer } from "../../listing/pages/ListingPage"
import { useSelector } from "react-redux";

function BookingPage() {

    const currentListing = useSelector((state) => state.listings.currentListing)

    return(
        <div>
            <Container>
                <ListingInfoContainer>
                </ListingInfoContainer>
                <BookingContainer>
                    <div style={{display:"flex", fontSize: "12px"}}>
                        <img style={{width: "50px", height:"40px", marginRight: "10px"}} src={currentListing.photos[0]} alt={currentListing.name} />
                        <p style={{textAlign: "center"}}>{currentListing.name}</p>
                    </div>
                    <hr/>
                    <div>
                    <h5>Pricing Details</h5>
                    <p></p>
                    </div>
                    

                    <div>
                        <p></p>
                    </div>
                </BookingContainer>
            </Container>
        </div>
    )
}

export default BookingPage