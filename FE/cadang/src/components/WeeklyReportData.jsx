import React, { useState, useMemo, useEffect } from "react"
import PropTypes from "prop-types"
import dayjs from "dayjs"
// import SwipeableViews from "react-swipeable-views-react-18-fix";
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
// import { useTheme } from '@mui/material/styles';
import { Paper, Grid, Card } from "@mui/material"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import sugar from "../assets/sugar.png"
import coffeebean from "../assets/coffeebean.png"
import styled from "styled-components"

import { getWeeklyData, getGraphData } from "../api/report"

// 정보 박스
import WeeklyReportChart from "./WeeklyReportChart"

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
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
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  }
}

function WeeklyReportData(props) {
  const today = dayjs(new Date()).format("YYYY-MM-DD")
  const [value, setValue] = React.useState(0)
  const [weeklyData, setWeeklyData] = useState({
    thisWeekGraphDto: {
      weekDataList: [
        {
          date: "",
          caffeine: 0,
          sugar: 0,
        },
        {
          date: "",
          caffeine: 0,
          sugar: 0,
        },
        {
          date: "",
          caffeine: 0,
          sugar: 0,
        },
        {
          date: "",
          caffeine: 0,
          sugar: 0,
        },
        {
          date: "",
          caffeine: 0,
          sugar: 0,
        },
        {
          date: "",
          caffeine: 0,
          sugar: 0,
        },
        {
          date: "",
          caffeine: 0,
          sugar: 0,
        },
      ],
      hasPrevious: true,
      hasNext: false,
    },
    todayCaffe: 0,
    todaySugar: 0,
    dayCaffeGap: 0,
    daySugarGap: 0,
    thisWeekCaffe: 0,
    thisWeekSugar: 0,
    weekCaffeGap: 0,
    weekSugarGap: 0,
  })
  const graphData = weeklyData.thisWeekGraphDto
  const [graphOnlyData, setGraphOnlyData] = useState(graphData)
  const [changeDate, setChangeDate] = useState(today)
  console.log(today)

  const dateChangeHandler = (num) => {
    setChangeDate(dayjs(changeDate).add(num, "day").format("YYYY-MM-DD"))
    console.log(changeDate)
  }

  useMemo(() => {
    const getThisWeekData = async () => {
      await getWeeklyData(
        changeDate,
        (res) => {
          return res.data
        },
        (err) => console.log(err)
      ).then((data) => setWeeklyData(data))
    }
    getThisWeekData()
    // console.log(weeklyData.thisWeekGraphDto)
  }, [])

  useEffect(() => {
    const getGraphOnlyData = async () => {
      await getGraphData(
        changeDate,
        (res) => {
          return res.data
        },
        (err) => console.log(err)
      ).then((data) => setGraphOnlyData(data))
    }
    getGraphOnlyData()
    console.log(graphOnlyData)
  }, [changeDate])

  // console.log(weeklyData)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Paper style={{ borderRadius: "10px" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="full width tabs example"
        variant="fullWidth"
        sx={{ "& .MuiTabs-indicator": { backgroundColor: "#FFAb00" } }}
      >
        <Tab
          style={{ fontFamily: "netmarble", color: "black" }}
          icon={<img width="15%" src={coffeebean} alt="coffeebean" />}
          iconPosition="start"
          label="카페인"
          {...a11yProps(0)}
        />
        <Tab
          style={{ fontFamily: "netmarble", color: "black" }}
          icon={<img width="15%" src={sugar} alt="sugar" />}
          iconPosition="start"
          label="당"
          {...a11yProps(1)}
        />
      </Tabs>

      <TabPanel value={value} index={0}>
        <WeeklyReportChart
          data={graphOnlyData}
          option="caffeine"
          dateChangeHandler={dateChangeHandler}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <WeeklyReportChart
          data={graphOnlyData}
          option="sugar"
          dateChangeHandler={dateChangeHandler}
        />
      </TabPanel>
      <Box width="85%" margin="auto">
        <TitleCard>
          <Grid container spacing={1}>
            <Grid item xs={5}>
              <Typography>오늘 섭취량</Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography
                style={{
                  textAlign: "right",
                  fontFamily: "netmarble",
                  fontSize: "14px",
                  marginRight: "5px",
                }}
              >
                {<img width="12%" src={coffeebean} alt="coffeebean" />}{" "}
                {weeklyData.todayCaffe}
                mg{"   "}
                {<img width="12%" src={sugar} alt="sugar" />}{" "}
                {weeklyData.todaySugar}g
              </Typography>
            </Grid>
          </Grid>
        </TitleCard>

        <Box
          variant="outlined"
          style={{
            backgroundColor: "#FFF2F2",
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          <Typography varient="body1">
            <div>지난주 같은 요일보다 카페인 섭취량이</div>

            <div style={{ color: weeklyData.dayCaffeGap > 0 ? "red" : "blue" }}>
              {weeklyData.dayCaffeGap > 0
                ? weeklyData.dayCaffeGap + " mg만큼 늘었습니다"
                : -1 * weeklyData.dayCaffeGap + " mg만큼 줄었습니다"}
            </div>
            <div>지난주 같은 요일보다 당 섭취량이</div>
            <div style={{ color: weeklyData.daySugarGap > 0 ? "red" : "blue" }}>
              {weeklyData.daySugarGap > 0
                ? weeklyData.daySugarGap + " g만큼 늘었습니다"
                : -1 * weeklyData.daySugarGap + " g만큼 줄었습니다"}
            </div>
          </Typography>
        </Box>
        <br />
        <TitleCard>
          <Grid container spacing={1}>
            <Grid item xs={5}>
              <Typography style={{ fontFamily: "netmarble" }}>
                이번주 섭취량
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography
                style={{
                  textAlign: "right",
                  fontFamily: "netmarble",
                  fontSize: "14px",
                  marginRight: "5px",
                }}
              >
                {<img width="12%" src={coffeebean} alt="coffeebean" />}{" "}
                {weeklyData.thisWeekCaffe}mg{" "}
                {<img width="12%" src={sugar} alt="sugar" />}{" "}
                {weeklyData.thisWeekSugar}g
              </Typography>
            </Grid>
          </Grid>
        </TitleCard>

        <Paper
          variant="outlined"
          style={{
            backgroundColor: "#FFF2F2",
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          <Typography varient="body1">
            <div>지난주 대비 카페인 섭취량이</div>
            <div
              style={{ color: weeklyData.weekCaffeGap > 0 ? "red" : "blue" }}
            >
              {weeklyData.weekCaffeGap > 0
                ? weeklyData.weekCaffeGap + " mg만큼 늘었습니다"
                : -1 * weeklyData.weekCaffeGap + " mg만큼 줄었습니다"}
            </div>
            <div>지난주 대비 당 섭취량이</div>
            <div
              style={{ color: weeklyData.weekSugarGap > 0 ? "red" : "blue" }}
            >
              {weeklyData.weekSugarGap > 0
                ? weeklyData.weekSugarGap + " g만큼 늘었습니다"
                : -1 * weeklyData.weekSugarGap + " g만큼 줄었습니다"}
            </div>
          </Typography>
        </Paper>
        <br />
      </Box>
      <br />
    </Paper>
  )
}

const TitleCard = styled(Card)`
  background-color: #ffab00 !important;
  border-radius: 5px !important;
  align-self: center !important;
  padding: 2px !important;
  padding-left: 5px !important;
  height: 5% !important;
  margin-bottom: 5px !important;
  color: white !important;
`

export default WeeklyReportData
