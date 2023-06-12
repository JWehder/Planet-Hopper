import React, { useRef } from "react";
import { StandaloneSearchBox, LoadScript } from "@react-google-maps/api";
import { keys } from "../../../config";
import Map from "./Map";
import { TextField } from "@mui/material";
import AddLocationIcon from '@mui/icons-material/AddLocation';


const Autocomplete = () => {
    const inputRef = useRef();

    const handlePlaceChanged = () => { 
        const [ place ] = inputRef.current.getPlaces();
        if(place) { 
            console.log(place.formatted_address)
            console.log(place.geometry.location.lat())
            console.log(place.geometry.location.lng())
        } 
    }

    return (
        <LoadScript googleMapsApiKey={keys["GOOGLE_API_KEY"]} libraries={["places"]}>
                <StandaloneSearchBox
                    onLoad={ref => inputRef.current = ref}
                    onPlacesChanged={handlePlaceChanged}
                >
                    <TextField
                        ref={inputRef}
                        id="outlined-search"
                        label="Enter a place..."
                        type="search"
                    />
                </StandaloneSearchBox>
        </LoadScript>
    );
};



export default Autocomplete;