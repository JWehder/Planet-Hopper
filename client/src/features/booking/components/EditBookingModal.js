import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import DateCalendars from "../../common/DateCalendars";
import { useDispatch } from "react-redux";
import { updateBooking, deleteBooking } from "../../listing/state/listingsSlice"
import { Button } from "@mui/material";
import GuestsInputBox from "../../listing/components/GuestsInputBox"
import dayjs from "dayjs";
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { ErrorMessage } from "../../../styles/Styles";
import { CenterDiv } from "../../../styles/Styles";


function EditBookingModal({ booking, show, setShow, listing }) {
  const dispatch = useDispatch()
  const [bookingError, setBookingError] = useState()

  const [initialCheckinDate, setInitialCheckinDate] = useState(dayjs(booking.start_date)) 
  const [initialCheckoutDate, setInitialCheckoutDate] = useState(dayjs(booking.end_date))
  const [guests, setGuests] = useState(booking.number_of_guests)

  const [guestsError, setGuestsError] = useState(null)
  const [dateError, setDateError] = useState(null)

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
    .unwrap()
    .then(() => setShow(false))
    .catch((err) => setBookingError(err))
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
              <div>
                <CenterDiv>
                  {dateError && 
                    <ErrorMessage>
                    {dateError}
                    </ErrorMessage>
                  }   
                </CenterDiv>
                <CenterDiv>
                <DateCalendars
                setCheckinDate={setInitialCheckinDate}
                setCheckoutDate={setInitialCheckoutDate}
                listing={listing}
                checkinDate={initialCheckinDate}
                checkoutDate={initialCheckoutDate}
                setDateError={setDateError}
                />
                </CenterDiv>
                <div style={{marginTop: "10px"}}>
                <CenterDiv>
                    {guestsError && 
                    <ErrorMessage>
                    {guestsError}
                    </ErrorMessage>
                    }  
                </CenterDiv>
              </div>
              <CenterDiv>
                <GuestsInputBox 
                setGuests={setGuests}
                guests={guests}
                max_guests={listing.max_guests_allowed}
                setGuestsError={setGuestsError}
                />
              </CenterDiv>
              </div>
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