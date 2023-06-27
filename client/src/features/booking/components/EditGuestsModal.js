import React, {useState} from "react"
import GuestsInputBox from "../../listing/components/GuestsInputBox";
import { useDispatch, useSelector } from "react-redux";
import { changeGuests } from "../state/bookingsSlice";
import { Modal } from "react-bootstrap";
import { ErrorMessage } from "../../../styles/Styles";
import Button from '@mui/material/Button';

function EditGuestsModal({ show, setShow }) {
    const dispatch = useDispatch()

    const guests = useSelector((state) => state.bookings.currentBooking.number_of_guests)
    const max_guests = useSelector((state) => state.listings.currentListing.max_guests_allowed)
    const guestsError = useSelector((state) => state.bookings.guestsError)

    const setGuests = (numGuests) => {
        dispatch(changeGuests(numGuests))
    }

    const handleClose = () => {
        if (guests > max_guests) {
            return
        }

        setShow(false)
    }

    return (
        <Modal
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit the Number of Guests
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <GuestsInputBox
                setGuests={setGuests}
                guests={guests}
                max_guests={max_guests}
                />
                {guestsError && 
                <ErrorMessage>
                {guestsError}
                </ErrorMessage>
                }   
        </Modal.Body>
        <Modal.Footer>
          <Button color="secondary" variant="text" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
}

export default EditGuestsModal;