import React from "react";
import isSameDay from "date-fns/isSameDay";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";

export const convertToDate = (d1, d2) => {

    return {
        date1: new Date(dayjs(d1).format("YYYY-MM-DD")),
        date2: new Date(dayjs(d2).format("YYYY-MM-DD"))
    }
}

export const checkDatesValidity = (d1, d2) => {
    const datesObj = convertToDate(d1, d2)
    return Boolean(datesObj.date2 && (isSameDay(datesObj.date1, datesObj.date2) || datesObj.date1 > datesObj.date2))
}


function DateCalendars({ setCheckoutDate, setNights, setCheckinDate, checkinDate, checkoutDate, listing, setDateError }) {

    const handleCheckinDateChange = (newValue) => {

        if (checkDatesValidity(newValue, checkoutDate)) {
            console.log("worked!")
            setDateError("Please enter a check in date that comes before the check out date")
        } else {
            setDateError(null)
        }

        setCheckinDate(dayjs(newValue))
        setNights(calculateNights(newValue, checkoutDate))
    }

    const handleCheckoutDateChange = (newValue) => {

        if (checkDatesValidity(checkinDate, newValue)){
            setDateError("Please enter a check in date that comes before the check out date")
        }
        else {
            setDateError(null)
        }

        setCheckoutDate(dayjs(newValue))
        setNights(calculateNights(checkinDate, newValue))
    }

    const calculateNights = (checkin, checkout) => {

        const dateObj = convertToDate(checkin, checkout)

        const differenceInTime = dateObj.date2.getTime() - dateObj.date1.getTime()

        return differenceInTime / (1000 * 3600 * 24)
    }

    const shouldDisableDate = (date) => {
        const currentDate = new Date(date)
        return listing.booked_dates.some((booked_date) =>
          isSameDay(booked_date, currentDate)
        );
    };

    return (
        <div style={{
            display: "flex",
            marginTop: "5px"
        }}>
        <DatePicker
        label="Check in"
        value={checkinDate}
        onChange={handleCheckinDateChange}
        showDaysOutsideCurrentMonth
        shouldDisableDate={shouldDisableDate}
        disablePast
        />
        <DatePicker
        label="Check out"
        value={checkoutDate}
        minDate={dayjs(checkinDate).add(1, 'day')}
        onChange={handleCheckoutDateChange}
        showDaysOutsideCurrentMonth
        shouldDisableDate={shouldDisableDate}
        disablePast
        />
        </div>
    )
}

export default DateCalendars;