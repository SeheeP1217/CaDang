import React, { useMemo, useState, useEffect } from "react"
import { Container } from "@mui/material"
import MyCalendar from "./MyCalendar"
import MonthAmount from "./MonthAmont"
import MonthRank from "./MonthRank"

import { dataMonth } from "../api/report"
import { useRecoilValue } from "recoil"
import { todayDate } from "../recoil/atom/user"

export default function MonthlyReportData() {
  const date = useRecoilValue(todayDate)
  const [month, setMonth] = useState({
    monthDataList: [
      {
        date: "2023-02-10",
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
  // console.log("monthDataList", monthDataList)

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <MyCalendar monthDataList={monthDataList} />
        <MonthAmount />
        <MonthRank />
      </Container>
    </div>
  )
}
