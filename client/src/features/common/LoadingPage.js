import React from "react";
import { CenterDiv } from "../../styles/Styles";
import styled from "styled-components";
import { Spinner } from "react-bootstrap";

function LoadingPage() {

    return (
        <LoadingContainer>
              <Spinner 
                animation="border" 
                role="status" 
                />
        </LoadingContainer>
    )
}

const LoadingContainer = styled(CenterDiv)`
    min-height: 100vh;
    background-color: #F8F5FF;
`

export default LoadingPage;