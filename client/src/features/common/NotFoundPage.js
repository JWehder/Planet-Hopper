import React from "react";
import { FullPageContainer } from "../../styles/Styles";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

function NotFoundPage({ history }) {
    setTimeout(() => {
        history.push("/")
    }, 7000)

    return (
        <FullPageContainer>
            <div>
                Sorry, we could not find what you are looking for...
            </div>
        </FullPageContainer>

    )
}

export default withRouter(NotFoundPage);