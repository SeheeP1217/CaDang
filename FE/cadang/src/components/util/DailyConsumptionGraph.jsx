import React, { useMemo, useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ReferenceArea } from "recharts";

function DailyConsumptionGraph(props) {
  const [data, setData] = useState([
    {
      name: "카페인",
      goal: props.consumptionInfo.caffeGoal,
      consumption: props.consumptionInfo.caffeDaily,
      change: 0,
    },
    {
      name: "당",
      goal: props.consumptionInfo.sugarGoal,
      consumption: props.consumptionInfo.sugarDaily,
      change: 0,
    },
  ]);
  const [maxBarNum, setMaxBarNum] = useState(
    Math.max(data[0].goal, data[1].goal)
  );

  useEffect(() => {
    setMaxBarNum(Math.max(data[0].goal, data[1].goal));
  }, [data]);

  useEffect(() => {
    setData([
      {
        name: "카페인",
        goal: props.consumptionInfo.caffeGoal,
        consumption: props.consumptionInfo.caffeDaily,
        change: props.selectDrinkInfo.caffeine,
      },
      {
        name: "당",
        goal: props.consumptionInfo.sugarGoal,
        consumption: props.consumptionInfo.sugarDaily,
        change: props.selectDrinkInfo.sugar,
      },
    ]);
    console.log(data);
  }, [props.consumptionInfo, props.selectDrinkInfo]);

  return (
    <div>
      <BarChart
        layout="vertical"
        width={300}
        height={120}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        barSize={20}
      >
        <Tooltip />
        <XAxis type="number" dataKey="goal" allowDataOverflow domain={['0', props.consumptionInfo.caffeGoal]} position="top" />
        <XAxis type="number" dataKey="goal" allowDataOverflow domain={['0', props.consumptionInfo.sugarGoal]} position="bottom" />
        <YAxis type="category" dataKey="name" />
        <Bar
          dataKey="consumption"
          stackId="a"
          fill="#8884d8"
          background={{ fill: "#eee" }}
        />
        <Bar dataKey="change" stackId="a" fill="#82ca9d" />
        </BarChart>
        {/* <Tooltip />
        <ReferenceArea
          x1={0}
          x2={props.consumptionInfo.caffeGoal}
          y1={0}
          y2={300}
        >
          <XAxis
            type="number"
            dataKey="caffe"
            allowDataOverflow
            domain={["0", props.consumptionInfo.caffeGoal]}
            position="top"
          />
        </ReferenceArea>
        <ReferenceArea
          x1={0}
          x2={props.consumptionInfo.sugarGoal}
          y1={0}
          y2={300}
        >
          <XAxis
            type="number"
            dataKey="sugar"
            allowDataOverflow
            domain={["0", props.consumptionInfo.sugarGoal]}
            position="bottom"
          />
        </ReferenceArea>
        <YAxis type="category" dataKey="name" />
        <Bar
          data={data}
          dataKey="consumption"
          stackId="a"
          fill="#8884d8"
          background={{ fill: "#eee" }}
        />
        <Bar data={props.data} dataKey="change" stackId="a" fill="#82ca9d" /> */}
    </div>
  );
}

export default DailyConsumptionGraph;
