// 카페인,당 데이터 props 받아서 차트 데이터로 넘겨줘야함
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "1/30",
    caffeine: 400,
  },
  {
    name: "1/31",
    caffeine: 300,
  },
  {
    name: "2/1",
    caffeine: 200,
  },
  {
    name: "2/2",
    caffeine: 278,
  },
  {
    name: "2/3",
    caffeine: 189,
  },
  {
    name: "2/4",
    caffeine: 239,
  },
  {
    name: "2/5",
    caffeine: 349,
  },
];

function WeeklyReportChart() {
  return (
    <Grid container alignItems="center">
      <Grid item xs={1}>
        <Icon sx={{'&:hover': {color: '#F99417'}}}>
          <ArrowBackIosNewOutlinedIcon />
        </Icon>
      </Grid>
      <Grid item xs={10}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{top: 5, right: 30, left: 30, bottom: 5,}}
            barSize={30}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <Tooltip />
            <Bar dataKey="caffeine" fill="#8EA7E9" />
          </BarChart>
        </ResponsiveContainer>
      </Grid>
      <Grid item xs={1}>
        <Icon sx={{'&:hover': {color: '#F99417'}}}>
          <ArrowForwardIosOutlinedIcon />
        </Icon>
      </Grid>
    </Grid>
  );
}

export default WeeklyReportChart;
