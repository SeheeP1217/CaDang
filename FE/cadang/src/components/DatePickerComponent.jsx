import * as React from "react"
import dayjs from "dayjs"
import { useLocation } from "react-router-dom"
import TextField from "@mui/material/TextField"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker"

function DatePickerComponent(props) {
  const location = useLocation()
  const recordDate = location.state.review.regDate
  const [value, setValue] = React.useState(
    dayjs(recordDate).format("YYYY-MM-DD")
  )

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileDatePicker
          inputFormat="YYYY / MM / DD"
          value={value}
          onChange={(newValue) => {
            setValue(dayjs(newValue).format("YYYY-MM-DD"))
            props.getRecordDate(dayjs(newValue).format("YYYY / MM / DD"))
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </div>
  )
}

export default DatePickerComponent
