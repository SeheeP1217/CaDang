// 카페인,당 데이터 props 받아서 차트 데이터로 넘겨줘야함
import Grid from "@mui/material/Grid"
import Icon from "@mui/material/Icon"
import dayjs from "dayjs"
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined"
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined"
import React from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

function WeeklyReportChart(props) {
  const graphInfo = props.data.weekDataList
  console.log(props.option)
  return (
    <Grid container alignItems="center">
      <Grid item xs={1}>
        <Icon sx={{ "&:hover": { color: "#F99417" } }}>
          <ArrowBackIosNewOutlinedIcon
            onMouseDown={() => props.dateChangeHandler(-7)}
          />
        </Icon>
      </Grid>
      <Grid item xs={10}>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            data={graphInfo}
            margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
            barSize={30}
          >
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis
              dataKey="date"
              tickFormatter={(date) => dayjs(date).format("MM/DD")}
              tick={{ fontSize: 12 }}
            />
            <YAxis width={5} tick={{ fontSize: 12 }} />

            <Tooltip />
            <Bar
              dataKey={props.option}
              fill="#FFBA00"
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Grid>
      <Grid item xs={1}>
        <Icon
          sx={{ "&:hover": { color: "#F99417" } }}
          onMouseDown={() => props.dateChangeHandler(7)}
        >
          <ArrowForwardIosOutlinedIcon />
        </Icon>
      </Grid>
    </Grid>
  )
}

export default WeeklyReportChart
