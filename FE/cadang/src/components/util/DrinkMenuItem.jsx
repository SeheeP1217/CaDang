import * as React from "react";
import { Paper, Grid, Divider, Box } from "@mui/material";
import Typography from "@mui/joy/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
export default function DrinkMenuItem(props) {
  console.log(props.data)
  return (
    <Card sx={{ display: "flex" }}>
      <CardMedia
        component="img"
        sx={{ width: 110 }}
        image={props.data.drink.img}
        alt="Live from space album cover"
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography variant="" component="div" sx={{ fontWeight: "700" }}>
            {props.data.franchiseName.split('')}
          </Typography>
          <Typography component="div" sx={{ fontWeight: "700" }}>
            {props.data.drink.drinkName}
          </Typography>
        </CardContent>
        <Typography
          style={{ marginLeft: "10%", marginBottom: "7%" }}
          component="div"
          sx={{ fontWeight: "500" }}
        >
          {props.data.drink.caffeine}mg / {props.data.drink.sugar}g
        </Typography>
      </Box>
    </Card>
  );
}
