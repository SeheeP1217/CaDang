import * as React from "react"
import Box from "@mui/material/Box"
import MyCalendar from "../../components/MyCalendar"
import MonthAmount from "../../components/MonthAmont"
import MonthRank from "../../components/MonthRank"

export default function MonthReportPage() {
  return (
    <div>
      <Box>
        <MyCalendar />
      </Box>
      <Box>
        <MonthAmount />
      </Box>
      <Box>
        <MonthRank />
      </Box>
    </div>
  )
}
