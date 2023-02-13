import React, {useEffect, useState} from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Label,
  Tooltip,
} from "recharts";

function MainDailyConsumptionGraph(props) {
  const chartData = props.data;
  const [dailyData, setDailyData] = useState([
    {
      name: "카페인",
      goal: chartData.caffeGoal,
      consumption: chartData.caffeDaily,
    },
    {
      name: "당",
      goal: chartData.sugarGoal,
      consumption: chartData.sugarDaily,
    },
  ]);
  useEffect(() => {
    setDailyData([
      {
        name: "카페인",
        goal: chartData.caffeGoal,
        consumption: chartData.caffeDaily,
      },
      {
        name: "당",
        goal: chartData.sugarGoal,
        consumption: chartData.sugarDaily,
      },
    ]);
  }, [chartData]);

  return (
    <div>
      <BarChart
        layout="vertical"
        width={300}
        height={120}
        data={dailyData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        barSize={20}
      >
        <Tooltip />
        <XAxis
          type="number"
          dataKey="goal"
          allowDataOverflow
          domain={["0", dailyData.caffeGoal]}
          position="top"
        />
        <XAxis
          type="number"
          dataKey="goal"
          allowDataOverflow
          domain={["0", dailyData.sugarGoal]}
          position="bottom"
        />
        <YAxis type="category" dataKey="name" />
        <Bar
          dataKey="consumption"
          stackId="a"
          fill="#8884d8"
          background={{ fill: "#eee" }}
        />
        <Bar dataKey="change" stackId="a" fill="#82ca9d" />
      </BarChart>
    </div>
  );
}

export default MainDailyConsumptionGraph;
