import React, { useEffect } from "react";
import { FullPageContainer } from "../../styles/Styles";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

function NotFoundPage({ history }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            history.push("/");
        }, 7000);

        return () => clearTimeout(timer);
    }, [history]); 

    return (
        <FullPageContainer>
            <div>
                Sorry, we could not find what you are looking for...
            </div>
        </FullPageContainer>

    )
}

export default withRouter(NotFoundPage);