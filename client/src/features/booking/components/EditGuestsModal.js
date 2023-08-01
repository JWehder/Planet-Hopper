import React, { useState } from "react"
import GuestsInputBox from "../../listing/components/GuestsInputBox";
import { useDispatch, useSelector } from "react-redux";
import { changeCurrentGuests } from "../state/bookingsSlice";
import { Modal } from "react-bootstrap";
import { CenterDiv, ErrorMessage } from "../../../styles/Styles";
import Button from '@mui/material/Button';

function EditGuestsModal({ show, setShow }) {
    const dispatch = useDispatch()

    const [guestsError, setGuestsError] = useState(null)

    const guests = useSelector((state) => state.bookings.currentBooking.number_of_guests)
    const max_guests = useSelector((state) => state.listings.currentListing.max_guests_allowed)

    const setGuests = (numGuests) => {
        dispatch(changeCurrentGuests(numGuests))
    }

    const handleClose = () => {
        if (guestsError) {
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
          <Modal.Title id="contained-modal-title-center">
            Edit the Number of Guests
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <CenterDiv>
                  {guestsError && 
                  <ErrorMessage>
                  {guestsError}
                  </ErrorMessage>
                  }  
                </CenterDiv>
                <CenterDiv>
                <GuestsInputBox
                setGuests={setGuests}
                guests={guests}
                max_guests={max_guests}
                setGuestsError={setGuestsError}
                /> 
                </CenterDiv>
        </Modal.Body>
        <Modal.Footer>
          <Button color="secondary" variant="text" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
}

export default EditGuestsModal;