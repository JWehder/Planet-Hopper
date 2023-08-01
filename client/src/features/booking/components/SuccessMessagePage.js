import React, { useEffect } from "react";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { FullPageContainer } from "../../../styles/Styles";
import { useDispatch } from "react-redux";
import { setCurrentBooking } from "../state/bookingsSlice";
import SuccessMessage from "../../common/SuccessMessage";

function SuccessMessagePage({ history }) {
    const dispatch = useDispatch()

    useEffect(() => {
    const timer = setTimeout(() => {
        dispatch(setCurrentBooking(null))
        history.push("/");
    }, 5000);

    return () => clearTimeout(timer); 
}, []); 

return (
    <FullPageContainer>
            <SuccessMessage message= "Booked! Please check your email for your receipt. Returning you to the homepage page now...." />
    </FullPageContainer>

);
}

export default withRouter(SuccessMessagePage);