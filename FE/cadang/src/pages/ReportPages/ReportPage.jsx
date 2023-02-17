import * as React from "react"
import PropTypes from "prop-types"
import Box from "@mui/material/Box"
import Typography from "@mui/joy/Typography"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import { Paper } from "@mui/material"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { createTheme, ThemeProvider } from "@mui/material/styles"

import WeeklyReportData from "../../components/WeeklyReportData"
import MontlyReportData from "../../components/MonthlyReportData"
import MyCalendar from "../../components/MyCalendar"
import MonthAmount from "../../components/MonthAmont"
import MonthRank from "../../components/MonthRank"
import MonthlyReportData from "../../components/MonthlyReportData"

function TabPanel(props) {
  const { children, value, index, ...other } = props

  const theme = createTheme({
    palette: {
      primary: {
        main: "#3A130C",
      },
    },
    typography: {
      fontFamily: "netmarble",
    },
  })
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

function ReportPage() {
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div>
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="fullWidth"
        >
          <Tab
            // component={Link}
            // to="/weekly-report"
            label="주간리포트"
            {...a11yProps(0)}
            style={{ fontFamily: "netmarble", color: "black" }}
          />
          <Tab
            // component={Link}
            // to="/month-report"
            label="월간리포트"
            {...a11yProps(1)}
            style={{ fontFamily: "netmarble", color: "black" }}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <WeeklyReportData />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MonthlyReportData />
      </TabPanel>
    </div>
  )
}

const ReportTaps = styled(Tabs)`
  color: #ffba00 !important;
`
export default ReportPage
