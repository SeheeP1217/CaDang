import { Directions } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import React, { useMemo, useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import coffeebean from "../../assets/coffeebean.png";
import sugar from "../../assets/sugar.png";
import "./DailyConsumptionGraph.css";

function DailyConsumptionGraph(props) {
  const [allCaffeine, setAllCaffeine] = useState(
    Number(props.consumptionInfo.caffeDaily) +
      Number(props.selectDrinkInfo.caffeine)
  );
  const [allSugar, setAllSugar] = useState(
    Number(props.consumptionInfo.sugarDaily) +
      Number(props.selectDrinkInfo.sugar)
  );

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

  const [caffeineSuccess, setCaffeinSuccess] = useState(true);
  const [sugarSuccess, setSugarSuccess] = useState(true);

  const caffeineData = useMemo(
    () => [
      {
        name: "카페인",
        goal: props.consumptionInfo.caffeGoal,
        consumption: props.consumptionInfo.caffeDaily,
        change: props.selectDrinkInfo.caffeine,
      },
    ],
    [
      props.consumptionInfo.caffeGoal,
      props.consumptionInfo.caffeDaily,
      props.selectDrinkInfo.caffeine,
    ]
  );

  const sugarData = useMemo(
    () => [
      {
        name: "당",
        goal: props.consumptionInfo.sugarGoal,
        consumption: props.consumptionInfo.sugarDaily,
        change: props.selectDrinkInfo.sugar,
      },
    ],
    [
      props.consumptionInfo.sugarGoal,
      props.consumptionInfo.sugarDaily,
      props.selectDrinkInfo.sugar,
    ]
  );

  useEffect(() => {
    if (allCaffeine > Number(props.consumptionInfo.caffeGoal)) {
      setCaffeinSuccess(false);
    } else setCaffeinSuccess(true);

    if (allSugar > Number(props.consumptionInfo.sugarGoal)) {
      setSugarSuccess(false);
    } else setSugarSuccess(true);
  }, [allCaffeine, allSugar]);
  return (
    <Grid
      container
      style={{ display: "flex", alignItems: "center", marginRight: 20 }}
    >
      <Grid
        item
        xs={12}
        style={{ textAlign: "end", marginRight: 8, marginTop: 5 }}
      >
        <Typography style={{ fontFamily: "netmarble" }}>
          {Number(props.consumptionInfo.caffeDaily)}
          {props.selectDrinkInfo.caffeine &&
          props.selectDrinkInfo.caffeine > 0 ? (
            <span style={{ color: "red" }}>
              {" "}
              +{Number(props.selectDrinkInfo.caffeine)}
            </span>
          ) : props.selectDrinkInfo.caffeine ? (
            <span style={{ color: "blue" }}>
              {Number(props.selectDrinkInfo.caffeine)}
            </span>
          ) : (
            ""
          )}
          g / {props.consumptionInfo.caffeGoal}g
        </Typography>
      </Grid>
      <Grid item xs={0.2}></Grid>
      <Grid item xs={0.5}>
        <img src={coffeebean} alt="coffeebean" width="30px" />
      </Grid>
      <Grid item xs={11.3}>
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
          <YAxis
            axisLine={false}
            tickLine={{ stroke: "transparent" }}
            type="category"
            dataKey="name"
          />
          <Bar
            dataKey="consumption"
            stackId="a"
            fill={caffeineSuccess === true ? "#3A130C" : "#ff0000"}
            background={{ fill: "#eee", radius: 20 }}
            radius={20}
          />
          <Bar
            dataKey="change"
            stackId="a"
            fill={caffeineSuccess === true ? "#ffba00" : "#ff0000"}
            radius={20}
          />
        </BarChart>
      </Grid>
      <Grid
        item
        xs={12}
        style={{ textAlign: "end", marginRight: 8, marginTop: 5 }}
      >
        <Typography style={{ fontFamily: "netmarble" }}>
          {Number(props.consumptionInfo.sugarDaily)}
          {props.selectDrinkInfo.sugar && props.selectDrinkInfo.sugar > 0 ? (
            <span style={{ color: "red" }}>
              {" "}
              +{Number(props.selectDrinkInfo.sugar)}
            </span>
          ) : props.selectDrinkInfo.sugar ? (
            <span style={{ color: "blue" }}>
              {Number(props.selectDrinkInfo.sugar)}
            </span>
          ) : (
            ""
          )}
          g / {props.consumptionInfo.sugarGoal}g
        </Typography>
      </Grid>
      <Grid item xs={0.2}></Grid>
      <Grid item xs={0.5}>
        <img src={sugar} alt="sugar" width="30px" />
      </Grid>
      <Grid item xs={11.3}>
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
          <YAxis
            axisLine={false}
            tickLine={{ stroke: "transparent" }}
            type="category"
            dataKey="name"
          />
          <Bar
            dataKey="consumption"
            stackId="a"
            fill={sugarSuccess === true ? "#3A130C" : "#ff0000"}
            radius={20}
          />
          <Bar
            dataKey="change"
            stackId="a"
            fill={sugarSuccess === true ? "#ffba00" : "#ff0000"}
            radius={20}
          />
        </BarChart>
      </Grid>
    </Grid>
  );
}

export default DailyConsumptionGraph;
