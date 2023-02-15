import React, { useMemo, useState, useEffect } from "react"
import { Container } from "@mui/material"
import MyCalendar from "./MyCalendar"
import MonthAmount from "./MonthAmont"
import MonthRank from "./MonthRank"

import { dataMonth } from "../api/report"
import dayjs from "dayjs"

export default function MonthlyReportData() {
  const date = dayjs(new Date()).format("YYYY-MM-DD")

  const [month, setMonth] = useState({
    monthDataList: [
      {
        date: "",
        caffeDaily: 0,
        sugarDaily: 0,
        caffeSuccess: true,
        sugarSuccess: true,
      },
    ],
    hasPrevious: true,
    hasNext: true,
    totalPrice: 0,
    favRanking: ["string"],
    caffeRanking: ["string"],
    sugarRanking: ["string"],
  })
  useEffect(() => {
    const getMonths = async () => {
      await dataMonth(
        date,
        (res) => {
          // console.log("Response was successful:", res.data)
          setMonth(res.data)
        },
        (err) => {
          console.log(err)
        }
      )
    }

    getMonths()
  }, [])
  // useEffect(() => {
  //   console.log("month", month)
  // })

  const monthDataList = month.monthDataList
  const favRanking = month.favRanking
  const sugarRanking = month.sugarRanking
  const caffeRanking = month.caffeRanking
  const totalPrice = month.totalPrice
  console.log(month, "aaaaaaaaaaa")

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <MyCalendar monthDataList={monthDataList} />
        <MonthAmount totalPrice={totalPrice} />
        <MonthRank
          favRanking={favRanking}
          sugarRanking={sugarRanking}
          caffeRanking={caffeRanking}
        />
      </Container>
    </div>
  )
}
