import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { fontSize } from "@mui/system";
import { useEffect, useRef, useState, useMemo } from "react";
import { Box, Grid } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import payCompleteImg from "../assets/payComplete.png";
import making from "../assets/making.png";
import finished from "../assets/finished.png";
import SockJsClient from "react-stomp";

export default function OrderStatus(props) {
  const $websocket = useRef();
  const userId = props.userId;
  console.log("OrderStatus 컴포넌트 안에서 props로 받아온 userId : " + userId);

  return (
    <div
      style={{
        marginTop: "5%",
      }}
    >
      {/* 웹소켓 클라이언트 연결 */}
      <SockJsClient
        url="http://i8a808.p.ssafy.io:8080/websocket"
        headers={{
          Authorization: localStorage.getItem("login-token"),
        }}
        topics={["/topic/customer-order-manage/" + userId + "", ""]}
        onMessage={(msg) => {
          console.log(msg);
          // setMsg(msg);
        }}
        ref={$websocket}
      />
      {/* defaultExpanded 속성을 통해 AccordionDetails 보이게 하기 defaultExpanded="true" */}
      <Accordion defaultExpanded="true">
        <Box
          style={{
            borderBottom: "2px solid #ffab00",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "#ffab00" }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{
              "&.Mui-expanded": {
                margin: 0,
              },
            }}
          >
            <Typography
              sx={{
                fontFamily: "netmarble",
                fontSize: "22px",
                fontWeight: "xl",
                level: "h3",
                m: 0,
              }}
            >
              현재 주문 현황
            </Typography>
          </AccordionSummary>
        </Box>
        <AccordionDetails>
          <Typography
            sx={{
              fontWeight: "700",
              display: "inline",
              fontSize: 18,
            }}
          >
            음료 이름 - 주문한 카페명 지점
          </Typography>
          <Box>
            <Grid container sx={{ mt: 1 }}>
              <Grid item xs={4} sx={{ display: "flex" }}>
                {/* <Typography
                  sx={{
                    fontWeight: "700",
                    display: "inline",
                    fontSize: 18,
                  }}
                >
                  결제 완료
                </Typography> */}
                <CardMedia
                  component="img"
                  sx={{ width: 50, ml: 3 }}
                  image={payCompleteImg}
                  alt="payCompleteImg"
                />
                {/* <img
                  alt="paysuccess"
                  src={payCompleteImg}
                  style={{ objectFit: "fill" }}
                  width="50"
                /> */}
              </Grid>
              <Grid item xs={4} sx={{ boxShadow: 0, display: "flex" }}>
                <CardMedia component="img" sx={{ width: 50, ml: 2 }} image={making} alt="making" />
                {/* <img alt="making" src={making} style={{ objectFit: "fill" }} width="50" /> */}
                {/* <Typography
                  sx={{
                    fontWeight: "700",
                    display: "inline",
                    fontSize: 18,
                    mt: "1%",
                  }}
                >
                  제조 중
                </Typography> */}
              </Grid>
              <Grid item xs={4} sx={{ boxShadow: 0, display: "flex" }}>
                <CardMedia
                  component="img"
                  sx={{ width: 50, ml: 1 }}
                  image={finished}
                  alt="finished"
                />
                {/* <img alt="finished" src={finished} style={{ objectFit: "fill" }} width="50" /> */}
                {/* <Typography
                  sx={{
                    fontWeight: "700",
                    display: "inline",
                    fontSize: 18,
                    mt: "1%",
                  }}
                >
                  제조 완료
                </Typography> */}
              </Grid>
            </Grid>
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
