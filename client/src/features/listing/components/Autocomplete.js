import React, { useState, useRef } from "react";
import { StandaloneSearchBox, LoadScript } from "@react-google-maps/api";
import { keys } from "../../../config";
import { TextField } from "@mui/material";

const Autocomplete = ({ setLatLng, latlng }) => {
  const searchBoxRef = useRef(null);

  const handlePlaceChanged = () => {
    const [place] = searchBoxRef.current.getPlaces();
    if (place) {
        console.log(place.formatted_address)
        console.log(place.geometry.location.lat())
        console.log(place.geometry.location.lng())
    //   setLatLng({
    //     ...latlng,
    //     latitude: place.geometry.location.lat(),
    //     longitude: place.geometry.location.lng(),
    //   });
    }
  };

  return (
    // <LoadScript googleMapsApiKey={keys["GOOGLE_API_KEY"]} libraries={["places"]}>
    <>
      <StandaloneSearchBox
        onLoad={(ref) => (searchBoxRef.current = ref)}
        onPlacesChanged={handlePlaceChanged}
      >
            <TextField
            inputRef={searchBoxRef}
            id="outlined-search"
            type="search"
            variant="standard"
            size="small"
            InputProps={{
                style: {
                    fontSize: "10px"
                }, 
            }}
            />
      </StandaloneSearchBox>
    </>
    // {/* </LoadScript> */}
  );
};

export default Autocomplete;