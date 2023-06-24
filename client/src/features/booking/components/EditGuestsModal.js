import React, {useState} from "react"
import GuestsInputBox from "../../listing/components/GuestsInputBox";
import { useDispatch, useSelector } from "react-redux";
import { changeGuests } from "../state/bookingsSlice";

function EditGuestsModal() {
    const dispatch = useDispatch()

    const guests = useSelector((state) => state.bookings.currentBooking.number_of_guests)

    const setGuests = (numGuests) => {
        dispatch(changeGuests(numGuests))
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <GuestsInputBox
                listing={listing}
                setGuests={setGuests}
                guests={guests}
                />
                {dateError && 
                <ErrorMessage>
                {dateError}
                </ErrorMessage>
                }   
            </LocalizationProvider>
        </Modal.Body>
        <Modal.Footer>
          <Button color="secondary" variant="text" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
}

export default EditGuestsModal;