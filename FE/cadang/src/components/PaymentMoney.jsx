import React, {
  useEffect,
  useMemo,
  useState,
  useCallback,
  useRef,
} from "react";
import { Paper, Box, Grid, Card } from "@mui/material";
import { styled } from "@mui/material/styles";
import Typography from "@mui/joy/Typography";
import { typography } from "@mui/system";

export default function PaymentMoney(props) {
  console.log(props.drinkItem);
  console.log(props.orderDetail);
  console.log(props.optionPriceTable);
  return (
    <div>
      <Box
        style={{ marginTop: "3%" }}
        component="span"
        sx={{ display: "block", fontSize: 18, fontWeight: "700" }}
      >
        주문 음료
      </Box>
      <Card sx={{ mt: "3%", p: 1 }}>
        <Grid container>
          <Grid item xs={8}>
            {props.drinkItem.drinkName}
          </Grid>
          <Grid item xs={4}>
            + {props.drinkItem.price}
          </Grid>
          
        </Grid>
        <Grid container>
          {/* ================================================= */}
          <Grid
            item
            xs={8}
            sx={{ display: "flex", justifyContent: "flex-start" }}
          >
            <Typography
              sx={{
                fontWeight: "700",
                display: "inline",
                fontSize: 18,
              }}
            >
              {props.drinkItem.drinkName}
            </Typography>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{ boxShadow: 0, display: "flex", justifyContent: "flex-end" }}
          >
            <Typography
              sx={{
                fontWeight: "700",
                display: "inline",
                fontSize: 18,
              }}
            >
              +{props.drinkItem.price}원
            </Typography>
            <Typography
              sx={{
                fontWeight: "700",
                display: "inline",
                fontSize: 18,
              }}
            >
              {props.orderDetail.shot
                ? `+ ${props.orderDetail.shot} * ${props.optionPriceTable.shot} 원`
                : null}
            </Typography>
          </Grid>
          {/* =============================================== */}
        </Grid>
      </Card>
    </div>
  );
}
