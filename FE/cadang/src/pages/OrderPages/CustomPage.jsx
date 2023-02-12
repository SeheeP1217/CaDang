import * as React from "react";
import { useMemo, useState } from "react";

import { Paper, Box, Grid, Card } from "@mui/material";
import Typography from "@mui/joy/Typography";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import DailyConsumptionGraph from "../../components/util/DailyConsumptionGraph";
import DrinkMenuItem from "../../components/util/DrinkMenuItem";
import CustomOption from "../../components/CustomOption";

import { cafeDrinkData } from "../../api/order";

function CustomPage() {
  const franchiseId = 9
  const drinkName = "카페 아메리카노 (ICE)"
  const beforeDrinkDto = drinkDetail.dayDataDto
  const updateDayDataDto = {
    id: beforeDrinkDto.id,
    userId: beforeDrinkDto.userId,
    date: beforeDrinkDto.date,
    caffeGoal: beforeDrinkDto.caffeGoal,
    sugarGoal: beforeDrinkDto.sugarGoal,
    caffeDaily: beforeDrinkDto.caffeDaily,
    sugarDaily: beforeDrinkDto.sugarDaily,
    calDaily: beforeDrinkDto.calDaily,
    moneyDaily: beforeDrinkDto.moneyDaily,
    caffeSuccess: true,
    sugarSuccess: true,
  }

  const [drinkDetail, setDrinkDetail] = useState({
    storeId: null,
    storeName: null,
    drinkResponseDtos: [],
    optionDtos: [
      {
        id: -1,
        franchiseId: -1,
        type: "Whip",
        caffeine: 0,
        sugar: 0,
        price: 0,
        cal: 0,
      },
      {
        id: 0,
        franchiseId: 0,
        type: "Shot",
        caffeine: 0,
        sugar: 0,
        price: 0,
        cal: 0,
      },
      {
        id: 0,
        franchiseId: 0,
        type: "Syrup",
        caffeine: 0,
        sugar: 0,
        price: 0,
        cal: 0,
      },
      {
        id: 0,
        franchiseId: 0,
        type: "HazelnutSyrup",
        caffeine: 0,
        sugar: 0,
        price: 0,
        cal: 0,
      },
      {
        id: 0,
        franchiseId: 0,
        type: "VanillaSyrup",
        caffeine: 0,
        sugar: 0,
        price: 0,
        cal: 0,
      },
      {
        id: 0,
        franchiseId: 0,
        type: "CaramelSyrup",
        caffeine: 0,
        sugar: 0,
        price: 0,
        cal: 0,
      },
    ],
    dayDataDto: {
      id: 0,
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
    },
  });

  useMemo(() => {
    const getCustomData = async () => {
      await cafeDrinkData(
        franchiseId,
        drinkName,
        (res) => {
          return res.data;
        },
        (err) => console.log(err)
      ).then((data) => setDrinkDetail(data));
    };
    getCustomData();
  }, []);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: "000000",
  }));

  return (
    <div>
      <Typography level="h3" fontSize="xl" fontWeight="xl">
        Custom
      </Typography>
      <Grid container>
        <Box sx={{ flexGrow: 1 }} marginTop={1}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Item sx={{ fontWeight: "700" }}>스타벅스</Item>
            </Grid>
            <Grid item xs={4}>
              <Item style={{ fontWeight: "700" }}>강남점</Item>
            </Grid>
            <Grid item xs={12}>
              <DrinkMenuItem data={drinkDetail.dayDataDto} />
            </Grid>
          </Grid>
        </Box>
      </Grid>
      {/* 현황 */}
      <Card>
        {/* <DailyConsumptionGraph
          selectDrinkInfo={selectDrinkInfo}
          consumptionInfo={consumptionInfo}
        /> */}
      </Card>

      <CustomOption />

      <Grid item>
        <Button component={Link} to="/payment" fullWidth={true}>
          주문하기
        </Button>
      </Grid>
    </div>
  );
}

const data = [
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
];

const menuData = [
  { pk: 1, name: "카페라떼", caffeine: 250, sugar: 30, cal: 350, price: 2500 },
];

export default CustomPage;
