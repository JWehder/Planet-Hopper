import React, { useState } from "react";
import SearchForm from "../components/SearchForm";
import Map from "../components/Map";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { LoadScript } from "@react-google-maps/api";
import { keys } from "../../../config";
import Autocomplete from "../components/Autocomplete";

function MapModal() {

    const [show, setShow] = useState(true)

    const onClickShow = () => setShow(!show)

    return (
        <div className="places-container">
        <LoadScript googleMapsApiKey={keys["GOOGLE_API_KEY"]} libraries={["places"]}>
        {/* <Button onClick={onClickShow}>click me</Button> */}
        {/* <Modal show={show} fullscreen={'xxl-down'} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
            <Modal.Title>Your Listing</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            </Modal.Body>
        </Modal> */}
        {/* <SearchForm /> */}
        <Autocomplete />
        <Map /> 
        </LoadScript>
        </div>
    )
}

export default MapModal;