import React, { useMemo, useState, useEffect } from "react"
import { Box, Card } from "@mui/material"
import Button from "@mui/material-next/Button"
import Typography from "@mui/joy/Typography"
import FabButton from "../../components/util/FabButton"
import { Link } from "react-router-dom"

import DailyConsumptionGraph from "../../components/util/DailyConsumptionGraph"
import ItemFiltering from "../../components/util/ItemFiltering"

import { cafeDrinkList } from "../../api/order"
import { useRecoilValue } from "recoil"
import { todayDate } from "../../recoil/atom/user"


function SelectMenuPage() {
  const date = useRecoilValue(todayDate)
  const storeName = "스타벅스 역삼대로점"

  // const [possible, setPossible] = useState([])
  // const [impossible, setImpossible] = useState([])
  // const [all, setAll] = useState([])

  const [menu, setMenu] = useState({
    drinkableDrinks: [
      {
        drinkId: 0,
        drinkName: "",
        size: "",
        vol: 0,
        img: "",
        caffeine: 0,
        sugar: 0,
        cal: 0,
        price: 0,
        shot: 0,
        whip: true,
        franchiseId: 0,
        storeName: "",
        cnt: 0,
      },
    ],
    allDrinks: [
      {
        drinkId: 0,
        drinkName: "",
        size: "",
        vol: 0,
        img: "",
        caffeine: 0,
        sugar: 0,
        cal: 0,
        price: 0,
        shot: 0,
        whip: true,
        franchiseId: 0,
        storeName: "",
        cnt: 0,
      },
    ],
    dayDataDto: {
      id: 0,
      userId: 0,
      date: "2023-02-09",
      caffeGoal: 0,
      sugarGoal: 0,
      caffeDaily: 0,
      sugarDaily: 0,
      calDaily: 0,
      moneyDaily: 0,
      caffeSuccess: true,
      sugarSuccess: true,
    },
    franchiseId: 0,
    storeId: 0,
    storeName: "",
  })

  useEffect(() => {
    const getMenus = async () => {
      await cafeDrinkList(
        date,
        storeName,
        (res) => {
          console.log("Response was successful:", res.data)
          setMenu(res.data)
        },
        (err) => {
          console.log(err)
        }
      )
    }

    getMenus()
  }, [])
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", menu)

  useEffect(() => {
    console.log(menu.drinkableDrinks)
  }, [menu])

  console.log("/////////-------/////////", menu)

  return (
    <body>
      <div style={{ position: "sticky", top: 0, zIndex: 1 }}>
        <Box sx={{ backgroundColor: "#F9F6F2", paddingY: 0.3 }}>
          <Typography level="h3" fontSize="xl" fontWeight="xl">
            메뉴선택
          </Typography>
          <Box sx={{ flexGrow: 1 }} textAlign="center">
            <Card>
              {storeName} / 320m
              <Button>상세 페이지</Button>
            </Card>
          </Box>
          <Card>
            <DailyConsumptionGraph/>
          </Card>
          <Card sx={{ marginY: 2 }}>
            {/* <DailyConsumptionGraph data={afterSelectData} /> */}
          </Card>
          <ItemFiltering menu={menu} />
        </Box>
      </div>
      {/* {drinkItem !== undefined && <Typography>{drinkItem.caffeine}mg</Typography>} */}

      <Link to="/custom">
        <FabButton />
      </Link>
    </body>
  )
}

const afterSelectData = [
  {
    name: "카페인",
    consumption: 2400,
    change: 4000,
  },
  {
    name: "당",
    consumption: 1398,
    change: 3000,
  },
]

const menuData = [
  { pk: 1, name: "카페라떼", caffeine: 300, sugar: 10, cal: 350, price: 2500 },
  {
    pk: 2,
    name: "바닐라 라떼",
    caffeine: 200,
    sugar: 20,
    cal: 400,
    price: 5000,
  },
  {
    pk: 3,
    name: "아이스 아메리카노",
    caffeine: 100,
    sugar: 30,
    cal: 300,
    price: 3500,
  },
]

export default SelectMenuPage
