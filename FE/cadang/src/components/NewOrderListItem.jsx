import React, { useEffect, useRef, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { Paper, Box, Grid, Card } from "@mui/material";
import Typography from "@mui/joy/Typography";
import Button from "@mui/material-next/Button";
import Divider from "@mui/material/Divider";
import { newOrderResponse } from "../api/cafeCeo";

export default function NewOrderListItem(props) {
  const [drinkItem, setDrinkItem] = useState();
  const [userId, setUserId] = useState("");

  const onClickAccept = () => {
    console.log("수락 버튼 클릭!!!!!!!!!!!!!!!!!!!!!!!");

    if (window.confirm(`${props.id}번째 주문을 수락하시겠습니까?`)) {
      props.deleteChild(props.id);
    }

    const putOrder = async () => {
      await newOrderResponse(
        drinkItem.orderId,
        drinkItem.customerId,
        "ACCEPT",
        (res) => {
          console.log(res.data);
          return res.data;
        },
        (err) => console.log(err)
      ).then((data) => setUserId(data));
    };

    putOrder();
  };

  const onClickCancel = () => {
    console.log("거절 버튼 클릭!!!!!!!!!!!!!!!!!!!!");

    if (window.confirm(`${props.id}번째 주문을 거절하시겠습니까?`)) {
      props.deleteChild(props.id);
    }

    const putOrder = async () => {
      await newOrderResponse(
        drinkItem.orderId,
        drinkItem.customerId,
        "CANCEL",
        (res) => {
          console.log(res.data);
          return res.data;
        },
        (err) => console.log(err)
      ).then((data) => setUserId(data));
    };

    putOrder();
  };

  useMemo(() => {
    setDrinkItem(props.drink);
  }, []);

  useEffect(() => {
    console.log("서버로부터 받아온 userId : " + userId);
  }, [userId]);

  useEffect(() => {
    setDrinkItem(props.drink);
  }, [props.drink]);

  // console.log("NewOrderListItem !!!!!!!!!!! " + props.drink);

  return (
    <div>
      <Grid sx={{ mt: 2 }} container>
        <Grid item xs={8} sx={{ display: "flex", justifyContent: "flex-start" }}>
          {drinkItem !== undefined && (
            <Typography
              sx={{
                fontWeight: "700",
                display: "inline",
                fontSize: 18,
              }}
            >
              {drinkItem.drinkName}
            </Typography>
          )}
        </Grid>
        <Grid item xs={4} sx={{ boxShadow: 0, display: "flex", justifyContent: "flex-end" }}>
          {drinkItem !== undefined && (
            <Typography
              sx={{
                fontWeight: "700",
                display: "inline",
                fontSize: 16,
                mt: "1%",
              }}
            >
              {drinkItem.memberId}
            </Typography>
          )}
        </Grid>

        <Grid item xs={12} sx={{ boxShadow: 0, display: "flex", justifyContent: "flex-start" }}>
          {drinkItem !== undefined && (
            <Typography
              sx={{
                fontWeight: "500",
                display: "inline",
                fontSize: 1,
              }}
            >
              샷 :{drinkItem.shot}
            </Typography>
          )}
        </Grid>
      </Grid>
      <Grid container sx={{ mb: 2 }}>
        <Grid item xs={6} sx={{ boxShadow: 0, display: "flex", justifyContent: "center" }}>
          <Button
            onMouseDown={onClickAccept}
            variant="contained"
            sx={{
              borderRadius: 2,
              background: "#FF9E57",
              fontSize: 14,
              fontWeight: "500",
              mt: 2,
            }}
          >
            수락
          </Button>
        </Grid>
        <Grid item xs={6} sx={{ boxShadow: 0, display: "flex", justifyContent: "center" }}>
          <Button
            onMouseDown={onClickCancel}
            variant="contained"
            sx={{
              // width: "130px",
              borderRadius: 2,
              background: "#CBCBCB",
              fontSize: 14,
              fontWeight: "500",
              mt: 2,
            }}
          >
            거절
          </Button>
        </Grid>
      </Grid>
      <Divider />
    </div>
  );
}
