import React, { useRef } from "react";
import { StandaloneSearchBox } from "@react-google-maps/api";
import { TextField } from "@mui/material";
import { LoadScript } from "@react-google-maps/api";

const CustomTextField = ({ setSearchAddress, searchAddress }) => {

  function handleChange(e) {
    setSearchAddress({
      ...searchAddress,
      address: e.target.value
    })
  }

  return (
    <TextField
    id="outlined-search"
    type="search"
    variant="standard"
    size="small"
    onChange={handleChange}
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
  )
}

const libraries = ["places"];

const Autocomplete = ({ setSearchAddress, searchAddress }) => {
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_API_KEY;

  const searchBoxRef = useRef(null);

  if (!googleMapsApiKey) {
    return <CustomTextField setSearchAddress={setSearchAddress} searchAddress={searchAddress} />
  }

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
      <>
        <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={libraries}>
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
        </LoadScript>
      </>
  );
};

export default React.memo(Autocomplete)