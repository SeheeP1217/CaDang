import React, { useEffect, useState } from "react";
import { Paper, Box, Grid } from "@mui/material";
import MenuListItem from '../components/util/MenuListItem';

export default function PaymentPage() {

  const menuData = [
    { pk: 1, name: "카페라떼", caffeine: 250, sugar: 30, cal: 350, price: 2500 },
  ];

  return (
    <Paper width="85%" sx={{ backgroundColor: "#EFF5F5", marginTop: 2 }}>
      <MenuListItem data={menuData}/>
    </Paper>
  );
};