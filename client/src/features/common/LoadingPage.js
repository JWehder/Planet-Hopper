import React from "react";
import { Spinner } from "react-bootstrap";
import { FullPageContainer } from "../../styles/Styles";

function LoadingPage() {

    return (
        <FullPageContainer>
              <Spinner 
                animation="border" 
                role="status" 
                />
        </FullPageContainer>
    )
}

export default LoadingPage;