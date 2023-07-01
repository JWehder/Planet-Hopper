import React, { useState } from "react";
import Box from '@mui/system/Box';
import { PhotoGallery, LinkStyle } from "../../styles/Styles";
import styled from "styled-components";
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { Button } from "@mui/material";
import EditBookingModal from "../booking/components/EditBookingModal";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import NearMeIcon from '@mui/icons-material/NearMe';
import Tooltip from '@mui/material/Tooltip';

function PropertyContainer({ booking }) {
    const [show, setShow] = useState()


    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', texAlign: 'center'}}>
            <BookingWrapper>
                <EditBookingModal booking={booking} show={show} setShow={setShow}  />
                <div style={{ width: '25%', maxWidth: '600px' }}>
                    <PhotoGallery photos={booking.listing.photos} />
                </div>
                <div style={{ width: '75%', maxWidth: '600px', maxHeight: '200px', paddingLeft: '15px', paddingRight: '15px' }}>
                    <h6>{booking.listing.city}{ booking.listing.state_province ? `, ${booking.listing.state_province}` : ""}</h6>
                    <div style={{fontSize: "13px"}}>{
                    booking.start_date} to {booking.end_date}
                    </div>
                    <div style={{textAlign: "left", padding: "10px"}}>
                        <p style={{fontSize: "11px", margin: "5px"}}>{booking.listing.address}</p>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Stack
                            direction="row"
                            divider={<Divider orientation="vertical" flexItem />}
                            spacing={2}
                            sx={{display: 'flex'}}
                        >
                            <Item>${booking.price} total</Item>
                            <Item>{
                            booking.number_of_guests} {booking.number_of_guests > 1 ? "people" : "person"}
                            </Item>
                            <Item>Hosted by {booking.listing_owner}</Item>
                        </Stack>
                    </div>
                </div>
            </BookingWrapper>
            <div style={{display: 'flex', paddingRight: '10px'}}>
            <Tooltip title="go to listing">
            <IconButton
                  aria-label="see listing"
            >
                    <LinkStyle to={`/listings/${booking.listing.id}`}>              <NearMeIcon color="primary" />
                    </LinkStyle>

            </IconButton>
            </Tooltip>
            <Tooltip title="edit booking">
            <IconButton
                  aria-label="edit booking"
                  onClick={() => setShow(true)}
                  onMouseDown={() => {setShow(true)}}
                >
                  <EditIcon color="secondary" />
            </IconButton>
            </Tooltip>
            </div>
        </div>
    )
}

const BookingWrapper = styled.div`
    display: flex;
    max-width: 600px;
    max-height: 200px;
    border: 1px solid #E5E4E4;
    cursor: pointer;
    transition: box-shadow 0.3s ease-in-out;
    padding: 10px;
    border-radius: 20px;
    text-align: center;

        &:hover {
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
        }
`

const ButtonsGrid = styled.div`
    display: grid;
    grid-template: 1fr / 1fr;
    place-items: center;
    > * {
    grid-column: 1 / 1;
    grid-row: 1 / 1;
    }
`

const EditButton = styled(Button)`
    width: 60px; 
    height: 35px; 
    padding: 5px;
`

const Item = styled.div`
    padding: 10px;
    text-align: center;
    background-color: transparent;
    font-size: 11px;
    align-items: center;
`

export default PropertyContainer;