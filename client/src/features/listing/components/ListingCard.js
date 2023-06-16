import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import PhotoCarousel from "./PhotosCarousel";
import { useDispatch } from "react-redux";

function ListingCard({ listing }) {
    const dispatch = useDispatch()

    return (
            <ListingContainer onClick={() => dispatch()}>
                <LinkStyle to={`/listings/${listing.name}`}>
                <ListingButton>
                        <PhotoGallery photos={listing.photos} />
                </ListingButton>
                <div style={{ paddingLeft: '10px'}}>
                    <ListingContent>
                        <ListingPara>{listing.city}, {listing.stateProvince}</ListingPara>
                    </ListingContent>
                        <ListingPara>{listing.typeOfAccomodation}</ListingPara>
                        <ListingPara>${listing.unitPrice} per night</ListingPara>
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

const PhotoGallery = styled(PhotoCarousel)`
    width: 100px;
    margin: auto;
    border-radius: 10px;

    &:hover {
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    }

`

const ListingContainer = styled.div`
    width: 180px;
    height: 250px;
    border-radius: 10px;
    margin: 20px;
    margin-left: 10px;
    display: inline-grid;
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

const LinkStyle = styled(Link)`
    text-decoration: none;
    color: inherit;
`

export default ListingCard;