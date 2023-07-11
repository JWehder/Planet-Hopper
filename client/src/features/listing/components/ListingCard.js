import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { LinkStyle } from "../../../styles/Styles";
import { PhotoGallery } from "../../../styles/Styles";

function ListingCard({ listing }) {

    const alienDistanceMeasurements = ['parsecs', 'zogrons', 'quasarons', 'nebulums','warp units', 'hyperparsecs', 'exostrides']

    const alienMetric = alienDistanceMeasurements[Math.floor(Math.random() * alienDistanceMeasurements.length)]
    const distanceFromEarth = getRandomNumber(1, 20)

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
      

    return (
            <ListingContainer>
                <LinkStyle to={`/listings/${listing.id}`}>
                <ListingButton>
                        <PhotoGallery style={{width: '300px'}} photos={listing.photos} />
                </ListingButton>
                <div style={{ paddingLeft: '20px'}}>
                    <ListingContent>
                        <ListingPara>{listing.city}, {listing.state_province}</ListingPara>
                    </ListingContent>
                        <ListingPara>
                            {listing.type_of_accomodation}
                        </ListingPara>
                        <ListingPara>
                            {listing.planet_name === "Earth" ?
                            `${Math.floor(listing.distance_from_user)} miles away` :
                            `${distanceFromEarth} ${alienMetric} away`
                            }
                        </ListingPara>
                        <ListingPara>${listing.unit_price} per night</ListingPara>
                        <ListingPara>Available {listing.next_available_date}</ListingPara>
                </div>
                </LinkStyle>
            </ListingContainer>
    )
}

const ListingButton = styled.button`
    width: 150px;
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