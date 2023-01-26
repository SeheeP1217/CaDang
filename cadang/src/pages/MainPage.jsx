import * as React from "react";
import Box from "@mui/material/Box";
import TodayChart from "../components/TodayChart";
import OrderStatus from "../components/OrderStatus";

export default function MainPage() {
  return (
    <Box>
      <TodayChart />
      <OrderStatus />
    </Box>
  );
}