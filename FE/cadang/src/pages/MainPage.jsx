import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import OrderStatus from "../components/OrderStatus";
import DrinkRecommendation from "../components/DrinkRecommendation";
import MainDailyConsumptionGraph from "../components/util/MainDailyConsumptionGraph";
import DailyOtherInfo from "../components/DailyOtherInfo";
import { Card } from "@mui/material";
import Typography from "@mui/joy/Typography";
import { useRecoilState, useRecoilValue } from "recoil";
import { userId, todayDate } from "../recoil/atom/user.jsx";
import { todayDashboard } from "../api/main";
import TodayChart from "../components/TodayChart"

export default function MainPage() {
  const [load, setLoad] = useState(false);
  const [today, setToday] = useRecoilState(todayDate);
  const [dashboard, setDashboard] = useState({
    userId: 0,
    date: "",
    caffeGoal: 0,
    sugarGoal: 0,
    caffeDaily: 0,
    sugarDaily: 0,
    calDaily: 0,
    moneyDaily: 0,
    caffeSuccess: true,
    sugarSuccess: true,
  });

  const data = [
    {
      name: "카페인",
      consumption: 2400,
    },
    {
      name: "당",
      consumption: 1398,
    },
  ];

  // 로그인 한 사용자 아이디
  // const id = useRecoilValue(userId);

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

  // 첫 화면이 랜더링 되기 전
  useMemo(() => {
    
    const getDashboard = async () => {
      await todayDashboard(
        dateString,
        (res) => {
          console.log("!!!!===== "+res.data);
          return res.data;
        },
        (err) => console.log(err)
      ).then((data) => setDashboard(data));
    };
    getDashboard();
  }, []);

  useEffect(() => {
    console.log(dashboard);
  }, [dashboard]);

  useEffect(() => {
    console.log("화면 랜더링");
    console.log(today);
    setLoad(true);
    // setToday(dateString);
  }, []);

  return (
    <Box sx={{ mt: 3 }}>
      <Typography level="h3" fontSize="xl" fontWeight="xl">
        오늘의 현황
      </Typography>
      <Card>
        {/* <TodayChart/> */}
        <MainDailyConsumptionGraph data={data} />
        <DailyOtherInfo money={dashboard.moneyDaily} kcal={dashboard.calDaily} />
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

