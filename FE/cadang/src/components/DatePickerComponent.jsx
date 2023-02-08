import * as React from "react";
import dayjs from "dayjs";
import { useLocation } from "react-router-dom"
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

function DatePickerComponent() {
  const location = useLocation()
  const recordDate = location.state.review.resDate
  // const rawDate = Date(location.state.review.regDate)
  // const options = {month: '2-digit', day: '2-digit'}
  // const defaultDate = rawDate.tolocalDateString('en-US', options)
  // console.log(defaultDate)
  const [value, setValue] = React.useState(dayjs("2022-04-07"))
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileDatePicker
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params}/>}
        />
      </LocalizationProvider>
    </div>
  );
}

export default DatePickerComponent;
