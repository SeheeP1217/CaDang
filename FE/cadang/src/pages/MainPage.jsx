import * as React from "react";
import Box from "@mui/material/Box";
import OrderStatus from "../components/OrderStatus";
import DrinkRecommendation from "../components/DrinkRecommendation";
import DailyConsumptionGraph from "../components/util/DailyConsumptionGraph";
import DailyOtherInfo from "../components/DailyOtherInfo";
import { Card } from "@mui/material";
import Typography from "@mui/joy/Typography";

export default function MainPage() {
  

  return (
    <Box>
      <Typography level="h3" fontSize="xl" fontWeight="xl">
        오늘의 현황
      </Typography>
      <Card>
        <DailyConsumptionGraph data={data} />
        <DailyOtherInfo data={dailyData} />
      </Card>
      <OrderStatus />
      <DrinkRecommendation />
    </Box>
  );
}

const data = [
  {
    name: "카페인",
    consumption: 2400,
    change: 0,
  },
  {
    name: "당",
    consumption: 1398,
    change: 0,
  },
];

const dailyData = [
  {
    calorie: 4000,
    money: 2400,
  },
];
