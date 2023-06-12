import * as React from 'react';
import * as dayjs from 'dayjs';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function DateRangePickerValue({ startDate, endDate, setStartDate, setEndDate
}) {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="start date"
            value={startDate}
            onChange={(newValue) => setStartDate(dayjs(newValue))}
            disablePast
          />
          <HorizontalRuleIcon style={{margin: '5px', fontSize: 'small'}} />
          <DatePicker
            label="end date"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            disablePast
            minDate={startDate.add(1, 'day')}
          />
    </LocalizationProvider>
  );
}

export default DateRangePickerValue;