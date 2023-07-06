import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { LinkStyle } from "../../../styles/Styles";
import { PhotoGallery } from "../../../styles/Styles";

function ListingCard({ listing }) {

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
                        <ListingPara>{listing.type_of_accomodation}</ListingPara>
                        <ListingPara>${listing.unit_price} per night</ListingPara>
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
    transition: box-shadow 0.3s ease-in-out;

    &:hover {
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    }
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