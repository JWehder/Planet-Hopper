import React from "react";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import styled from "styled-components";
import { CenterDiv } from "../../styles/Styles";

function ErrorMessage({ error }) {

    return (
        <ErrorContainer>
            <CenterDiv><ErrorOutlineIcon fontSize="small" style={{color: "rgb(220, 10, 70)", marginRight: "2px"}}/>
           <ErrorPara>{error}</ErrorPara>
           </CenterDiv>
        </ErrorContainer>
    )
}

const ErrorPara = styled.p`
    color: rgb(220, 10, 70);
    font-size: 12px;
    margin-bottom: 1px;
`
 
const ErrorContainer = styled.div`
    display: flex; 
    justify-content: center; 
    align-items: center;
`

export default ErrorMessage;