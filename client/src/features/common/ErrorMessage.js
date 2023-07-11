import React from "react";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import styled from "styled-components";

function ErrorMessage({ error }) {

    return (
        <ErrorContainer>
            <ErrorOutlineIcon style={{ color: 'rgb(220, 10, 70)', marginRight: '1px' }}  />    <ErrorPara>{error}</ErrorPara>
        </ErrorContainer>
    )
}

const ErrorPara = styled.p`
    color: rgb(220, 10, 70);
    font-size: 13px;
    margin-bottom: 4px;
`
 
const ErrorContainer = styled.div`
    display: flex; 
    justify-content: center; 
    align-items: center;
`

export default ErrorMessage;