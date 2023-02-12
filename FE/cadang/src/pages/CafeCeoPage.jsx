import React, { useEffect, useRef, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { Paper, Box, Grid, Card } from "@mui/material";
import { BoxProps } from "@mui/material/Box";
import Button from "@mui/material-next/Button";
import Typography from "@mui/joy/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SockJsClient from "react-stomp";
import SockJS from "sockjs-client";
import { newOrderCheck } from "../api/cafeCeo";
import NewOrderList from "../components/NewOrderList";

export default function CafeCeoPage() {
  const [value, setValue] = React.useState(0);
  const [msg, setMsg] = useState("");
  const $websocket = useRef();
  const [drink, setDrink] = useState([]);

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
          fontSize: "0.875rem",
          fontWeight: "700",
          ...sx,
        }}
        {...other}
      />
    );
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  useEffect(() => {
    console.log(msg);

    const getOrder = async () => {
      await newOrderCheck(
        (res) => {
          console.log(res.data[0]);
          return res.data[0];
        },
        (err) => console.log(err)
      ).then((data) => setDrink(drink.concat(data)));
    };
    // setDrink((drink) => {
    //   console.log("새로 들어오기 이전 데이터 :", drink);
    //   return [data, ...drink];
    // })
    if (msg === "주문이 들어왔습니다.") getOrder();
    setMsg("");
    console.log(drink + "=====");
  }, [msg]);

  useEffect(() => {
    console.log("drink 잘 set 된거니??????" + drink);
  }, [drink]);

  return (
    <Card style={{ background: "#FF6E6E" }}>
      <SockJsClient
        url="http://i8a808.p.ssafy.io:8080/websocket"
        headers={{
          Authorization:
            "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhYmFiMTIzNCIsImlkIjo2OSwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY3NjIxODE0NX0.s_6_v2kF_hQ4fc7CwscGr47Koq3kzgcCIROUXMiOmJvvdq4x7Cudns_smA6wgf1TgFxy4S76CxxEyuBwwepixg",
        }}
        topics={["/topic/store-order-manage/69"]}
        onMessage={(msg) => {
          // console.log(msg);
          setMsg(msg);
        }}
        ref={$websocket}
      />
      <Box sx={{ borderBottom: 1, borderColor: "divider" }} mt={2}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="fullWidth"
        >
          <Tab label="신규 주문" {...a11yProps(0)} />
          <Tab label="주문 목록" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Card sx={{ mt: "", p: 1 }}>
          {/* 신규 주문에 대한 컴포넌트 */}
          {drink.length !== 0 && <NewOrderList drinks={drink} />}
          {/* ======================= */}
        </Card>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Card sx={{ mt: "", p: 1 }}>
          <Grid container>
            <Grid item xs={8} sx={{ display: "flex", justifyContent: "flex-start" }}>
              <Typography
                sx={{
                  fontWeight: "700",
                  display: "inline",
                  fontSize: 18,
                }}
              >
                아이스 아메리카노
              </Typography>
            </Grid>
            <Grid item xs={4} sx={{ boxShadow: 0, display: "flex", justifyContent: "flex-end" }}>
              <Typography
                sx={{
                  fontWeight: "700",
                  display: "inline",
                  fontSize: 16,
                  mt: "1%",
                }}
              >
                사용자 아이디
              </Typography>
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
              mt: 2,
            }}
          >
            <Item
              sx={{
                // width: "130px",
                borderRadius: 2,
                background: "#FF9E57",
                fontSize: 12,
                fontWeight: "500",
              }}
            >
              음료 제조 중
            </Item>

            <Item
              // variant="contained"
              sx={{
                // width: "130px",
                borderRadius: 2,
                background: "#FF9E57",
                fontSize: 12,
                fontWeight: "500",
              }}
            >
              제조 완료
            </Item>

            <Item
              // variant="contained"
              sx={{
                // width: "130px",
                borderRadius: 2,
                background: "#FF9E57",
                fontSize: 12,
                fontWeight: "500",
              }}
            >
              픽업 완료
            </Item>
          </Box>
        </Card>
      </TabPanel>
    </Card>
  );
}
