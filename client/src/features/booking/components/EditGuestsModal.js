import React, {useState} from "react"
import GuestsInputBox from "../../listing/components/GuestsInputBox";

function EditGuestsModal() {

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