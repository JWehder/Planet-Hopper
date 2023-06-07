import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function ListingCard({ name, city, stateProvince, typeOfAccomodation, unitPrice,  }) {

    return (
            <ListingContainer>
                {/* <LinkStyle to={`/listings/${id}`}> */}
                <ListingButton>
                        <ListingImg src={poster} alt={poster} />
                </ListingButton>
                <div style={{ paddingLeft: '10px'}}>
                    <ListingContent>
                        <img src="/potato-5-16.png" alt="potato"></img>
                        <ListingPara>{overall_rating}%</ListingPara>
                    </ListingContent>
                        <ListingPara>{title}</ListingPara>
                </div>
                </LinkStyle>
            </ListingContainer>
    )
}

const ListingButton = styled.button`
    width: 180px;
    height: 258px;
    background: transparent;
    border: none;
    border-radius: 10px;
`

const ListingImg = styled.img`
    width: 180px;
    height: 258px;
    border: none;
    border-radius: 10px;

    &:hover {
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    }
`

const ListingContainer = styled.div`
    width: 180px;
    height: 340px;
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