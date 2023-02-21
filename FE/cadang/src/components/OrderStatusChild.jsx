import cardGrey from "../assets/card-gray.png";
import card from "../assets/card.png";
import coffeePot from "../assets/coffeepot.png";
import coffeePotGrey from "../assets/coffeepot-gray.png";
import logoDrink from "../assets/logo-drink.png";
import drinkGrey from "../assets/drink-gray.png";
import payCompleteImg from "../assets/payComplete.png";
import making from "../assets/making.png";
import arrowIcon from "../assets/arrowIcon.png";
import finished from "../assets/finished.png";
import { useEffect, useRef, useState, useMemo } from "react";
import { Box, Grid } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import * as React from "react";

export default function OrderStatusChild(props) {
  return (
    <div>
      <Typography
        sx={{
          fontWeight: "700",
          display: "inline",
          fontSize: 16,
        }}
      >
        {props.drink.drinkName} - {props.drink.storeName}
      </Typography>
      <Box>
        <Grid container sx={{ mt: 1 }}>
          <Grid item xs={3} sx={{ display: "flex" }}>
            {props.drink.orderStatus === "REQUEST" ? (
              <CardMedia
                component="img"
                style={{ objectFit: "fill" }}
                sx={{ width: 50, ml: 3 }}
                image={card}
                alt="card"
              />
            ) : (
              <CardMedia
                component="img"
                style={{ objectFit: "fill" }}
                sx={{ width: 50, ml: 3 }}
                image={cardGrey}
                alt="cardGrey"
              />
            )}
          </Grid>
          <Grid item xs={1.5} sx={{ display: "flex" }}>
            <CardMedia
              component="img"
              style={{ objectFit: "fill" }}
              sx={{ height: 30, mt: 3, ml: 1.4 }}
              image={arrowIcon}
              alt="arrowIcon"
            />
          </Grid>
          <Grid item xs={3} sx={{ boxShadow: 0, display: "flex" }}>
            {props.drink.orderStatus === "ACCEPT" ? (
              <CardMedia
                component="img"
                style={{ objectFit: "fill" }}
                sx={{ width: 50, height: 62, ml: 2, mt: 1 }}
                image={coffeePot}
                alt="coffeePot"
              />
            ) : (
              <CardMedia
                component="img"
                style={{ objectFit: "fill" }}
                sx={{ width: 50, height: 60, ml: 2, mt: 1 }}
                image={coffeePotGrey}
                alt="coffeePotGrey"
              />
            )}
          </Grid>
          <Grid item xs={1.5} sx={{ display: "flex" }}>
            <CardMedia
              component="img"
              style={{ objectFit: "fill" }}
              sx={{ height: 30, mt: 3, ml: 1.4 }}
              image={arrowIcon}
              alt="arrowIcon"
            />
          </Grid>
          <Grid item xs={3} sx={{ boxShadow: 0, display: "flex" }}>
            {props.drink.orderStatus === "COMPLETE" ? (
              <CardMedia
                component="img"
                style={{ objectFit: "fill" }}
                sx={{ width: 50, height: 60, ml: 1.5 }}
                image={logoDrink}
                alt="logoDrink"
              />
            ) : (
              <CardMedia
                component="img"
                style={{ objectFit: "fill" }}
                sx={{ width: 50, height: 60, ml: 1.5 }}
                image={drinkGrey}
                alt="drinkGrey"
              />
            )}
          </Grid>
        </Grid>
      </Box>
      <Grid container sx={{ ml: 1.5 }}>
        <Grid item xs={4} sx={{ display: "flex" }}>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "xl",
              level: "h3",
              ml: 1,
            }}
          >
            결제 완료
          </Typography>
        </Grid>
        <Grid item xs={4} sx={{ display: "flex" }}>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "xl",
              level: "h3",
              ml: 1.7,
            }}
          >
            제조 중
          </Typography>
        </Grid>
        <Grid item xs={4} sx={{ display: "flex" }}>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "xl",
              level: "h3",
              ml: 1.7,
            }}
          >
            제조 완료
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
