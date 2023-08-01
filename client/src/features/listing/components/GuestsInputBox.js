import React, { useRef, useState, useEffect } from "react"
import { SearchInputBox } from "./SearchBarButtonGroup";
import Popover from '@mui/material/Popover';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

function GuestsInputBox({ setGuestsError, setGuests, guests, max_guests }) {
    const searchInputBoxRef = useRef(null)

    const [anchorGuests, setAnchorGuests] = useState(null)
    const openGuests = Boolean(anchorGuests);
    const idGuests = openGuests ? 'simple-popover' : undefined;

    const handleDecreaseGuests = () => {
        if (guests === 1) {
            setGuests(1)
        } else {
            setGuests(guests - 1)
        }
    }

    const handleIncreaseGuests = () => {
        if ((guests + 1) <= max_guests) {
            setGuests(guests + 1)
        } else {
            setGuestsError(`You may not have more than ${max_guests} guests`)
        }
    }

    const handleCloseGuests = () => {
        setAnchorGuests(null)
    }

    const searchInputBoxRect = searchInputBoxRef.current?.getBoundingClientRect();
    const anchorPosition = searchInputBoxRect ? { top: searchInputBoxRect.bottom, left: searchInputBoxRect.right - 35 } : undefined;

    useEffect(() => {
        if (guests <= max_guests) {
          setGuestsError(null)
        }
      }, [guests, max_guests])

    return (
        <span style={{marginRight: "10px"}}>
            <SearchInputBox 
            onClick={() => setAnchorGuests(true)}
            ref={searchInputBoxRef}
            >
            Guests
            </SearchInputBox>
            <Popover
            id={idGuests}
            open={openGuests}
            anchorEl={anchorGuests}
            onClose={handleCloseGuests}
            anchorReference="anchorPosition"
            anchorPosition={anchorPosition}
            anchorOrigin={{
                vertical: 'center',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            >
                <div style={{
                    height: "35px", 
                    width: "130px", 
                    borderRadius: "70%", 
                    padding: "2px",
                    textAlign: "center"
                    }}>
                    <span
                        onClick={handleDecreaseGuests} 
                        style={{
                            marginRight: "10px",
                            cursor: "pointer",
                            transition: "box-shadow 0.3s ease-in-out"
                        }}
                    >
                        <RemoveCircleOutlineIcon />
                    </span>
                    <span 
                    style={{
                        fontSize: "10.5px"
                    }}
                    >
                        Guests: {guests}
                    </span>

                    
                    <span
                        onClick={handleIncreaseGuests} 
                        style={{
                            marginLeft: "10px",
                            cursor: "pointer",
                            transition: "box-shadow 0.3s ease-in-out"
                        }}
                    >
                        <ControlPointIcon />
                        
                    </span>                                
                </div>
            </Popover>
        </span>
    )
}

export default GuestsInputBox;