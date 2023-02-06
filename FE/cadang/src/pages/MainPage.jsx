import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import OrderStatus from "../components/OrderStatus";
import DrinkRecommendation from "../components/DrinkRecommendation";
import DailyConsumptionGraph from "../components/util/DailyConsumptionGraph";
import DailyOtherInfo from "../components/DailyOtherInfo";
import { Card } from "@mui/material";
import Typography from "@mui/joy/Typography";
import { useRecoilState, useRecoilValue } from "recoil";
import { userId, todayDate } from "../recoil/atom/user.jsx";
import MapCategory from "../components/MapCategory.jsx";

export default function MainPage() {

  const [today, setToday] = useRecoilState(todayDate);
  const [location, setLocation] = useState({});

  // 로그인 한 사용자 아이디
  const id = useRecoilValue(userId);
  console.log(today);

  //Get the user's current location
  // navigator.geolocation.getCurrentPosition((position) => {
  //   setLocation({
  //     lat: position.coords.latitude,
  //     lng: position.coords.longitude,
  //   });
  // });
  // 현재 날짜 세팅
  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);

  // 현재 날짜 string으로 변환
  const dateString = year + "-" + month + "-" + day;

  useEffect(() => {
    console.log("화면 랜더링");
    setToday(dateString);
  }, []);

  return (
    <Box sx={{ mt: 3 }}>
      <Typography level="h3" fontSize="xl" fontWeight="xl">
        오늘의 현황
      </Typography>
      <Card>
        <DailyConsumptionGraph data={data} />
        <DailyOtherInfo data={dailyData} />
      </Card>
      <OrderStatus />
      <Box sx={{ mt: 2 }}>
        <Typography level="h3" fontSize="xl" fontWeight="xl">
          음료 추천
        </Typography>
      </Box>
      <Box sx={{ mt: 1 }}>
        <DrinkRecommendation />
      </Box>
    </Box>
  );
}

const data = [
  {
    name: "카페인",
    consumption: 2400,
    change: 0,
  },
  {
    name: "당",
    consumption: 1398,
    change: 0,
  },
];

const dailyData = [
  {
    calorie: 4000,
    money: 2400,
  },
];
