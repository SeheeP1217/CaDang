import { Grid } from "@mui/material";
import Typography from "@mui/joy/Typography";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material-next/Button";
import { Link } from "react-router-dom";
import React, { useRef, useMemo } from "react";
// import { order } from "../../api/pay";
// import SockJS from "sockjs-client";
// import SockJsClient from "react-stomp";
import SockJsClient from "react-stomp";

export default function PaySuccessPage() {
  // const item = useRecoilValue(orderItem);
  // const [msg, setMsg] = useState("");
  // const [drinkAtom, setDrinkAtom] = useRecoilState(orderItem);
  // const [storeId, setStoreId] = useState(drinkAtom.storeId);
  const $websocket = useRef();
  // console.log("drinkId : " + drinkAtom.drinkId);
  // console.log("drinkId : " + drinkAtom.storeId);
  // const handleMsg = (msg) => {
  //   console.log(msg);
  // };

  const handleClickSendTo = () => {
    $websocket.current.sendMessage("/message/order-request/" + 1 + "", "주문이 들어왔습니다.");
    // console.log("send to server");
    // console.log("drinkId : " + drinkAtom.drinkId);
  };

  // const handleClickSendTemplate = () => {
  //   $websocket.current.sendMessage("/Template");
  // };

  // const sendMessage = (msg) => {
  //   $websocket.current.sendMessage("/message/order-request/1", msg);
  // };

  useMemo(() => {
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
          Authorization: localStorage.getItem("login-token"),
          // Authorization:
          //   "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlc29tNzM1IiwiaWQiOjQsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2NzY1MDcyMDd9.ZXV0ZODZvQiB1p8a2LJ4DOVMNvBfJJXUi_36ZlcfMcZx90KRdUv3523WaQu24sXdTk2Xc3cz86ekL_Ox32SY8w",
        }}
        // topics={["/topic/request-complete/", "/topics/template", "/topics/api"]}
        onMessage={(msg) => {
          // console.log(msg);
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
