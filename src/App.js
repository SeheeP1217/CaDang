import * as React from "react";
import "./App.css";
import Box from "@mui/material/Box";
import BottomNavigation from "./BottomNav";
import TopBar from "./TopBar";

export default function App() {

  return (
    <Box>
      <TopBar/>
      <BottomNavigation/>
    </Box>
  );
}