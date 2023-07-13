import React, { useEffect, useRef } from "react"
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import styled from 'styled-components'
import { useDispatch, useSelector } from "react-redux";
import ListingCard from "./ListingCard";
import { fetchListings } from "../state/listingsSlice";
import Spinner from "react-bootstrap/Spinner";
import { CenterDiv } from "../../../styles/Styles";

function ListingGallery() {
    const dispatch = useDispatch()

    const scrollContainer = useRef(null)

    const listings = useSelector((state) => state.listings.entities)
    const usersCoordinates = useSelector((state) => state.listings.usersCoordinates)

    console.log(usersCoordinates)

    useEffect(() => {
        if (!listings) {
            dispatch(fetchListings(usersCoordinates))
        }        

    }, [])

    if (!listings) return <div>    
    <Spinner animation="border" role="status" />
    </div>

    const handleBackClick = () => {
        scrollContainer.current.style.scrollBehavior = 'smooth'
        scrollContainer.current.scrollLeft -= 400
    }

    const handleNextClick = () => {
        scrollContainer.current.style.scrollBehavior = 'smooth'
        scrollContainer.current.scrollLeft += 400
    }

    console.log(usersCoordinates)

    return (
        <>
        <CenterDiv>
            <div style={{textAlign: 'left'}}>Some other listings you may like</div>
        </CenterDiv>
        <CenterDiv>
        <Gallery>
            <BackBtn color="secondary" fontSize="large" onClick={handleBackClick} />
            <List ref={scrollContainer}>
                <GalleryWrap>
                        {listings.map((listing) => {
                            return <ListingCard listing={listing} key={listing.id}/>
                        })}
                </GalleryWrap>
            </List>
            <NextBtn onClick={handleNextClick} color="secondary" fontSize="large" />
        </Gallery>
        </CenterDiv>
        </>
    )
}

const Gallery = styled.div`
    width: 1000px;
    display: flex;
    overflow-x: scroll;
    align-items: center;
    justify-content:center;
    display: flex;

`

const List = styled.div`
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    height: 315px;
    overflow: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
`

const GalleryWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10% auto;
`

const BackBtn = styled(ArrowLeftIcon)`
    cursor: pointer;
    margin: 2px;

`
const NextBtn = styled(ArrowRightIcon)`
    cursor: pointer;
    margin: 2px;
`

export default ListingGallery;