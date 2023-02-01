import React, { useState } from "react"
// import DateFnsUtils from "@date-io/date-fns"
import Utils from '@date-io/date-fns'
import { DatePicker } from "@mui/x-date-pickers"
import { PickersToolbar } from "@mui/x-date-pickers/internals"
import { Paper, Grid, createTheme } from "@mui/material"
import { ThemeProvider } from "styled-components"
import { styled } from "@mui/material/styles";
import CloudIcon from "@mui/icons-material/Cloud"
import WbSunnyIcon from "@mui/icons-material/WbSunny"
import AcUnitIcon from "@mui/icons-material/AcUnit"

const materialTheme = createTheme({
  overrides: {
    PickersToolbar: {
      toolbar: {
        backgroundColor: "#8bc34a",
      },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        backgroundColor: "White",
        color: "#1b5e20"
      }
    }
  },
})

export const styles = styled(() => ({
  notInThisMonthDayPaper: {
    width: "35px",
    height: "35px",
    backgroundColor: "#eeeeee",
    margin: "3px",
    boxShadow: "none",
    borderRadius: 0,
    padding: "1px",
  },
  normalDayPaper: {
    width: "35px",
    height: "35px",
    backgroundColor: "#e8f5e9",
    margin: "3px",
    boxShadow: "none",
    borderRadius: 0,
    padding: "1px",
    cursor: "pointer",
  },
  selectedDayPaper: {
    width: "31px",
    height: "31px",
    backgroundColor: "#f9fbe7",
    margin: "3px",
    boxShadow: "none",
    borderRadius: 0,
    borderStyle: "solid",
    borderWidth: "2px",
    borderColor: "lime",
    padding: "1px",
    cursor: "pointer",
  },
  todayPaper: {
    width: "35px",
    height: "35px",
    backgroundColor: "lightGreen",
    margin: "3px",
    boxShadow: "none",
    borderRadius: 0,
    padding: "1px",
    cursor: "pointer",
    color: " white",
  },
}))

export default function Calendar2() {
  const [selectedDate, handleDateChange] = useState(new Date())
  const classes = styles()
  const today = new Date()
  const sunnyDays = [1, 6, 10, 24, 15]
  const cloudyDays = [30, 4, 13, 21]
  const snowyDays = [25, 3, 12, 11, 27]

  function getDayElement(day, selectedDate, isInCurrentMonth, dayComponent) {
    const isSunny = sunnyDays.includes(day.getDate())
    const isCloudy = cloudyDays.includes(day.getDate())
    const isSnow = snowyDays.includes(day.getDate())
    const isSelected = day.getDate() === selectedDate.getDate()
    const isToday =
      day.getDate() === today.getDate() && day.getMonth() === today.getMonth()
    console.log(day.getTime())
    let dateTile
    if (isInCurrentMonth) {
      if (isSunny) {
        dateTile = (
          <Paper
            className={
              isSelected
                ? classes.selectedDayPaper
                : isToday
                ? classes.todayPaper
                : classes.normalDayPaper
            }
          >
            <Grid item>
              <WbSunnyIcon style={{ color: "orange" }} />
            </Grid>
            <Grid item>{day.getDate()}</Grid>
          </Paper>
        )
      } else if (isCloudy) {
        dateTile = (
          <Paper
            className={
              isSelected
                ? classes.selectedDayPaper
                : isToday
                ? classes.todayPaper
                : classes.normalDayPaper
            }
          >
            <Grid item>
              <CloudIcon style={{ color: "gray" }} />
            </Grid>
            <Grid item> {day.getDate()}</Grid>
          </Paper>
        )
      } else if (isSnow) {
        dateTile = (
          <Paper
            className={
              isSelected
                ? classes.selectedDayPaper
                : isToday
                ? classes.todayPaper
                : classes.normalDayPaper
            }
          >
            <Grid item>
              <AcUnitIcon style={{ color: "#3d5afe" }} />
            </Grid>
            <Grid item> {day.getDate()}</Grid>
          </Paper>
        )
      } else {
        dateTile = (
          <Paper
            className={
              isSelected
                ? classes.selectedDayPaper
                : isToday
                ? classes.todayPaper
                : classes.normalDayPaper
            }
          >
            <Grid item>
              <br />
            </Grid>
            <Grid item> {day.getDate()}</Grid>
          </Paper>
        )
      }
    } else {
      dateTile = (
        <Paper className={classes.notInThisMonthDayPaper}>
          <Grid item>
            <br />
          </Grid>
          <Grid item style={{ color: "lightGrey" }}>
            {day.getDate()}
          </Grid>
        </Paper>
      )
    }
    return dateTile
  }

  return (
    <div>
      <PickersToolbar utils={Utils}>
        <ThemeProvider theme={materialTheme}>
          <DatePicker
            value={selectedDate}
            onChange={handleDateChange}
            variant="static"
            renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) =>
              getDayElement(day, selectedDate, isInCurrentMonth, dayComponent)
            }
          />
        </ThemeProvider>
      </PickersToolbar>
    </div>
  )
}
