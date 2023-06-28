import React from "react";
import isSameDay from "date-fns/isSameDay";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { useDispatch } from "react-redux";
import { setDateError } from "../booking/state/bookingsSlice";
import { setDate } from "date-fns";

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


function DateCalendars({ setCheckoutDate, setNights, setCheckinDate, checkinDate, checkoutDate, listing }) {
    const dispatch = useDispatch()

    const shouldDisableDate = (date) => {
        const currentDate = new Date(date)
        return listing.booked_dates.some((booked_date) => {
            if (isSameDay(booked_date, formattedCheckin)) {
                setCheckinDate(dayjs(formattedCheckin).add(1, 'day'))
            }
            return isSameDay(booked_date, currentDate)
        }
        );
    };

    const handleCheckinDateChange = (newValue) => {

        if (shouldDisableDate(newValue)) {
            dispatch(setDateError("Please enter a date that has not been taken."))
            return
        }

        if (checkDatesValidity(newValue, checkoutDate)) {
            dispatch(setDateError("Please enter a check in date that comes before the check out date"))
            return
        } else {
            dispatch(setDateError(null))
        }

        setCheckinDate(dayjs(newValue))
        setNights(calculateNights(newValue, checkoutDate))
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

    // isSameDay(currentDate, checkinDate) && isSameDay(booked_date, checkinDate)
    const formattedCheckin = new Date(checkinDate)

    console.log(!shouldDisableDate("2023-07-05"))

    console.log(shouldDisableDate(dayjs().add(1, "day")))

    const formattedCheckinDate = new Date(dayjs(checkinDate).format("YYYY-MM-DD"))

    console.log(shouldDisableDate(formattedCheckinDate))

    if (shouldDisableDate(formattedCheckinDate)) {
        setCheckinDate(dayjs(checkinDate).add(1, 'day'))
        setCheckoutDate(dayjs(checkoutDate).add(1, 'day'))
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
        shouldDisableDate={shouldDisableDate}
        disablePast
        />
        </div>
    )
}

export default DateCalendars;