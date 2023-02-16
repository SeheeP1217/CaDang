import React, { useEffect, useRef, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { Paper, Box, Grid, Card } from "@mui/material";
import Typography from "@mui/joy/Typography";
import Button from "@mui/material-next/Button";
import Divider from "@mui/material/Divider";
import { setOrderStatus } from "../api/cafeCeo";
import SockJsClient from "react-stomp";

export default function NewOrderListItem(props) {
  const [drinkItem, setDrinkItem] = useState();
  const [status, setStatus] = useState("none");
  // const [userId, setUserId] = useState(0);

  const onClickAccept = () => {
    console.log("수락 버튼 클릭!!!!!!!!!!!!!!!!!!!!!!!");
    // if (window.confirm(`${props.id + 1}번째 주문을 수락하시겠습니까?`))
    if (window.confirm(`${props.id + 1}번째 주문을 수락하시겠습니까?`)) {
      setStatus((accept) => "accept");

      const putOrder = async () => {
        await setOrderStatus(
          drinkItem.orderId,
          "ACCEPT",
          (res) => {
            console.log(res.data);
            return res.data;
          },
          (err) => console.log(err)
        ).then((data) => {
          props.setUserId((userId) => data);
          setStatus((status) => "accept");
        });
      };

      putOrder();

      console.log("현재 주문 상태 : " + status);

      if (status === "accept") {
        console.log("userId 값이 바뀌었을 때 작동하는 useEffect() : " + status);
        // setTimeout(() => handleClickSendToAccept(), 30);
      } else if (status === "cancel") {
        console.log("userId 값이 바뀌었을 때 작동하는 useEffect() : " + status);
        // setTimeout(() => handleClickSendToCancel(), 30);
      }

      props.deleteChild(props.id);
    } else {
    }
  };

  const onClickCancel = () => {
    console.log("거절 버튼 클릭!!!!!!!!!!!!!!!!!!!!");

    if (window.confirm(`${props.id + 1}번째 주문을 거절하시겠습니까?`)) {
      setStatus((accept) => "cancel");

      const putOrder = async () => {
        await setOrderStatus(
          drinkItem.orderId,
          "CANCEL",
          (res) => {
            console.log(res.data);
            return res.data;
          },
          (err) => console.log(err)
        ).then((data) => {
          props.setUserId((userId) => data);
          setStatus((status) => "cancel");
        });
      };

      putOrder();

      // console.log("서버로부터 받아온 userId : " + userId);
      console.log("현재 주문 상태 : " + status);

      if (status === "accept") {
        console.log("userId 값이 바뀌었을 때 작동하는 useEffect() : " + status);
        // setTimeout(() => handleClickSendToAccept(), 30);
      } else if (status === "cancel") {
        console.log("userId 값이 바뀌었을 때 작동하는 useEffect() : " + status);
        // setTimeout(() => handleClickSendToCancel(), 30);
      }

      props.deleteChild(props.id);
    }
  };

  useMemo(() => {
    setDrinkItem(props.drink);
  }, []);

  // useEffect(() => {
  //   // console.log("서버로부터 받아온 userId : " + userId);
  //   console.log("현재 주문 상태 : " + status);

  //   if (status === "accept") {
  //     console.log("userId 값이 바뀌었을 때 작동하는 useEffect() : " + status);
  //     // setTimeout(() => handleClickSendToAccept(), 50);
  //   } else if (status === "cancel") {
  //     console.log("userId 값이 바뀌었을 때 작동하는 useEffect() : " + status);
  //     // setTimeout(() => handleClickSendToCancel(), 50);
  //   }
  // }, [userId]);

  useEffect(() => {
    console.log("status 상태 바뀐건가아ㅏㅇ아ㅏ아앙?");
    if (status === "accept") {
      console.log(status);
      // setTimeout(() => handleClickSendToAccept(), 50);
    } else if (status === "cancel") {
      console.log(status);
      // setTimeout(() => handleClickSendToCancel(), 50);
    }
  }, [status]);

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

        <Grid
          item
          xs={12}
          sx={{ mt: 1, boxShadow: 0, display: "flex", justifyContent: "flex-start" }}
        >
          {drinkItem !== undefined && (
            <Typography
              sx={{
                fontWeight: "500",
                display: "inline",
                fontSize: 13,
              }}
            >
              샷:{drinkItem.shot} / 시럽:{drinkItem.syrup} / 바닐라 시럽:{drinkItem.vanilla} /
              헤이즐넛 시럽:{drinkItem.hazelnut}
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
