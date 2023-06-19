import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import PhotoCarousel from "./PhotosCarousel";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setErrors } from "../state/listingsSlice";
import { useHistory, withRouter } from "react-router-dom";

function ListingCard({ listing }, props) {
    const history = useHistory()
    const dispatch = useDispatch()
    console.log(listing)

    async function handleClick() {
        // try {
        //     const response = await axios.get(`/listings/${listing.id}`)
        //     console.log(response)
        //     if (response.statusText !== "OK") {
        //         dispatch(setErrors(response.data))
        //         return
        //     }
        //     dispatch(setCurrentListing(response.data))
        //     props.history.push(`/listings/${listing.name}`)

        // } catch (error) {
        //     console.error("error occurred", error);
        // }
    }

    return (
            <ListingContainer onClick={handleClick}>
                <LinkStyle to={`/listings/${listing.id}`}>
                <ListingButton>
                        <PhotoGallery photos={listing.photos} />
                </ListingButton>
                <div style={{ paddingLeft: '10px'}}>
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

export default withRouter(ListingCard);