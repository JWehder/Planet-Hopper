import React from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function SuccessMessage({ message }) {
    return (
        <>
        <div style={{color: 'green', textAlign: 'center'}}> 
            <CheckCircleIcon style={{color: "green"}} fontSize="large"/> 
            {message}
        </div>
        </>
    )
}

export default SuccessMessage;