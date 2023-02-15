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
import { cardGrey } from "../assets/card-gray.png";
import { card } from "../assets/card.png";
import { coffeePot } from "../assets/coffeepot.png";
import { coffeePotGrey } from "../assets/coffeepot-gray.png";
import { logoDrink } from "../assets/logo-drink.png";
import { drinkGrey } from "../assets/drink-gray.png";
import payCompleteImg from "../assets/payComplete.png";
import making from "../assets/making.png";
import finished from "../assets/finished.png";
import SockJsClient from "react-stomp";
import { nowOrderStatus } from "../api/main";
import OrderStatusChild from "./OrderStatusChild";

export default function OrderStatus(props) {
  const $websocket = useRef();
  const [data, setData] = useState([]);
  const [drink, setDrink] = useState([]);
  const userId = props.userId;
  console.log("OrderStatus 컴포넌트 안에서 props로 받아온 userId : " + userId);
  const [msg, setMsg] = useState(""); // 웹소켓 통신으로 받아온 msg

  const getOrderStatus = async () => {
    await nowOrderStatus(
      (res) => {
        console.log(res.data);
        return res.data;
      },
      (err) => console.log(err)
    ).then((data) => setData(data));
  };

  // 컴포넌트 렌더링 되기 전 : 사용자의 현재 주문 상태가 있는지 확인
  // /get 요청으로 api 통신
  useMemo(() => {
    getOrderStatus();
  }, []);

  useEffect(() => {});

  useEffect(() => {
    data.map((item, key) => {
      console.log("현재 주문 현황 통신 후 받아온 데이터 : " + item.drinkName);
    });
    setDrink(data);
  }, [data]);

  useEffect(() => {
    if (msg === "주문이 수락 혹은 거절됐습니다.") {
      console.log(msg);
      getOrderStatus();
      console.log("drink의 크기 : " + drink.length);
    } else if (msg === "음료 제조가 완료됐습니다.") {
      console.log(msg);
      getOrderStatus();
    } else if (msg === "음료가 픽업 완료됐습니다.") {
      console.log(msg);
      getOrderStatus();
    }
  }, [msg]);

  return (
    <div
      style={{
        marginTop: "5%",
      }}
    >
      {/* 웹소켓 클라이언트 연결 */}
      <div>
        <SockJsClient
          url="http://i8a808.p.ssafy.io:8080/websocket"
          headers={{
            Authorization: localStorage.getItem("login-token"),
          }}
          topics={["/topic/customer-order-manage/" + userId + "", ""]}
          onMessage={(msg) => {
            console.log("웹소켓 통신으로 받아온 메시지: " + msg);
            setMsg(msg);
          }}
          ref={$websocket}
        />
      </div>
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
          {data.length === 0 && <h2>주문이 없습니다.</h2>}
          {data.length !== 0 &&
            data.map((item, key) => <OrderStatusChild drink={item} key={key} />)}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
