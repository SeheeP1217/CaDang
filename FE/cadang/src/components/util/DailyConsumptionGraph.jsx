import { Directions } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import React, { useMemo, useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function DailyConsumptionGraph(props) {
  const [caffeineData, setCaffeineData] = useState([
    {
      name: "카페인",
      goal: props.consumptionInfo.caffeGoal,
      consumption: props.consumptionInfo.caffeDaily,
      change: 0,
    },
  ]);
  const [sugarData, setSugarData] = useState([
    {
      name: "당",
      goal: props.consumptionInfo.sugarGoal,
      consumption: props.consumptionInfo.sugarDaily,
      change: 0,
    },
  ]);

  const [allCaffeine, setAllCaffeine] = useState(
    Number(props.consumptionInfo.caffeDaily) +
      Number(props.selectDrinkInfo.caffeine)
  );
  const [allSugar, setAllSugar] = useState(
    Number(props.consumptionInfo.sugarDaily) +
      Number(props.selectDrinkInfo.sugar)
  );

  useEffect(() => {
    setCaffeineData([
      {
        name: "카페인",
        goal: props.consumptionInfo.caffeGoal,
        consumption: props.consumptionInfo.caffeDaily,
        change: props.selectDrinkInfo.caffeine,
      },
    ]);
    setSugarData([
      {
        name: "당",
        goal: props.consumptionInfo.sugarGoal,
        consumption: props.consumptionInfo.sugarDaily,
        change: props.selectDrinkInfo.sugar,
      },
    ]);
  }, [props.consumptionInfo, props.selectDrinkInfo]);

  useEffect(() => {
    setAllCaffeine(
      Number(props.consumptionInfo.caffeDaily) +
        Number(props.selectDrinkInfo.caffeine)
    );
    setAllSugar(
      Number(props.consumptionInfo.sugarDaily) +
        Number(props.selectDrinkInfo.sugar)
    );
  }, [props.consumptionInfo, props.selectDrinkInfo]);

  console.log(props.consumptionInfo.caffeGoal);
  console.log(props.consumptionInfo.sugarGoal);
  console.log(props.selectDrinkInfo.sugar)
  return (
    <Grid container style={{display: "flex", alignItems: "center", marginRight: 20}}>
      <Grid item xs={12} style={{ textAlign: 'end', marginRight: 35, marginTop: 5}}>
        <Typography>
          {Number(props.consumptionInfo.caffeDaily)}
          {props.selectDrinkInfo.caffeine
            ? ` + ${Number(props.selectDrinkInfo.caffeine)}`
            : ""}
          / {props.consumptionInfo.caffeGoal}
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
            domain={[0, props.consumptionInfo.caffeGoal]}
            orientation="top"
            />
          <YAxis type="category" dataKey="name" />
          <Bar
            dataKey="consumption"
            stackId="a"
            fill="#3A130C"
            background={{ fill: "#eee" }}
            />
          <Bar dataKey="change" stackId="a" fill="#ffba00" />
        </BarChart>
      </Grid>
      <Grid item xs={12} style={{ textAlign: 'end', marginRight: 35, marginTop: 5}}>
        <Typography>
          {Number(props.consumptionInfo.sugarDaily)}
          {props.selectDrinkInfo.sugar
            ? ` + ${Number(props.selectDrinkInfo.sugar)}`
            : ""}
          / {props.consumptionInfo.sugarGoal}
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
            domain={[0, props.consumptionInfo.sugarGoal]}
            position="bottom"
            />
          <YAxis type="category" dataKey="name" />
          <Bar
            dataKey="consumption"
            stackId="a"
            fill="#3A130C"
            background={{ fill: "#eee" }}
            />
          <Bar dataKey="change" stackId="a" fill="#ffba00" />
        </BarChart>
      </Grid>
    </Grid>
  );
}

export default DailyConsumptionGraph;
