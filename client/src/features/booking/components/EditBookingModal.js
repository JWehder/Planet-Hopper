import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import DateCalendars from "../../common/DateCalendars";
import { useDispatch, useSelector } from "react-redux";
import { updateBooking, deleteBooking } from "../../listing/state/listingsSlice"
import { Button } from "@mui/material";
import GuestsInputBox from "../../listing/components/GuestsInputBox"
import dayjs from "dayjs";
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import ErrorMessage from "../../common/ErrorMessage";

function EditBookingModal({ booking, show, setShow, listing }) {
  const dispatch = useDispatch()
  const bookingError = useSelector((state) => state.listings.bookingError)

  const [initialCheckinDate, setInitialCheckinDate] = useState(dayjs(booking.start_date)) 
  const [initialCheckoutDate, setInitialCheckoutDate] = useState(dayjs(booking.end_date))
  const [guests, setGuests] = useState(booking.number_of_guests)

  const handleClose = () => {
    if (bookingError) {
        return
    }

    setShow(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const bookingObj = {
        id: booking.id,
        number_of_guests: guests,
        start_date: dayjs(initialCheckinDate).format("YYYY-MM-DD"),
        end_date: dayjs(initialCheckoutDate).format("YYYY-MM-DD"),
    }

    dispatch(updateBooking(bookingObj))

  }

  const handleErrors = (errors) => {
    for (let error in errors) {
      return <ErrorMessage error={errors[error]} />
    }
  }

  const handleDelete = () => {
    setShow(false)
    dispatch(deleteBooking(booking.id))
  }

  console.log(initialCheckinDate, initialCheckoutDate)

  return (
      <Modal
      show={show}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Your Booking
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
      <Modal.Body>
              <DateCalendars
              setCheckinDate={setInitialCheckinDate}
              setCheckoutDate={setInitialCheckoutDate}
              listing={listing}
              checkinDate={initialCheckinDate}
              checkoutDate={initialCheckoutDate}
              />
              <GuestsInputBox 
              setGuests={setGuests}
              guests={guests}
              max_guests={listing.max_guests_allowed}
              />
              {bookingError && handleErrors(bookingError)}
      </Modal.Body>
      <Modal.Footer>
        <Button 
            variant="text" 
            startIcon={<SaveIcon />}
            color="primary"
            type="submit"
        >
            Save
        </Button>
        <Button 
          variant="text" 
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
          color="error"
          type="button"
        >
            Delete
        </Button>
      </Modal.Footer>
      </form>
    </Modal>
  )
}

export default EditBookingModal;