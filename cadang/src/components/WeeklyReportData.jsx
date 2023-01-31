import * as React from "react";
import PropTypes from "prop-types";
// import SwipeableViews from "react-swipeable-views-react-18-fix";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
// import { useTheme } from '@mui/material/styles';
import styled from "styled-components";
import { Paper, Card, CardHeader, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import sugar from "../assets/sugar.png";
import caffeine from "../assets/caffeine.png";

// 정보 박스
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Divider from "@mui/material/Divider";

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

function WeeklyReportData() {
  const [value, setValue] = React.useState(0);

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
      {/* theme이 react 18에 지원 안해서 사용이 안됨(슬라이드) */}
      {/* <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChange}
      > */}
      <TabPanel value={value} index={0}>
        <WeeklyReportChart />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <WeeklyReportChart />
      </TabPanel>
      {/* </SwipeableViews> */}

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
              <ListItemDecorator>☕</ListItemDecorator> 250mg
              <ListItemDecorator>🧂</ListItemDecorator> 54g
            </Typography>
          </Grid>
        </Grid>

        <Paper variant="outlined" style={{ backgroundColor: "#FFF2F2" }}>
          <Typography varient="body1">
            <div>지난주 대비 어쩌구 저쩌궁</div>
            <div>이러쿵 저러쿵쿵쿵</div>
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
              <ListItemDecorator>☕</ListItemDecorator> 250mg
              <ListItemDecorator>🧂</ListItemDecorator> 54g
            </Typography>
          </Grid>
        </Grid>

        <Paper variant="outlined" style={{ backgroundColor: "#FFF2F2" }}>
          <Typography varient="body1">
            <div>지난주 대비 어쩌구 저쩌궁</div>
            <div>이러쿵 저러쿵쿵쿵</div>
          </Typography>
        </Paper>
        <br />
      </Box>
      <br />
    </Paper>
  );
}

export default WeeklyReportData;
