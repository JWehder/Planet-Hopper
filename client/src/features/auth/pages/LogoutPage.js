import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { CenterDiv } from "../../../styles/Styles";
import { logout } from "../state/authSlice";

function LogoutPage(props) {
    const dispatch = useDispatch()

    const user = useSelector((state) => state.auth.user)
    const logoutError = useSelector((state) => state.auth.logoutError)

    if (logoutError) {
        return <CenterDiv>
            I'm sorry. Something seems to have gone wrong. Please try again.
        </CenterDiv>
    }

    setTimeout(() => {
        props.history.push("/");
        dispatch(logout())
    }, 7000);

    return (
        <CenterDiv style={{minHeight: "90vh"}}>
            <div>
            <CenterDiv style={{textAlign: 'center'}}>
                Seeya {user.first_name}! 👋 <br /> We hope we see you again soon!
            </CenterDiv>
            </div>
        </CenterDiv>
    )
}

export default withRouter(LogoutPage);