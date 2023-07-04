import React from "react";
import Modal from 'react-bootstrap/Modal';
import DateCalendars from "../../common/DateCalendars";
import { useDispatch, useSelector } from "react-redux";
import { changeBookingsGuests, changeBookingsEndDate, changeBookingsStartDate } from "../state/bookingsSlice";
import { ErrorMessage } from "../../../styles/Styles";
import { Button } from "@mui/material";
import GuestsInputBox from "../../listing/components/GuestsInputBox"
import dayjs from "dayjs";

function EditBookingModal({ booking, show, setShow }) {
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

  const initialCheckinDate = dayjs(booking.startDate)
  const initialCheckoutDate = dayjs(booking.endDate)

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
      <Modal.Body>
          <form>
              <DateCalendars
              setCheckinDate={setCheckinDate}
              setCheckoutDate={setCheckoutDate}
              listing={booking.listing}
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
              max_guests={booking.listing.max_guests_allowed}
              />
              {guestsError && 
              <ErrorMessage>
              {guestsError}
              </ErrorMessage>
              }   

          </form>
      </Modal.Body>
      <Modal.Footer>
        <Button color="secondary" variant="text" onClick={handleClose}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditBookingModal;