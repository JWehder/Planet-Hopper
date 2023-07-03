import React from "react";
import Modal from 'react-bootstrap/Modal';
import DateCalendars from "../../common/DateCalendars";
import { useDispatch, useSelector } from "react-redux";
import { changeEndDate, changeStartDate, changeNights } from "../state/bookingsSlice";
import { ErrorMessage } from "../../../styles/Styles";
import { Button } from "@mui/material";
import GuestsInputBox from "../../listing/components/GuestsInputBox"

function EditBookingModal({ booking, show, setShow }) {
    const dispatch = useDispatch()
    const dateError = useSelector((state) => state.bookings.dateError)

    const setCheckinDate = (newValue) => dispatch(changeStartDate(newValue))

    const setCheckoutDate = (newValue) => dispatch(changeEndDate(newValue))
    
    const setNights = (newValue) => dispatch(changeNights(newValue))

    const setGuests = (newValue) => dispatch(changeBooking({
      value: newValue,
      attribute: "guests",
      id: booking.id
    }))

    const handleClose = () => {
      if (dateError) {
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
            Edit Your Booking
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form>
                <DateCalendars
                setCheckinDate={setCheckinDate}
                setCheckoutDate={setCheckoutDate}
                listing={booking.listing}
                setNights={setNights}
                checkinDate={booking.startDate}
                checkoutDate={booking.endDate}
                />
                {dateError && 
                <ErrorMessage>
                {dateError}
                </ErrorMessage>
                }   
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

            </form>
        </Modal.Body>
        <Modal.Footer>
          <Button color="secondary" variant="text" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
}

export default EditBookingModal;