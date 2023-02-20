import React, { useState, useEffect, useMemo } from "react"
import axios from "axios"
import Box from "@mui/material/Box"
import OrderStatus from "../components/OrderStatus"
import DrinkRecommendation from "../components/DrinkRecommendation"
import MainDailyConsumptionGraph from "../components/util/MainDailyConsumptionGraph"
import MainDailyOtherInfo from "../components/MainDailyOtherInfo"
import { Card } from "@mui/material"
import Typography from "@mui/joy/Typography"
import { useRecoilState, useRecoilValue } from "recoil"
import { userId, todayDate } from "../recoil/atom/user.jsx"
import { todayDashboard } from "../api/main"
import styled from "styled-components"

export default function MainPage() {
  const [load, setLoad] = useState(false)
  const [today, setToday] = useRecoilState(todayDate)
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
  })

  // 오늘의 현황 GET 요청 후 받아온 res.data.userId 세팅
  const [id, setId] = useRecoilState(userId)

  //Get the user's current location
  // navigator.geolocation.getCurrentPosition((position) => {
  //   setLocation({
  //     lat: position.coords.latitude,
  //     lng: position.coords.longitude,
  //   });
  // });
  // 현재 날짜 세팅
  const date = new Date()
  const year = date.getFullYear()
  const month = ("0" + (date.getMonth() + 1)).slice(-2)
  const day = ("0" + date.getDate()).slice(-2)

  // 현재 날짜 string으로 변환
  const dateString = year + "-" + month + "-" + day

  // 첫 화면이 랜더링 되기 전
  useMemo(() => {
    const getDashboard = async () => {
      await todayDashboard(
        dateString,
        (res) => {
          // console.log("!!!!===== " + res.data)
          return res.data
        },
        (err) => console.log(err)
      ).then((data) => {
        setDashboard(data)
        setId((id) => data.userId)
      })
    }
    getDashboard()
  }, [])

  useEffect(() => {
    // console.log(dashboard);
    // console.log("메인화면 오늘의 현황 get 통신 후 받아온 userId : " + id)
  }, [dashboard])

  useEffect(() => {}, [])

  useEffect(() => {
    // console.log("화면 랜더링");
    // console.log(today);
    setLoad(true)
    // setToday(dateString);
  }, [])

  return (
    <Box sx={{ mt: 0 }}>
      <TitleBox>
        <Typography level="h3" fontSize="22px" fontWeight="xl">
          오늘의 현황
        </Typography>
      </TitleBox>
      <Card sx={{ mt: 1 }}>
        {/* <TodayChart/> */}
        <MainDailyConsumptionGraph data={dashboard} />
        <MainDailyOtherInfo data={dashboard} />
      </Card>
      <OrderStatus userId={id} />
      <TitleBox>
        <Typography level="h3" fontSize="22px" fontWeight="xl" marginTop="5px">
          음료 추천
        </Typography>
      </TitleBox>
      <Box sx={{ mt: 1 }}>
        <DrinkRecommendation />
      </Box>
    </Box>
  )
}

const TitleBox = styled(Box)`
  margin-top: 2px;
  margin-left: 1px;
  padding-top: 1px;
  paddign-top: 2px;
  border-bottom: 2px solid #ffab00 !important;
`
