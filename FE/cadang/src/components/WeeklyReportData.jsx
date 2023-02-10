import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
// import SwipeableViews from "react-swipeable-views-react-18-fix";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
// import { useTheme } from '@mui/material/styles';
import { Paper, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import sugar from "../assets/sugar.png";
import caffeine from "../assets/caffeine.png";

import { getWeeklyData, getGraphData } from '../api/report'

// 정보 박스
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import WeeklyReportChart from "./WeeklyReportChart";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  
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
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

function WeeklyReportData(props) {
  const today = dayjs(new Date()).format("YYYY-MM-DD");
  const [value, setValue] = React.useState(0);
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
  });
  // const [graphData, setgraphData] = useState({
  //   weekDataList: [
  //     {
  //       date: "",
  //       caffeine: 0,
  //       sugar: 0,
  //     },
  //     {
  //       date: "",
  //       caffeine: 0,
  //       sugar: 0,
  //     },
  //     {
  //       date: "",
  //       caffeine: 0,
  //       sugar: 0,
  //     },
  //     {
  //       date: "",
  //       caffeine: 0,
  //       sugar: 0,
  //     },
  //     {
  //       date: "",
  //       caffeine: 0,
  //       sugar: 0,
  //     },
  //     {
  //       date: "",
  //       caffeine: 0,
  //       sugar: 0,
  //     },
  //     {
  //       date: "",
  //       caffeine: 0,
  //       sugar: 0,
  //     },
  //   ],
  //   hasPrevious: true,
  //   hasNext: false,
  // });
  const graphData = weeklyData.thisWeekGraphDto
  const [graphOnlyData, setGraphOnlyData] = useState(graphData)
  const [changeDate, setChangeDate] = useState(today);
  console.log(today);

  const dateChangeHandler = (num) => {
    setChangeDate(dayjs(changeDate).add(num, 'day').format('YYYY-MM-DD'))
    console.log(changeDate)
  }

  useMemo(() => {
    const getThisWeekData = async () => {
      await getWeeklyData(
        changeDate,
        (res) => {
          return res.data;
        },
        (err) => console.log(err)
      ).then((data) => setWeeklyData(data));
    };
    getThisWeekData();
    // console.log(weeklyData.thisWeekGraphDto)
  }, []);

  useEffect(() => {
    const getGraphOnlyData = async () => {
      await getGraphData(
        changeDate,
        (res) => {
          return res.data;
        },
        (err) => console.log(err)
      ).then((data) => setGraphOnlyData(data));
    };
    getGraphOnlyData();
    console.log(graphOnlyData)
  }, [changeDate]);

  // console.log(weeklyData)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="full width tabs example"
        variant="fullWidth"
      >
        {/* 이미지 크기 제한 어케 하징......... */}
        <Tab
          icon={<img width="15%" src={caffeine} alt="caffeine" />}
          iconPosition="start"
          label="카페인"
          {...a11yProps(0)}
        />
        <Tab
          icon={<img width="15%" src={sugar} alt="sugar" />}
          iconPosition="start"
          label="당"
          {...a11yProps(1)}
        />
      </Tabs>

      <TabPanel value={value} index={0}>
        <WeeklyReportChart data={graphOnlyData} option="caffeine" dateChangeHandler={dateChangeHandler}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <WeeklyReportChart data={graphOnlyData} option="sugar" dateChangeHandler={dateChangeHandler}/>
      </TabPanel>

      <Box width="85%" margin="auto">
        <Grid
          container
          spacing={1}
          style={{
            background: "#E5E0FF",
            borderRadius: "10px",
            alignSelf: "center",
            paddingTop: "0px",
            height: "5%",
            marginBottom: "5px",
          }}
        >
          <Grid item xs={6}>
            <Typography>오늘 섭취량</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography style={{ textAlign: "center" }}>
              <ListItemDecorator>☕</ListItemDecorator> {weeklyData.todayCaffe}mg
              <ListItemDecorator>🧂</ListItemDecorator> {weeklyData.todaySugar}g
            </Typography>
          </Grid>
        </Grid>

        <Paper variant="outlined" style={{ backgroundColor: "#FFF2F2" }}>
          <Typography varient="body1">
            <div>지난주 대비 카페인 섭취량이</div>
            <div> {weeklyData.dayCaffeGap} 늘었습니다</div>
            <div>지난주 대비 당 섭취량이</div>
            <div> {weeklyData.daySugarGap} 늘었습니다</div>
          </Typography>
        </Paper>
        <br />
        <Grid
          container
          spacing={1}
          style={{
            background: "#E5E0FF",
            borderRadius: "10px",
            alignSelf: "center",
            paddingTop: "0px",
            height: "5%",
            marginBottom: "5px",
          }}
        >
          <Grid item xs={6}>
            <Typography>이번주 섭취량</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography style={{ textAlign: "center" }}>
              <ListItemDecorator>☕</ListItemDecorator> {weeklyData.thisWeekCaffe}mg
              <ListItemDecorator>🧂</ListItemDecorator> {weeklyData.thisWeekSugar}g
            </Typography>
          </Grid>
        </Grid>

        <Paper variant="outlined" style={{ backgroundColor: "#FFF2F2" }}>
          <Typography varient="body1">
          <div>지난주 대비 카페인 섭취량이</div>
            <div> {weeklyData.weekCaffeGap} 늘었습니다</div>
            <div>지난주 대비 당 섭취량이</div>
            <div> {weeklyData.weekSugarGap} 늘었습니다</div>
          </Typography>
        </Paper>
        <br />
      </Box>
      <br />
    </Paper>
  );
}

export default WeeklyReportData;
