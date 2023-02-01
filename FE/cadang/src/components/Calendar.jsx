import React, { useState } from "react"
import TextField from "@mui/material/TextField"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker"
import Badge from "@mui/material/Badge"
import { PickersDay } from "@mui/x-date-pickers/PickersDay"
import LocalCafeIcon from "@mui/icons-material/LocalCafe"
import "./Calendar.css"

const Calendar = () => {
  const [value, setValue] = useState(new Date())
  const [highlightedDays, setHighlightedDays] = useState([1, 2, 15, 31])
  return (
    <div>
      <h2>월간 리포트</h2>
      <h3>카페인 : 150mg 당: 50g</h3>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker
          orientation="portrait"
          openTo="day"
          value={value}
          onChange={(newValue) => {
            setValue(newValue)
          }}
          renderInput={(params) => <TextField {...params} />}
          renderDay={(day, _value, DayComponentProps) => {
            const isSelected =
              !DayComponentProps.outsideCurrentMonth &&
              highlightedDays.indexOf(day.date()) >= 0

            return (
              <Badge
                key={day.toString()}
                overlap="circular"
                badgeContent={
                  isSelected ? (
                    <LocalCafeIcon sx={{ fontSize: 15 }} />
                  ) : undefined
                }
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                  {/* <img src="https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[110563]_20210426095937808.jpg"></img> */}
                <PickersDay {...DayComponentProps}>
                </PickersDay>
              </Badge>
            )
          }}
        />
      </LocalizationProvider>
    </div>
  )
}

export default Calendar
