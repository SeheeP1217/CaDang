import * as React from "react";
import { Box } from "@mui/material";
import Typography from "@mui/joy/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";


export default function PaymentCustomDrinkMenuItem(props) {
  console.log(props.data)
  return (
    <Card sx={{ display: "flex", marginBottom: 1 }}>
      <CardMedia
        component="img"
        sx={{ width: 110 }}
        image={props.data.img}
        alt="Live from space album cover"
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography variant="" component="div" sx={{ fontWeight: "700" }}>
            {props.data.storeName}
          </Typography>
          <Typography component="div" sx={{ fontWeight: "700" }}>
            {props.data.drinkName}
          </Typography>
        </CardContent>
        <Typography
          style={{ marginLeft: "10%", marginBottom: "7%" }}
          component="div"
          sx={{ fontWeight: "500" }}
        >
          {props.data.caffeine}mg / {props.data.sugar}g
        </Typography>
      </Box>
    </Card>
  );
}
