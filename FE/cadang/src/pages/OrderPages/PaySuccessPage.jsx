import { Grid } from "@mui/material";
import Typography from "@mui/joy/Typography";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material-next/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { orderItem } from "../../recoil/atom/paymentItem";
import { order } from "../../api/pay";
// import SockJS from "sockjs-client";
// import SockJsClient from "react-stomp";
import * as StompJs from "@stomp/stompjs";
import { Client, Frame } from "stompjs";
import SockJsClient from "react-stomp";

export default function PaySuccessPage() {
  const item = useRecoilValue(orderItem);
  const [msg, setMsg] = useState("");
  const [storeId, setStoreId] = useState(1);

  const $websocket = useRef();
  // const handleMsg = (msg) => {
  //   console.log(msg);
  // };

  const handleClickSendTo = () => {
    $websocket.current.sendMessage(
      "/message/order-request/" + storeId + "",
      "주문이 들어왔습니다."
    );
    console.log("send to server");
  };

  // const handleClickSendTemplate = () => {
  //   $websocket.current.sendMessage("/Template");
  // };

  // const sendMessage = (msg) => {
  //   $websocket.current.sendMessage("/message/order-request/1", msg);
  // };

  const orderRegist = async () => {
    await order(
      item,
      (res) => {
        console.log("=======!!!!!!!!!!!!!!=========");
        console.log(res.data);
        return res.data;
      },
      (err) => console.log(err)
    ).then((data) => setStoreId(data));
  };

  useMemo(() => {
    orderRegist();

    setTimeout(() => handleClickSendTo(), 1000);
  }, []);

  // useEffect(() => {
  //   setTimeout(() => handleClickSendTo(), 1000);
  // }, [storeId]);

  return (
    <div>
      <SockJsClient
        url="http://i8a808.p.ssafy.io:8080/websocket"
        headers={{
          Authorization:
            "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzanNqbGltIiwiaWQiOjIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2NzYzMzI5MTZ9.EmP0DkZs6vpdCNfOocU_eCCHZTpK5mjDYKJn-XXAbr4-pa0o86jgRWN4apbk5-DecBmH0Ye2XhhjT5anSDoslw",
        }}
        // topics={["/topic/request-complete/", "/topics/template", "/topics/api"]}
        onMessage={(msg) => {
          console.log(msg);
        }}
        ref={$websocket}
      />
      <Grid container sx={{ mt: 15 }}>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <CardMedia
            component="img"
            sx={{ width: 200 }}
            image="https://cdn.discordapp.com/attachments/1057523367147753542/1073425369027334165/giphy-unscreen.gif"
            alt="payImg"
          />
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 3 }}>
        <Grid item xs={12} sx={{ boxShadow: 0, display: "flex", justifyContent: "center" }}>
          <Typography
            sx={{
              fontWeight: "700",
              display: "inline",
              fontSize: 19,
            }}
          >
            결제완료
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ boxShadow: 0, display: "flex", justifyContent: "center" }}>
          <Typography
            sx={{
              fontWeight: "700",
              display: "inline",
              fontSize: 19,
            }}
          >
            매장에서 픽업해 주세요.
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ boxShadow: 0, display: "flex", justifyContent: "flex-end" }}>
          <Button
            component={Link}
            to="/main"
            variant="contained"
            sx={{
              borderRadius: 2,
              background: "#FFD0AE",
              fontSize: 14,
              fontWeight: "500",
              mt: 7,
              mr: 3,
            }}
          >
            메인으로
          </Button>
        </Grid>
      </Grid>
      {/* <div>socket</div>
      <div>socket connected : {`${socketConnected}`}</div>
      <div>res : </div>
      <div>
        {items.map((item) => {
          return <div>{JSON.stringify(item)}</div>;
        })}
      </div> */}
    </div>
  );
}
