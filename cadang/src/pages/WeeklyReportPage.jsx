import * as React from 'react';
import PropTypes from 'prop-types';
import Box from "@mui/material/Box";
import Typography from "@mui/joy/Typography";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Paper } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import WeeklyReportData from '../components/WeeklyReportData';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function WeeklyReportPage() {
	const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper width="85%" margin="auto" sx={{backgroundColor: "#EFF5F5"}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }} mt={2}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="fullWidth">
          <Tab label="주간리포트" {...a11yProps(0)} />
          <Tab label="월간리포트" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <WeeklyReportData/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        월간리포트 컴포넌트로 추가
      </TabPanel>

			
    </Paper>
  );
}
export default WeeklyReportPage;
