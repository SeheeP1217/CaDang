import * as React from "react";
import { Paper, Grid, Divider, Box } from "@mui/material";
import Typography from "@mui/joy/Typography";
import drink from "../../assets/drink.png";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
export default function DrinkMenuItem() {


    return (
      <Card sx={{ display: "flex" }} >
      <CardMedia
        component="img"
        sx={{ width: 110 }}
        image="https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[110563]_20210426095937808.jpg"
        alt="Live from space album cover"
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography variant="subtitle1" component="div">
            스타벅스
          </Typography>
          <Typography component="div" variant="">
            아이스 아메리카노
          </Typography>
        </CardContent>
        <Typography style={{marginLeft:"10%", marginBottom:"5%"}} component="div">225mg / 15g</Typography>
      </Box>
    </Card>
    );
};