import React from "react";
import { CenterDiv } from "../../styles/Styles";
import styled from "styled-components";
import { Spinner } from "react-bootstrap";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

function LoadingPage({ history }) {

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
    min-height: 90vh;
    background-color: #F8F5FF;
`

export default withRouter(LoadingPage);