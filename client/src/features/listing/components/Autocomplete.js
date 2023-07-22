import React, { useRef } from "react";
import { StandaloneSearchBox } from "@react-google-maps/api";
import { TextField } from "@mui/material";
import { keys } from "../../../config";
import { useLoadScript } from "@react-google-maps/api";
import { Spinner } from "react-bootstrap";

const Autocomplete = ({ setSearchAddress, searchAddress }) => {
  const { isLoaded, loadError } = useLoadScript({
    libraries: "places",
    googleMapsApiKey: keys["GOOGLE_API_KEY"]
})

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

  function handleChange(e) {
    setSearchAddress({
      ...searchAddress,
      address: e.target.value
    })
  }

  if (!isLoaded) return <div>    
  <Spinner fontSize="small" animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
  </Spinner>
</div>

  return (
      <div>
      { !loadError ?
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
      :
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
      }
    </div>
  );
};

export default React.memo(Autocomplete)