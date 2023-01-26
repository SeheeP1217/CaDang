import * as React from "react";
import Box from "@mui/material/Box";
import TodayChart from "../components/TodayChart";
import OrderStatus from "../components/OrderStatus";
import RecommendDrinks from "../components/RecommendDrinks";

export default function MainPage() {
  return (
    <Box>
      <TodayChart />
      <OrderStatus />
      <RecommendDrinks/>
    </Box>
  );
}