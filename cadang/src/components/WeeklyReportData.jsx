import * as React from "react";
import PropTypes from "prop-types";
// import SwipeableViews from "react-swipeable-views-react-18-fix";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
// import { useTheme } from '@mui/material/styles';
import { Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import sugar from "../assets/sugar.png";
import caffeine from "../assets/caffeine.png";

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
        <Tab
          icon={<img width="15%" src={caffeine} alt="sugar" />}
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
        <TabPanel value={value} index={0} >
          <WeeklyReportChart/>
        </TabPanel>
        <TabPanel value={value} index={1}>
        <WeeklyReportChart/>
        </TabPanel>
      {/* </SwipeableViews> */}
    </Paper>
  );
}

export default WeeklyReportData;
