// 카페인,당 데이터 props 받아서 차트 데이터로 넘겨줘야함
import { Box } from "@mui/joy";
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
    name: "월",
    caffeine: 400,
  },
  {
    name: "화",
    caffeine: 300,
  },
  {
    name: "수",
    caffeine: 200,
  },
  {
    name: "목",
    caffeine: 278,
  },
  {
    name: "금",
    caffeine: 189,
  },
  {
    name: "토",
    caffeine: 239,
  },
  {
    name: "일",
    caffeine: 349,
  },
];

function WeeklyReportChart() {
  return (
      <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 30,
          bottom: 5,
        }}
        barSize={30}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <Tooltip />
        <Bar dataKey="caffeine" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default WeeklyReportChart;
