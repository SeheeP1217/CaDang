import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function MainDailyConsumptionGraph(props) {
  const chartData = props.data;

  const [caffeineData, setCaffeineData] = useState([
    {
      name: "카페인",
      goal: chartData.caffeGoal,
      consumption: chartData.caffeDaily
    },
  ]);
  const [sugarData, setSugarData] = useState([
    {
      name: "당",
      goal: chartData.sugarGoal,
      consumption: chartData.sugarDaily,
    },
  ]);

  useEffect(() => {
    setCaffeineData([
      {
        name: "카페인",
        goal: chartData.caffeGoal,
        consumption: chartData.caffeDaily
      },
    ]);
    setSugarData([
      {
        name: "당",
        goal: chartData.sugarGoal,
        consumption: chartData.sugarDaily,
      },
    ]);
  }, [chartData]);

  return (
    <div>
      <Grid container style={{ display: "flex", alignItems: "center", marginRight: 20 }}>
        <Grid item xs={12} style={{ textAlign: 'end', marginRight: 35, marginTop: 5 }}>
          <Typography>
            {Number(chartData.caffeDaily)} / {chartData.caffeGoal}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <BarChart
            layout="vertical"
            width={300}
            height={30}
            data={caffeineData}
            margin={{
              top: 0,
              right: 0,
              left: 10,
              bottom: 0,
            }}
            barSize={15}
          >
            <Tooltip />
            <XAxis
              hide
              type="number"
              dataKey="goal"
              allowDataOverflow
              domain={[0, chartData.caffeGoal]}
              orientation="top"
            />
            <YAxis type="category" dataKey="name" />
            <Bar
              dataKey="consumption"
              stackId="a"
              fill="#3A130C"
              background={{ fill: "#eee" }}
            />
            <Bar dataKey="change" stackId="a" fill="#82ca9d" />
          </BarChart>
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'end', marginRight: 35, marginTop: 5 }}>
          <Typography>
            {Number(chartData.sugarDaily)} / {chartData.sugarGoal}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <BarChart
            layout="vertical"
            width={330}
            height={30}
            data={sugarData}
            margin={{
              top: 0,
              right: 30,
              left: 10,
              bottom: 0,
            }}
            barSize={15}

          >
            <Tooltip />
            <XAxis
              hide
              type="number"
              dataKey="goal"
              allowDataOverflow
              domain={[0, chartData.sugarGoal]}
              position="bottom"
            />
            <YAxis type="category" dataKey="name" />
            <Bar
              dataKey="consumption"
              stackId="a"
              fill="#3A130C"
              background={{ fill: "#eee" }}
            />
            <Bar dataKey="change" stackId="a" fill="#82ca9d" />
          </BarChart>
        </Grid>
      </Grid>
    </div>
  );
}

export default MainDailyConsumptionGraph;
