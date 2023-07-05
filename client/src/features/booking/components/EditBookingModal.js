import React from "react";
import Modal from 'react-bootstrap/Modal';
import DateCalendars from "../../common/DateCalendars";
import { useDispatch, useSelector } from "react-redux";
import { changeBookingsGuests, changeBookingsEndDate, changeBookingsStartDate } from "../state/bookingsSlice";
import { deleteBooking } from "../../listing/state/listingsSlice"
import { ErrorMessage } from "../../../styles/Styles";
import { Button } from "@mui/material";
import GuestsInputBox from "../../listing/components/GuestsInputBox"
import dayjs from "dayjs";
import DeleteIcon from '@mui/icons-material/Delete';

function EditBookingModal({ booking, show, setShow, listing }) {
  const dispatch = useDispatch()
  const dateError = useSelector((state) => state.bookings.dateError)
  const guestsError = useSelector((state) => state.bookings.guestsError)

  const setCheckinDate = (newValue) => dispatch(changeBookingsStartDate({
    value: dayjs(newValue).format("YYYY-MM-DD"),
    id: booking.id
  }))

  const setCheckoutDate = (newValue) => dispatch(changeBookingsEndDate({
    value: dayjs(newValue).format("YYYY-MM-DD"),
    id: booking.id
  }))

  const setGuests = (newValue) => dispatch(changeBookingsGuests({
    value: newValue,
    id: booking.id
  }))

  const handleClose = () => {
    if (dateError) {
        return
    }

    setShow(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()


  }

  const handleDelete = () => {
    setShow(false)
    dispatch(deleteBooking(booking.id))
  }

  const initialCheckinDate = dayjs(booking.start_date)
  const initialCheckoutDate = dayjs(booking.end_date)

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
              setCheckinDate={setCheckinDate}
              setCheckoutDate={setCheckoutDate}
              listing={listing}
              checkinDate={initialCheckinDate}
              checkoutDate={initialCheckoutDate}
              />
              {dateError && 
              <ErrorMessage>
              {dateError}
              </ErrorMessage>
              }   
              <GuestsInputBox 
              setGuests={setGuests}
              guests={booking.number_of_guests}
              max_guests={listing.max_guests_allowed}
              />
              {guestsError && 
              <ErrorMessage>
              {guestsError}
              </ErrorMessage>
              }   
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Button 
          variant="text" 
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
          color="error"
          size="medium"
          type="button"
          >
            Delete
          </Button>
          </div>
      </Modal.Body>
      <Modal.Footer>
        <Button color="secondary" variant="text" type="submit">Save Changes</Button>
      </Modal.Footer>
      </form>
    </Modal>
  )
}

export default EditBookingModal;