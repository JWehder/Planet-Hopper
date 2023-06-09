import React, { useState, useMemo } from "react";
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

function SearchForm() {
    const [selected, setSelected] = useState(null);

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

    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();
    
        const results = await getGeocode({ address });
        const { lat, lng } = await getLatLng(results[0]);
        setSelected({ lat, lng });
    };

    return(
        <Box ref={ref} onSelect={handleSelect} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <TextField
            id="standard-search"
            label="Search field"
            type="search"
            variant="standard"
            disabled={!ready}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            />
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
                    <Grow>
                    <ListItem key={place_id} disablePadding>
                        <ListItemButton>
                        <ListItemIcon>
                            <AddLocationIcon />
                        </ListItemIcon>
                        <ListItemText primary={description} />
                        </ListItemButton>
                    </ListItem>   
                    <Divider/>
                    </Grow>
                    </>
                )           
                })}
            </List>
            </Popover>
        </Box>
    )
}

export default SearchForm;