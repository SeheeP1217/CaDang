import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Label,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function DailyConsumptionGraph(props) {
  const chartData = props.data

  return (
    <div>
<BarChart
      layout="vertical"
      width={300}
      height={120}
      data={chartData}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5
      }}
      barSize={20}
    >
      <XAxis hide type="number" allowDataOverflow />
      <YAxis type="category" dataKey="name"/>
      <Tooltip />
      {/* <Legend /> */}
      <Bar
        dataKey="consumption"
        stackId="a"
        fill="#8884d8"
        background={{ fill: "#eee" }}
      >
        {chartData.map((entry, index) => (
          <Label key={`label-${index}`} value={entry.name} position="top" />
        ))}
      </Bar>
      <Bar dataKey="change" stackId="a" fill="#82ca9d" />
    </BarChart>
    </div>
  );
}

// const data = [
//   {
//     name: "카페인",
//     consumption: 2400,
//     change: 4000,
//   },
//   {
//     name: "당",
//     consumption: 1398,
//     change: 3000,
//   },
// ];

export default DailyConsumptionGraph;
