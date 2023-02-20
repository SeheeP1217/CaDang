import React, { useState, useRef } from "react";
import { Paper, Box, Grid, Card } from "@mui/material";
import { styled } from "@mui/material/styles";
import DrinkMenuItem from "../../components/util/DrinkMenuItem";
import PaymentMoney from "../../components/PaymentMoney";
import Typography from "@mui/joy/Typography";
import CardMedia from "@mui/material/CardMedia";
import kakaopay from "../../assets/payment_icon_yellow_large.png";
import Button from "@mui/material-next/Button";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { orderItem } from "../../recoil/atom/paymentItem";
import { order } from "../../api/pay";

export default function PaymentPage() {
  const location = useLocation();
  const orderDetail = location.state.orderDetail;
  const drinkItem = location.state.drinkItem;
  const storeId = location.state.drinkDetail.storeId;

  // console.log("storeId : " + storeId);
  // console.log("orderDetail-syrup : " + orderDetail.syrup);
  // console.log("orderDetail-vanilla : " + orderDetail.vanilla);
  // console.log("orderDetail-hazelnut : " + orderDetail.hazelnut);
  // console.log("orderDetail-caramel : " + orderDetail.caramel);

  const kakaoPayDiv = useRef();
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: "000000",
  }));

  const item = {
    drinkId: orderDetail.drinkId,
    caffeine: orderDetail.caffeine,
    sugar: orderDetail.sugar,
    cal: orderDetail.cal,
    price: orderDetail.price,
    shot: orderDetail.shot,
    whip: orderDetail.whip,
    sugarContent: orderDetail.sugarContent,
    syrup: 0,
    vanilla: 0,
    hazelnut: 0,
    caramel: 0,
    photo: drinkItem.img,
    storeName: drinkItem.storeName,
    storeId: storeId,
  };

  const orderRegist = async () => {
    await order(
      item,
      (res) => {
        // console.log("=======!!!!!!!!!!!!!!=========");
        // console.log(res.data);
        return res.data;
      },
      (err) => console.log(err)
    ).then((data) => setDrinkAtom());
  };

  const [drinkAtom, setDrinkAtom] = useRecoilState(orderItem);
  setDrinkAtom(orderDetail);
  // console.log("drinkAtom !!!!!!!!! : " + drinkAtom.sugarContent);
  const [payItem, setPayItem] = useState({
    // 응답에서 가져올 값들
    next_redirect_pc_url: "",
    tid: "",
    // 요청에 넘겨줄 매개변수들
    params: {
      cid: "TC0ONETIME",
      partner_order_id: "partner_order_id",
      partner_user_id: "partner_user_id",
      item_name: drinkItem.drinkName,
      quantity: 1,
      total_amount: orderDetail.price,
      vat_amount: orderDetail.price * 0.1,
      tax_free_amount: 0,
      approval_url: "http://i8a808.p.ssafy.io/pay-success",
      fail_url: "http://i8a808.p.ssafy.io/pay-fail",
      cancel_url: "http://i8a808.p.ssafy.io/main",
    },
  });

  // useEffect(() => {
  //   setDrinkAtom(drink);
  //   console.log(drink);
  // }, []);

  const onClickKakaopay = (event) => {
    // console.log("카카오페이 결제하러 가기!!!!!!!!!!!!");
    const { params } = payItem;
    // console.log(params);

    // const url = "";
    if (btnActive === false) {
      alert("결제 수단을 선택해주세요.🙏");
    } else {
      axios({
        // 프록시에 카카오 도메인을 설정했으므로 결제 준비 url만 주자
        url: "https://kapi.kakao.com/v1/payment/ready",
        // 결제 준비 API는 POST 메소드라고 한다.
        method: "POST",
        headers: {
          Authorization: `KakaoAK ${process.env.REACT_APP_KAKAOPAY_KEY}`,
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        // headers: {
        //   // 카카오 developers에 등록한 admin키를 헤더에 줘야 한다.
        //   Authorization: `KakaoAK `,
        //   "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        // },
        // 설정한 매개변수들
        params,
      }).then((response) => {
        // console.log(response);
        // console.log(response.data.next_redirect_pc_url);

        if (response.status === 200) {
          orderRegist();
          // 결제가 가능하다면 결제 페이지로 새로운 창 뜨게 함
          // <Link to="response.data.next_redirect_pc_url" />;
          // console.log("orderDetail ==> " + orderDetail.drinkId);
          window.open(response.data.next_redirect_mobile_url);
          // window.open(response.data.next_redirect_pc_url);
        } else if (response.status == 404) {
          // 404 에러라면
          <Link to="/error404">error 404</Link>;
        } else if (response.status === 500) {
          // 500 에러라면
          <Link to="/error500">error500</Link>;
        }

        // 응답 data로 state 갱신
        // setPayItem({ next_redirect_pc_url, tid });
      });
    }
  };

  let [btnActive, setBtnActive] = useState(false);

  const toggleActive = (e) => {
    if (btnActive === false) {
      kakaoPayDiv.current.style.backgroundColor = "#FE9A2E";
      setBtnActive((prev) => {
        return true;
      });
    } else {
      kakaoPayDiv.current.style.backgroundColor = "#FFFFFF";
      setBtnActive((prev) => {
        return false;
      });
    }

    // console.log(btnActive);
  };

  return (
    <div style={{ padding: "3%", marginTop: "3%" }}>
      {/* =========== 카페 이름 /// 카페 지점 ============= */}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Item sx={{ fontWeight: "700" }}>{drinkItem.storeName}</Item>
          </Grid>
          {/* <Grid item xs={4}>
            <Item style={{ fontWeight: "700" }}>강남점</Item>
          </Grid> */}
        </Grid>
      </Box>
      {/* =============================================== */}
      <div style={{ marginTop: "3%" }}>
        <DrinkMenuItem drinkItem={drinkItem} />
      </div>
      {/* 주문 음료에 대한 메뉴 이름과 추가 메뉴에 대한 추가 금액 */}
      <PaymentMoney drinkItem={drinkItem} />
      {/* ======================================== */}
      <Card style={{ background: "#ffffff" }} sx={{ p: 1, mt: "3%" }}>
        <Grid container>
          <Grid item xs={8} sx={{ boxShadow: 0, display: "flex", justifyContent: "flex-start" }}>
            <Typography
              sx={{
                display: "inline",
                fontSize: 18,
                fontWeight: "700",
              }}
            >
              총 주문 금액
            </Typography>
          </Grid>
          <Grid item xs={4} sx={{ boxShadow: 0, display: "flex", justifyContent: "flex-end" }}>
            <Typography
              sx={{
                display: "inline",
                fontSize: 18,
                fontWeight: "700",
              }}
            >
              {orderDetail.price} 원
            </Typography>
          </Grid>
        </Grid>
      </Card>
      {/* ============================================= */}
      <Box
        style={{ marginTop: "10%" }}
        component="span"
        sx={{ display: "block", fontSize: 18, fontWeight: "700" }}
      >
        결제 수단
      </Box>
      <Card onMouseDown={toggleActive} sx={{ display: "flex", p: 1, mt: 1 }} ref={kakaoPayDiv}>
        <CardMedia component="img" sx={{ width: 100 }} image={kakaopay} alt="kakaopay" />
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: "700",
            mt: 1,
            ml: 8,
          }}
        >
          카카오페이
        </Typography>
      </Card>
      <Grid sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          onMouseDown={onClickKakaopay}
          variant="contained"
          sx={{
            borderRadius: 2,
            background: "#F7BE81",
            fontSize: 15,
            fontWeight: "700",
            mt: 3,
            ml: 24,
          }}
        >
          결제하기
        </Button>
      </Grid>
    </div>
  );
}
