import React, { useState } from "react";
import { PhotoGallery, LinkStyle } from "../../styles/Styles";
import styled from "styled-components";
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import EditBookingModal from "../booking/components/EditBookingModal";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import NearMeIcon from '@mui/icons-material/NearMe';
import Tooltip from '@mui/material/Tooltip';
import dayjs from 'dayjs';

function PropertyContainer({ booking }) {
    const [show, setShow] = useState()

    const currentDate = new Date();
    const startDate = dayjs(booking.start_date).toDate()
    const endDate = dayjs(booking.end_date).toDate()

    const disableEditing = startDate < currentDate || endDate < currentDate ? true : false

    return (
        <div style={{
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            texAlign: 'center'
            }}>
            <BookingWrapper>
                <EditBookingModal booking={booking} listing={booking.listing} show={show} setShow={setShow}  />
                <div style={{ width: '25%', maxWidth: '600px' }}>
                    <PhotoGallery photos={booking.listing.photos} />
                </div>
                <AddressWrapper>
                    <h6>{booking.listing.city}{ booking.listing.state_province ? `, ${booking.listing.state_province}` : ""}</h6>
                    <div style={{fontSize: "13px"}}>{
                    booking.start_date} to {booking.end_date}
                    </div>
                    <div style={{textAlign: "left", padding: "10px"}}>
                        <p style={{fontSize: "11px", margin: "5px"}}>{booking.listing.address}</p>
                    </div>
                    <div style={{
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center'
                        }}>
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
                            <Item>Hosted by {booking.listing.listing_owner}</Item>
                        </Stack>
                    </div>
                </AddressWrapper>
            </BookingWrapper>
            <div>
            <Tooltip title="go to listing">
            <IconButton
                  aria-label="see listing"
                  style={{width: '40px', height: '40px'}}
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
                  disabled={disableEditing}
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

const AddressWrapper = styled.div`
    width: 75%;
    max-width: 600px;
    max-height: 200px;
    padding-left: 15px;
    padding-right: 15px;
`

const Item = styled.div`
    padding: 10px;
    text-align: center;
    background-color: transparent;
    font-size: 11px;
    align-items: center;
`

export default PropertyContainer;