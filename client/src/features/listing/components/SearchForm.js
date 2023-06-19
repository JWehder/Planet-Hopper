import React, { useState, useRef } from "react";
import { keys } from "../../../config"
import { LoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import TextField from '@mui/material/TextField';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import Box from '@mui/material/Box';
import Grow from "@mui/material/Grow";
import Spinner from 'react-bootstrap/Spinner'

function SearchForm() {
    const inputRef = useRef();

    const [selected, setSelected] = useState(null);

    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
      } = usePlacesAutocomplete();


    const clickOutside = useOnclickOutside(() => {
        // When user clicks outside of the component, we can dismiss
        // the searched suggestions by calling this method
        clearSuggestions();
    });

    const handleSelect = async (address) => {
        const selectedAddress = String(address)
        setValue(selectedAddress, false);
        clearSuggestions();
    
        const results = await getGeocode({ address });
        const { lat, lng } = await getLatLng(results[0]);
        setSelected({ lat, lng });
    };

    // if (!isLoaded) return <div>    
    // <Spinner animation="border" role="status">
    //     <span className="visually-hidden">Loading...</span>
    // </Spinner>
    // </div>

    const handleChange = (e) => {
        const inputValue = e.target.value;
        setValue(inputValue);
      };

    const handlePlaceChanged = () => { 
    const [ place ] = inputRef.current.getPlaces();
    if(place) { 
        console.log(place.formatted_address)
        console.log(place.geometry.location.lat())
        console.log(place.geometry.location.lng())
    } 
    }


    return(
        // <LoadScript googleMapsApiKey={keys["GOOGLE_API_KEY"]} libraries={["places"]}>
        <Box ref={clickOutside} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <form 
            onLoad={ref => inputRef.current = ref} 
            onPlacesChanged={handlePlaceChanged}
            >
                <TextField
                id="standard-search"
                label="Search field"
                type="search"
                disabled={!ready}
                variant="standard"
                />
            </form>
            <Popover
                id='simple-popover'
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
            >
            <List>
                {status ==="OK" && 
                data.map(({ place_id, description }) => {
                return (
                    <>
                    <ListItem onSelect={handleSelect} key={place_id} disablePadding>
                        <ListItemButton>
                        <ListItemIcon>
                            <AddLocationIcon />
                        </ListItemIcon>
                        <ListItemText primary={description} />
                        </ListItemButton>
                    </ListItem>   
                    <Divider/>
                    </>
                )           
                })}
            </List>
            </Popover>
        </Box>
        // </LoadScript>
    )
}

export default SearchForm;