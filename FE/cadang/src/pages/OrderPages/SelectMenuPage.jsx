import React, { useEffect, useState } from "react"
import { Box, Card } from "@mui/material"
import Button from "@mui/material-next/Button"
import Typography from "@mui/joy/Typography"
import FabButton from "../../components/util/FabButton"
import { Link } from "react-router-dom";

import DailyConsumptionGraph from "../../components/util/DailyConsumptionGraph"
import ItemFiltering from "../../components/util/ItemFiltering"

function SelectMenuPage() {
  return (
    <body>
      <div style={{ position: "sticky", top: 0, zIndex: 1 }}>
        <Box sx={{ backgroundColor: "#F9F6F2", paddingY: 0.3 }}>
          <Typography level="h3" fontSize="xl" fontWeight="xl">
            메뉴선택
          </Typography>
          <Box sx={{ flexGrow: 1 }} textAlign="center">
            <Card>
              스타벅스 강남점 / 320m
              <Button>상세 페이지</Button>
            </Card>
          </Box>
          <Card sx={{ marginY: 2 }}>
            <DailyConsumptionGraph data={afterSelectData} />
          </Card>
        </Box>
      </div>
      <ItemFiltering data={menuData} />
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
