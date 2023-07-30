import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { LinkStyle } from "../../../styles/Styles";
import { PhotoGallery } from "../../../styles/Styles";
import { getAlienDistance } from "../../../utils/helpers";

function ListingCard({ listing }) { 
    const [distance, setDistance] = useState()

    useEffect(() => {
        determineDistance()
    }, [])

    function determineDistance() {
        if (listing.planet_name !== "Earth") {
            setDistance(`${getAlienDistance().distanceFromEarth} ${getAlienDistance().alienMetric}`)
            return
        } else if (!listing.distance_from_user) {
            setDistance(null)
            return
        }
        setDistance(`${Math.floor(listing.distance_from_user)}mi away`)
    }

    return (
            <ListingContainer>
                <LinkStyle to={`/listings/${listing.id}`}>
                <ListingButton>
                        <PhotoGallery style={{width: '300px'}} photos={listing.photos} />
                </ListingButton>
                <div style={{ paddingLeft: '20px'}}>
                    <ListingContent>
                        <ListingPara>
                            {listing.city}{listing.state_province ? `, ${listing.state_province}` : ""}, {listing.country} 
                        </ListingPara>
                    </ListingContent>
                        <ListingPara>
                            {listing.type_of_accomodation}
                        </ListingPara>
                        <ListingPara>
                            { distance }
                        </ListingPara>
                        <ListingPara>${listing.unit_price} per night</ListingPara>
                        <ListingPara>Available {listing.next_available_date}</ListingPara>
                </div>
                </LinkStyle>
            </ListingContainer>
    )
}

const ListingButton = styled.button`
    width: 175px;
    height: 100px;
    background: transparent;
    border: none;
    border-radius: 10px;
`

const ListingContainer = styled.div`
    width: 180px;
    height: 250px;
    border-radius: 10px;
    margin: 20px;
    margin-left: 10px;
    display: inline-grid;
    cursor: pointer;
`

const ListingPara = styled.p`
    font-size: 12px;
    margin: 0px 0px 0px 3px;
    text-align: left;
`
const ListingContent = styled.span`
    display: flex;
    margin-bottom: 5px;
    margin-top: 5px;
`

export default withRouter(ListingCard);