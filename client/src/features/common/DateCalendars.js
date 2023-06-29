import React from "react";
import isSameDay from "date-fns/isSameDay";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { useDispatch } from "react-redux";
import { setDateError } from "../booking/state/bookingsSlice";

export const convertToDate = (d1, d2) => {

    return {
        date1: new Date(dayjs(d1).format("YYYY-MM-DD")),
        date2: new Date(dayjs(d2).format("YYYY-MM-DD"))
    }
}

export const checkDatesValidity = (d1, d2) => {
    if (d1 === null || d2 === null) {
        return false
    }

    const datesObj = convertToDate(d1, d2)
    return datesObj.date2 && (isSameDay(datesObj.date1, datesObj.date2) || datesObj.date1 > datesObj.date2)
}

function DateCalendars({ setCheckoutDate, setNights, setCheckinDate, checkinDate, checkoutDate, listing }) {
    const dispatch = useDispatch()

    const shouldDisableDate = (date) => {
        const currentDate = new Date(date)
        return listing.booked_dates.some((booked_date) => isSameDay(booked_date, currentDate));
    }

    const disableEndDates = (date) => {
        const currentDate = dayjs(date).format("YYYY-MM-DD")
        const findDate = listing.bookings.find((booking) => booking.start_date === currentDate)
        if (findDate) {
            return false
        }

        return shouldDisableDate(date)
    }

    const handleCheckinDateChange = (newValue) => {
        const checkout = dayjs(newValue).add(1, 'day')

        if (shouldDisableDate(newValue)) {
            dispatch(setDateError("Please enter a date that has not been taken."))
            return
        }

        if (newValue === null && checkout === null) {
            dispatch(setDateError(null))
        } else if (checkDatesValidity(newValue, checkout)) {
            dispatch(setDateError("Please enter a check in date that comes before the check out date"))
            return
        }
            
        dispatch(setDateError(null))

        setCheckinDate(dayjs(newValue))
        setCheckoutDate(checkout)
        setNights(calculateNights(newValue, checkout))
    }

    // const findNextAvailableDate = () => {
    //     const date = dayjs()
    //     while (!shouldDisableDate(date)) {

    //     }

    // }

    const handleCheckoutDateChange = (newValue) => {

        if (checkDatesValidity(checkinDate, newValue)){
            dispatch(setDateError("Please enter a check in date that comes before the check out date"))
            return
        }
        else {
            dispatch(setDateError(null))
        }

        setCheckoutDate(dayjs(newValue))
        setNights(calculateNights(checkinDate, newValue))
    }

    const calculateNights = (checkin, checkout) => {

        const dateObj = convertToDate(checkin, checkout)

        const differenceInTime = dateObj.date2.getTime() - dateObj.date1.getTime()

        return differenceInTime / (1000 * 3600 * 24)
    }

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
        onChange={handleCheckoutDateChange}
        showDaysOutsideCurrentMonth
        shouldDisableDate={disableEndDates}
        disablePast
        />
        </div>
    )
}

export default DateCalendars;