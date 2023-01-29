import * as React from "react"
import Box from "@mui/material/Box"
import Calendar from "../components/Calendar"
import MonthAmount from "../components/MonthAmont"
import MonthRank from "../components/MonthRank"

export default function MonthReportPage() {
  return (
    <div>
      <Box>
        <Calendar />
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
