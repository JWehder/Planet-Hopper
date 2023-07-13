import { useSelector } from "react-redux";
import React from "react";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

function LogoutPage(props) {
    const user = useSelector((state) => state.auth.user)

        setTimeout(() => {
            props.history.push("/");
        }, 7000);

        return (
            <>
            <div>
                Seeya {user.first_name}! 👋 
            </div>
            <div>
                We hope we see you again soon!
            </div>
            </>
        )
}

export default withRouter(LogoutPage);