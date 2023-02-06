import * as React from "react"
import { Container } from "@mui/material"
import MyCalendar from "./MyCalendar"
import MonthAmount from "./MonthAmont"
import MonthRank from "./MonthRank"

export default function MonthlyReportData() {
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <MyCalendar />
        <MonthAmount />
        <MonthRank />
      </Container>
    </div>
  )
}
