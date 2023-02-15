import React, { useEffect, useRef, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { Paper, Box, Grid, Card } from "@mui/material";
import Typography from "@mui/joy/Typography";
import OrderListItem from "./OrderListItem";
import { orderList } from "../api/cafeCeo";
import SockJsClient from "react-stomp";
import CardMedia from "@mui/material/CardMedia";
import drinkImg from "../assets/drink.png";

export default function OrderList() {
  const [orderListData, setOrderListData] = useState([]);
  const $websocket = useRef();

  // 픽업 완료했을 시 해당 주문의 아이템 삭제
  const onRemove = (idx) => {
    const newChild = orderListData;
    const index = newChild.indexOf(orderListData[idx]);
    if (idx > -1) {
      newChild.splice(index, 1);
      setOrderListData([...newChild]);
    }
  };

  useMemo(() => {
    // 화면 랜더링 되기 전 현재 주문 목록 리스트 통신
    const getOrderList = async () => {
      await orderList(
        (res) => {
          console.log(res.data);
          return res.data;
        },
        (err) => console.log(err)
      ).then((data) => setOrderListData(data));
    };
    getOrderList();
  }, []);

  useEffect(() => {}, [orderListData]);

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
      {orderListData.length === 0 && (
        <Grid container sx={{ mt: 0, display: "flex", justifyContent: "center" }}>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <CardMedia component="img" sx={{ width: 80 }} image={drinkImg} alt="payImg" />
          </Grid>
          <Typography
            sx={{
              fontFamily: "netmarble",
              fontSize: "20px",
              fontWeight: "xl",
              level: "h3",
              m: 0,
              mt: 1,
              display: "flex",
              justifyContent: "center",
            }}
          >
            진행 중인 주문이 없습니다.🙏
          </Typography>
        </Grid>
      )}
      {orderListData.map((item, key) => (
        <OrderListItem order={item} id={key} onRemove={onRemove} />
      ))}
    </div>
  );
}
