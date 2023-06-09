import React, { useState, useMemo } from "react";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import TextField from '@mui/material/TextField';
import Popover from '@mui/material/Popover';


function SearchForm() {
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
      } = usePlacesAutocomplete();


    const ref = useOnclickOutside(() => {
        // When user clicks outside of the component, we can dismiss
        // the searched suggestions by calling this method
        clearSuggestions();
    });

    return(
        <div ref={ref}>
            <TextField
            id="standard-search"
            label="Search field"
            type="search"
            variant="standard"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
      </Popover>
        </div>
    )
}

export default SearchForm;