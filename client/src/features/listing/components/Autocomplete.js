import React from "react";
import { StandaloneSearchBox, LoadScript } from "@react-google-maps/api";
import { keys } from "../../../config";
import { TextField } from "@mui/material";


const Autocomplete = ({ handlePlaceChanged, inputRef }) => {

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