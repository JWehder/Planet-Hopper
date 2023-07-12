import React from "react";
import Modal from 'react-bootstrap/Modal';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import DateCalendars from "../../common/DateCalendars";
import { useDispatch, useSelector } from "react-redux";
import { changeCurrentEndDate, changeCurrentStartDate, changeCurrentNights } from "../state/bookingsSlice";
import { ErrorMessage } from "../../../styles/Styles";
import { Button } from "@mui/material";

function DateRangeModal({ booking, listing, show, setShow }) {
    const dispatch = useDispatch()
    const dateError = useSelector((state) => state.bookings.dateError)

    const setCheckinDate = (newValue) => dispatch(changeCurrentStartDate(newValue))

    const setCheckoutDate = (newValue) => dispatch(changeCurrentEndDate(newValue))
    
    const setNights = (newValue) => dispatch(changeCurrentNights(newValue))

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
            Edit Dates
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendars 
                setCheckinDate={setCheckinDate}
                setCheckoutDate={setCheckoutDate}
                listing={listing}
                setNights={setNights}
                checkinDate={booking.startDate}
                checkoutDate={booking.endDate}
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

export default DateRangeModal;