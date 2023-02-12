import * as React from "react";
import { useMemo, useState, useEffect } from "react";

import { Paper, Box, Grid, Card } from "@mui/material";
import Typography from "@mui/joy/Typography";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Link, useLocation } from "react-router-dom";

import DailyConsumptionGraph from "../../components/util/DailyConsumptionGraph";
import DrinkMenuItem from "../../components/util/DrinkMenuItem";
import CustomOption from "../../components/CustomOption";

import { cafeDrinkData, newDrinkRecord } from "../../api/order";
import axios from "axios";

function CustomPage() {
  const location = useLocation()

  // 페이지 편집용 변수쓰
  // const franchiseId = 9;
  // const drinkName = '캐모마일 블렌드 티 핫 (HOT)';
  const franchiseId = Number(location.state.finalData.franchiseId);
  const drinkName = location.state.finalData.drink.drinkName;
  const [drinkDetail, setDrinkDetail] = useState({
    storeId: 0,
    storeName: "",
    drinkResponseDtos: [
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
    optionDtos: [
      {
        id: 0,
        franchiseId: 0,
        type: "",
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
  console.log(drinkDetail)
  const basicDrink = drinkDetail.drinkResponseDtos[0]
  console.log(basicDrink)
  const [orderDetail, setOrderDetail] = useState({
    // userId: 69??? somin????
    drinkId: basicDrink.drinkId,
    regDate: "2023-02-12",
    caffeine: basicDrink.caffeine,
    sugar: basicDrink.sugar,
    cal: basicDrink.cal,
    price: basicDrink.price,
    shot: basicDrink.shot,
    whip: basicDrink.whip,
    sugarContent: "LESS",
    syrup: 0,
    vanilla: 0,
    hazelnut: 0,
    caramel: 0,
    image_url: basicDrink.img,
    memo: "",
    storeName: location.state.franchiseName,
  });

  // 기존 daily + 선택음료 데이터 계산(젤 작은 사이즈 & 노옵션)
  const withoutCustom = {
    caffeGoal: drinkDetail.dayDataDto.caffeGoal,
    caffeDaily: drinkDetail.dayDataDto.caffeDaily + basicDrink.caffeine,
    sugarGoal: drinkDetail.dayDataDto.sugarGoal,
    sugarDaily: drinkDetail.dayDataDto.sugarDaily + basicDrink.sugar,
    calDaily: drinkDetail.dayDataDto.calDaily + basicDrink.cal,
    moneyDaily: drinkDetail.dayDataDto.moneyDaily + basicDrink.price,

  }

  //커스텀 변경시 변화량 계산(orderDetail - 기존 daily)
  const [changeInfo, setChangeInfo] = useState({
    caffeine: 0,
    sugar: 0,
    money: 0,
    cal: 0,
  })

  useEffect(() => {
    setChangeInfo({
      caffeine: Math.max(orderDetail.caffeine - withoutCustom.caffeDaily, 0),
      sugar: Math.max(orderDetail.sugar - withoutCustom.sugarDaily, 0),
      money: Math.max(orderDetail.price - withoutCustom.moneyDaily, 0),
      cal: Math.max(orderDetail.cal - withoutCustom.calDaily, 0),
    })
    console.log(changeInfo)
  }, [orderDetail])


  // 영양성분에 옵션정보 반영
  const onClickOptionChangeHandler = (field, value) => {
    if (orderDetail[field] + value >= 0) {
      // 변경하는 값의 field명과 type이름이 일치하는 옵션 선언
      const updateOption = drinkDetail.optionDtos.find(option => option.type.toLowerCase() === field)

      if (updateOption.type.toLowerCase() === 'whip') {
        // 휘핑 옵션 (true면 더하고 false면 마이너스 + 기존 휘핑 상태에서 변동될때만)
        if (orderDetail.whip !== value) {
          setOrderDetail({
            ...orderDetail, 
            whip: value,
            caffeine: value ? orderDetail['caffeine'] + (value * updateOption.caffeine) : Math.max(orderDetail['caffeine'] - updateOption.caffeine, 0),
            sugar: value ? orderDetail['sugar'] + (value * updateOption.sugar) : Math.max(orderDetail['sugar'] - updateOption.sugar, 0),
            cal: value ? orderDetail['cal'] + (value * updateOption.cal) : Math.max(orderDetail['cal'] - updateOption.cal, 0),
            price: value ? orderDetail['price'] + (value * updateOption.price) : Math.max(orderDetail['price'] - updateOption.price, 0),
          });
        }
      } else {
        // 나머지 옵션
        setOrderDetail({
          ...orderDetail, 
          [field]: orderDetail[field] + value,
          caffeine: Math.max(orderDetail['caffeine'] + (value * updateOption.caffeine), 0),
          sugar: Math.max(orderDetail['sugar'] + (value * updateOption.sugar), 0),
          cal: Math.max(orderDetail['cal'] + (value * updateOption.cal), 0),
          price: Math.max(orderDetail['price'] + (value * updateOption.price), 0),
        })
      }
    }
  }
  
  // 사이즈 변경에 따른 옵션 초기화(전체 옵션 초기화(만약 남기고 싶은거 있으면 onClickOptionHandler처럼 초기값 앞에 더해줘야함))
  const onClickSizeChangeHandler = (index) => {
    setOrderDetail({
      ...orderDetail, 
      drinkId: drinkDetail.drinkResponseDtos[index].drinkId,
      caffeine: drinkDetail.drinkResponseDtos[index].caffeine,
      sugar: drinkDetail.drinkResponseDtos[index].sugar,
      cal: drinkDetail.drinkResponseDtos[index].cal,
      price: drinkDetail.drinkResponseDtos[index].price,
      shot: drinkDetail.drinkResponseDtos[index].shot,
      whip: drinkDetail.drinkResponseDtos[index].whip,
      image_url: drinkDetail.drinkResponseDtos[index].img,
      sugarContent: "BASIC",
      syrup: 0,
      vanilla: 0,
      hazelnut: 0,
      caramel: 0,
    })
  }

  // 당도 어카냐........사이즈 기준 커스텀 전 당 + 휘핑시럽등 당 들어가는 애들 현재 다 더해서 0.5, 1, 1.5 리턴해야하나?
  // const onclickSugarContentHandler = (sugarType) => {
  //   const nowSize = drinkDetail.drinkResponseDtos.find(drink => drink.drinkId === orderDetail.drinkId)
  //   setOrderDetail({
  //     ...orderDetail,
  //     sugar: nowSize.sugar + '기존 당 옵션별 당 데이터 다 더한 값................'
  //   })
  // }


  useMemo(() => {
    console.log(franchiseId)
    console.log(drinkName)
    console.log(franchiseId === 9)
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

    // useEffect(() => {
    //   setOrderDetail()
    // },[setDrinkDetail])

  console.log(drinkDetail);
  console.log(orderDetail)

  // 기록 등록 axios
  const addDrinkRecord = async () => {
    await newDrinkRecord(
      orderDetail,
      (res) => {console.log(res)},
      (err) => {console.log(err)},
    )
      .then(function (response) {
        console.log(response, "성공");
      })
      .catch(function (err) {
        console.log(err);
      });
  };

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
              <Item sx={{ fontWeight: "700" }}>{location.state.finalData.franchiseName}</Item>
            </Grid>
            <Grid item xs={4}>
              <Item style={{ fontWeight: "700" }}>{location.state.finalData.branch ? location.state.finalData.branch : '-'}</Item>
            </Grid>
            <Grid item xs={12}>
              <DrinkMenuItem data={location.state.finalData}/>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      {/* 현황 */}
      <Card>
        <DailyConsumptionGraph
          selectDrinkInfo={changeInfo}
          consumptionInfo={withoutCustom}
        />
      </Card>

      <CustomOption drinkDetail={drinkDetail} orderDetail={orderDetail} 
        onClickOptionChangeHandler={onClickOptionChangeHandler}
        onClickSizeChangeHandler={onClickSizeChangeHandler}
        // onclickSugarContentHandler={onclickSugarContentHandler}
        />

      <Grid item>
        <Button onClick={addDrinkRecord}>
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
