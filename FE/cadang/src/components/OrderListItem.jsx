import React, { useEffect, useRef, useState, useMemo } from "react";
import { Box, Grid, Card } from "@mui/material";
import Typography from "@mui/joy/Typography";
import Button from "@mui/material-next/Button";
import Divider from "@mui/material/Divider";
import SockJsClient from "react-stomp";
import { setOrderStatus } from "../api/cafeCeo";

export default function OrderListItem(props) {
  const $websocket = useRef();
  const acceptBtn = useRef();
  const completeBtn = useRef();
  const pickupBtn = useRef(null);
  const [accept, setAccept] = useState(false);
  const [complete, setComplete] = useState(false);
  const [pickup, setPickup] = useState(false);
  const [status, setStatus] = useState("");
  const [id, setId] = useState(0);
  const [orderItem, setOrderItem] = useState(props.order);
  const [customerId, setCustomerId] = useState(0);

  function Item(props) {
    const { sx, ...other } = props;
    return (
      <Button
        sx={{
          p: 1,
          bgcolor: (theme) => (theme.palette.mode === "dark" ? "#101010" : "grey.100"),
          color: (theme) => (theme.palette.mode === "dark" ? "grey.300" : "grey.800"),
          border: "1px solid",
          borderColor: (theme) => (theme.palette.mode === "dark" ? "grey.800" : "grey.300"),
          borderRadius: 2,
          background: "#FF9E57",
          fontSize: 12,
          fontWeight: "500",
          ...sx,
        }}
        {...other}
      />
    );
  }

  // 각 주문 현황의 상태가 변경됐을 때마다 수행돼야 함. : 웹소켓 통신
  const handleClickSendToComplete = () => {
    if (id !== 0) {
      $websocket.current.sendMessage(
        "/message/order-response/" + id + "",
        "음료 제조가 완료됐습니다."
      );
      setAccept(false);
      console.log("send to server : 음료 제조가 완료됐습니다. msg 전송." + id);
    }
  };

  // 각 주문 현황의 상태가 변경됐을 때마다 수행돼야 함. : 웹소켓 통신
  const handleClickSendToPickup = () => {
    if (id !== 0) {
      $websocket.current.sendMessage(
        "/message/order-response/" + id + "",
        "음료가 픽업 완료됐습니다."
      );
      // setAccept(false);
      setComplete(false);
      // setPickup(false);
      console.log("send to server : 음료가 픽업 완료됐습니다. msg 전송." + id);

      // 음료를 손님이 픽업 완료해갔다면 음료 리스트에서 삭제하기
      props.onRemove(props.id);
    }
  };

  // 카페가 주문 현황 상태를 "제조 완료"버튼을 눌렀을 경우
  const onClickComplete = () => {
    console.log("제조 완료 버튼 클릭 !!!!!!!!!");
    setAccept(false);
    setComplete(true);

    if (window.confirm("제조 완료하셨습니까?")) {
      setStatus("COMPLETE"); // 제조 완료했다면 음료 주문 상태 변경
      // 주문 상태 변경 요청 api 함수
      const putOrder = async () => {
        await setOrderStatus(
          orderItem.orderId,
          "COMPLETE",
          (res) => {
            console.log(res.data);
            return res.data;
          },
          (err) => console.log(err)
        ).then((data) => setId(data));
      };

      putOrder();

      console.log("putOrder() 후 : 서버로부터 받아온 customerId => " + id);
    }
  };

  // 카페가 주문 현황 상태를 "픽업 완료" 버튼을 눌렀을 경우
  const onClickPickUp = () => {
    console.log("픽업 완료 버튼 클릭!!!!!!!!!!!!!!");
    setComplete(false);
    // setPickup(true);

    if (window.confirm("손님이 픽업 완료했습니까?")) {
      setStatus("PICKUP"); // 음료가 픽업 완료됐다면 status 변경
      // 주문 상태 변경 요청 api 함수
      const putOrder = async () => {
        await setOrderStatus(
          orderItem.orderId,
          "PICKUP",
          (res) => {
            console.log(res.data);
            return res.data;
          },
          (err) => console.log(err)
        ).then((data) => setId(data));
      };

      putOrder();
    }
  };

  // orderStatus flag값 설정 -> 현재 진행 중인 상태에 대한 버튼만 회색 처리
  useMemo(() => {
    if (props.order.orderStatus === "ACCEPT") setAccept(true);
    else if (props.order.orderStatus === "COMPLETE") setComplete(true);
    // else if (props.order.orderStatus === "PICKUP") setPickup(true);

    console.log(props.order.orderStatus);
  }, []);

  useEffect(() => {
    console.log("변경된 orderStatus : " + status);

    if (status === "COMPLETE") {
      setTimeout(() => handleClickSendToComplete(), 500);
      // setCustomerId();
    } else if (status === "PICKUP") {
      setTimeout(() => handleClickSendToPickup(), 500);
    }
  }, [status]);

  useEffect(() => {
    console.log("변경된 Id : " + id);
    setCustomerId(id);

    if (status === "COMPLETE") {
      console.log("현재 주문 현황 COMPLETE인 경우 accept 상태: " + accept);
      setTimeout(() => setAccept(false), 10);
      setTimeout(() => handleClickSendToComplete(), 500);
      // setCustomerId();
    } else if (status === "PICKUP") {
      console.log("현재 주문 현황 PICKUP인 경우 complete 상태: " + complete);
      // setPickup(false);
      setTimeout(() => setComplete(false), 10);
      setTimeout(() => handleClickSendToPickup(), 500);
    }
    // if(status === "COMPLETE") {
    //   setTimeout(() => handleClickSendToComplete(),500);
    //   // setCustomerId();

    // } else if(status === "PICKUP") {
    //   setTimeout(() => handleClickSendToPickup(),500);

    // }
  }, [id]);

  // useEffect(() => {
  //   if (complete === true) {
  //     // 픽업 완료 눌렀다면 해당 주문의 아이템 리스트에서 삭제 처리하기
  //     console.log("리스트에서 삭제 처리하기 !!!!!!!!!!!!!!!!!");
  //   }
  //   console.log("complete 처리 된건가요 ?????");
  // }, [complete]);

  useEffect(() => {
    setOrderItem(props.order);

    setAccept(false);
    setComplete(false);
    setPickup(false);

    if (props.order.orderStatus === "ACCEPT") {
      pickupBtn.current.background = "#FF9E57";
      setAccept(true);
      setComplete(false);
      setPickup((pickup) => false);
    } else if (props.order.orderStatus === "COMPLETE") {
      setAccept(false);
      setComplete(true);
      setPickup((pickup) => false);
    } else if (props.order.orderStatus === "PICKUP") {
      pickupBtn.current.background = "FF9E57";
      setAccept(false);
      setComplete(false);
      // setPickup(true);
    }
    console.log("현재 props.orderStatus의 상태 : " + props.order.orderStatus);
    console.log("accept의 상태 : " + accept);
    console.log("complete의 상태 : " + complete);
    console.log("pickup의 상태 : " + pickup);
  }, [props.order]);

  return (
    <div>
      <SockJsClient
        url="http://i8a808.p.ssafy.io:8080/websocket"
        headers={{
          Authorization:
            "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdGFyYnVja3MiLCJpZCI6MSwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY3NjUwNjcxOX0.PFVyJuhUcxKWPXop6YRC6nosELoZIAGDGaU2ctk75zseUstkYz6W-f08YzhAgGPdV9xbhbBqGKrmxZ0KVyYIOQ",
        }}
        // topics={["/topic/store-order-manage/1", ""]}
        onMessage={(msg) => {
          // console.log(msg);
          // setMsg(msg);
        }}
        ref={$websocket}
      />
      <Grid sx={{ mt: 2 }} container>
        <Grid item xs={8} sx={{ display: "flex", justifyContent: "flex-start" }}>
          {orderItem !== undefined && (
            <Typography
              sx={{
                fontWeight: "700",
                display: "inline",
                fontSize: 18,
              }}
            >
              {orderItem.drinkName}
            </Typography>
          )}
        </Grid>
        <Grid item xs={4} sx={{ boxShadow: 0, display: "flex", justifyContent: "flex-end" }}>
          {orderItem !== undefined && (
            <Typography
              sx={{
                fontWeight: "700",
                display: "inline",
                fontSize: 16,
                mt: "1%",
              }}
            >
              {orderItem.memberId}
            </Typography>
          )}
        </Grid>

        <Grid item xs={12} sx={{ boxShadow: 0, display: "flex", justifyContent: "flex-start" }}>
          <Typography
            sx={{
              fontWeight: "500",
              display: "inline",
              fontSize: 13,
            }}
          >
            샷 추가 + 1 / 헤이즐넛시럽 추가 + 1
          </Typography>
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          bgcolor: "background.paper",
          borderRadius: 1,
          mt: 1.5,
          mb: 0.5,
        }}
      >
        <Button
          sx={{
            p: 1,
            bgcolor: "grey.100",
            color: (theme) => (theme.palette.mode === "dark" ? "grey.300" : "grey.800"),
            border: "1px solid",
            borderColor: (theme) => (theme.palette.mode === "dark" ? "grey.800" : "grey.300"),
            borderRadius: 2,
            background: accept === true ? "grey.300" : "#FF9E57",
            fontSize: 12,
            fontWeight: "500",
          }}
          ref={acceptBtn}
        >
          음료 제조 중
        </Button>
        {/* <button type='button' style={status === 'ACCEPT' ? {backgroundColor:'red'} : {backgroundColor:'blue'}}>
          음료 제조중
        </button> */}

        <Button
          onMouseDown={onClickComplete}
          sx={{
            p: 1,
            bgcolor: (theme) => (theme.palette.mode === "dark" ? "#101010" : "grey.100"),
            color: (theme) => (theme.palette.mode === "dark" ? "grey.300" : "grey.800"),
            border: "1px solid",
            borderColor: (theme) => (theme.palette.mode === "dark" ? "grey.800" : "grey.300"),
            borderRadius: 2,
            background: complete === true ? "grey.300" : "#FF9E57",
            fontSize: 12,
            fontWeight: "500",
          }}
          ref={completeBtn}
        >
          제조 완료
        </Button>

        <Button
          onMouseDown={onClickPickUp}
          sx={{
            p: 1,
            bgcolor: (theme) => (theme.palette.mode === "dark" ? "#101010" : "grey.100"),
            color: (theme) => (theme.palette.mode === "dark" ? "grey.300" : "grey.800"),
            border: "1px solid",
            borderColor: (theme) => (theme.palette.mode === "dark" ? "grey.800" : "grey.300"),
            borderRadius: 2,
            // background: "#FF9E57",
            background: pickup === true ? "grey.300" : "#FF9E57",
            fontSize: 12,
            fontWeight: "500",
          }}
          ref={pickupBtn}
        >
          픽업 완료
        </Button>
      </Box>
      <Divider />
    </div>
  );
}
