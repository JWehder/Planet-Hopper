import React, { useState, useRef } from "react";
import { StandaloneSearchBox, LoadScript } from "@react-google-maps/api";
import { keys } from "../../../config";
import { TextField } from "@mui/material";

const Autocomplete = ({ setSearchAddress, searchAddress }) => {
  const searchBoxRef = useRef(null);

  const handlePlaceChanged = () => {
    const [place] = searchBoxRef.current.getPlaces();
    if (place) {
      setSearchAddress({
        ...searchAddress,
        address: place.formatted_address,
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng(),
      });
    }
  };

  function handleAddressChange(e) {
    setSearchAddress({
        ...searchAddress,
        address: e.target.value
    })
  }

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
            onChange={handleAddressChange}
            value={searchAddress.address}
            style={{
                width: "250px"
            }}
            InputProps={{
                style: {
                    fontSize: "11px"
                }, 
            }}
            />
      </StandaloneSearchBox>
    </>
    // {/* </LoadScript> */}
  );
};

export default React.memo(Autocomplete)