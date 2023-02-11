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
import SockJS from "sockjs-client";
import SockJsClient from "react-stomp";
import * as StompJs from "@stomp/stompjs";

export default function PaySuccessPage() {
  const item = useRecoilValue(orderItem);
  const [msg, setMsg] = useState("");
  const ROOM_SEQ = 1;

  const client = useRef({});
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");

  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: "ws://i8a808.p.ssafy.io:8080/websocket", // 웹소켓 서버로 직접 접속
      connectHeaders: {
        Authorization:
          "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhYmFiMTIzNCIsImlkIjo2OSwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY3NjA5ODMwOH0.sW7OaiNg0mOT0euRy1po_cguzTrPTJpqWcg2piKOIh9DKcEC1Ds_r4UAnDD8v1pLxHLl-KTOpij8ejwKdsPPag",
      },
      debug: function (str) {
        console.log(str);
      },
      // reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        subscribe();
      },
      onStompError: (frame) => {
        console.error(frame);
      },
    });
    console.log("socket 통신 시작 !!!!!");
    client.current.activate();
  };

  const disconnect = () => {
    console.log("socket disconnect !!!!!!");
    client.current.deactivate();
  };

  const subscribe = () => {
    client.current.subscribe(`/sub/chat/${ROOM_SEQ}`, ({ body }) => {
      setChatMessages((_chatMessages) => [..._chatMessages, JSON.parse(body)]);
    });
  };

  // const publish = (message) => {
  //   if (!client.current.connected) {
  //     return;
  //   }

  //   client.current.publish({
  //     destination: "/pub/chat",
  //     body: JSON.stringify({ roomSeq: ROOM_SEQ, message }),
  //   });

  //   setMessage("");
  // };

  useEffect(() => {
    connect();

    return () => disconnect();
  }, []);

  const orderRegist = async () => {
    await order(
      item,
      (res) => {
        console.log("=======!!!!!!!!!!!!!!=========");
        console.log(res.data);
        return res.data;
      },
      (err) => console.log(err)
    ).then((data) => setMsg(data));
  };

  useMemo(() => {
    orderRegist();
  }, []);

  useEffect(() => {
    console.log(msg);
  });

  return (
    <div>
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
    </div>
  );
}
