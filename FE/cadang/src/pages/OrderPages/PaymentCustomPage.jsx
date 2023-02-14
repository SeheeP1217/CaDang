import * as React from "react";
import { useMemo, useState, useEffect } from "react";

import { Paper, Box, Grid, Card } from "@mui/material";
import Typography from "@mui/joy/Typography";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Link, useLocation, useHistory } from "react-router-dom";
import dayjs from "dayjs";

import DailyConsumptionGraph from "../../components/util/DailyConsumptionGraph";
import PaymentCustomDrinkMenuItem from "../../components/util/PaymentCustomDrinkMenuItem";
import CustomOption from "../../components/CustomOption";

import { cafeDrinkData, newDrinkRecord } from "../../api/order";
import DailyOtherInfo from "../../components/DailyOtherInfo";

function PaymentCustomPage(props) {
  const location = useLocation()
  const history = useHistory()
  const drinkItem = props.location.state.drinkItem
  const franchiseId = props.location.state.drinkItem.franchiseId;
  const drinkName = props.location.state.drinkItem.drinkName;
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
  const basicDrink = drinkDetail.drinkResponseDtos[0]
  const [changedOtherInfo, setChangedOtherInfo] = useState({
    money: 0,
    cal: 0,
  })
  const [orderDetail, setOrderDetail] = useState({
    drinkId: basicDrink.drinkId,
    regDate: dayjs().format("YYYY-MM-DD"),
    caffeine: basicDrink.caffeine,
    sugar: basicDrink.sugar,
    cal: basicDrink.cal,
    price: basicDrink.price,
    shot: basicDrink.shot,
    whip: basicDrink.whip,
    sugarContent: "BASIC",
    syrup: 0,
    vanilla: 0,
    hazelnut: 0,
    caramel: 0,
    memo: "",
    storeName: location.state.franchiseName,
  });

  // 선택한 음료 정보로 orderDetail 초기화
  useEffect(() => {
    setOrderDetail({
      ...orderDetail, 
      drinkId: basicDrink.drinkId,
      caffeine: basicDrink.caffeine,
      sugar: basicDrink.sugar,
      cal: basicDrink.cal,
      price: basicDrink.price,
      shot: basicDrink.shot,
      whip: basicDrink.whip,
      sugarContent: "BASIC",
      storeName: location.state.franchiseName,
    });
  }, [basicDrink])

  // 전체 가격, 칼로리 변동량 계산
  useEffect(() => {
    setChangedOtherInfo({
      money: orderDetail.price,
      cal: orderDetail.cal,
    });
  }, [orderDetail])

  // 기존 daily + 선택음료 데이터 계산(젤 작은 사이즈 & 노옵션)
  const withoutCustom = {
    caffeGoal: drinkDetail.dayDataDto.caffeGoal,
    caffeDaily: drinkDetail.dayDataDto.caffeDaily + basicDrink.caffeine,
    sugarGoal: drinkDetail.dayDataDto.sugarGoal,
    sugarDaily: drinkDetail.dayDataDto.sugarDaily + basicDrink.sugar,
    calDaily: drinkDetail.dayDataDto.calDaily + basicDrink.cal,
    moneyDaily: drinkDetail.dayDataDto.moneyDaily + basicDrink.price,

  }

  //커스텀 변경시 변화량 계산
  const [changeInfo, setChangeInfo] = useState({
    caffeine: 0,
    sugar: 0,
    money: 0,
    cal: 0,
  })

  // 섭취일(날짜) 변경 반영
  const getRecordDate = (newValue) => {
    setOrderDetail({
      ...orderDetail, 
      regDate: newValue,
    })
  };

  // 영양성분에 옵션정보 반영
  const onClickOptionChangeHandler = (field, value) => {
    console.log(field, value)
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
      sugarContent: "BASIC",
      syrup: 0,
      vanilla: 0,
      hazelnut: 0,
      caramel: 0,
    })
  }

  // 당도 어카냐........사이즈 기준 커스텀 전 당 + 휘핑시럽등 당 들어가는 애들 현재 다 더해서 0.5, 1, 1.5 리턴해야하나?
  const onclickSugarContentHandler = (type, value) => {
    const nowSize = drinkDetail.drinkResponseDtos.find(drink => drink.drinkId === orderDetail.drinkId)
    const whipOption = drinkDetail.optionDtos.find(option => option.type.toLowerCase() === 'whip')
    const syrupOption = drinkDetail.optionDtos.find(option => option.type.toLowerCase() === 'syrup')
    const vanillaOption = drinkDetail.optionDtos.find(option => option.type.toLowerCase() === 'vanilla')
    const hazelnutOption = drinkDetail.optionDtos.find(option => option.type.toLowerCase() === 'hazelnut')
    const caramelOption = drinkDetail.optionDtos.find(option => option.type.toLowerCase() === 'caramel')
    const standardSugar = (nowSize.sugar 
    + (whipOption.sugar * orderDetail.whip) 
    + (syrupOption.sugar * orderDetail.syrup) 
    + (vanillaOption.sugar * orderDetail.vanilla) 
    + (hazelnutOption.sugar * orderDetail.hazelnut) 
    + (caramelOption.sugar * orderDetail.caramel) )
    setOrderDetail({
      ...orderDetail,
      sugar: standardSugar * value,
      sugarContent: type,
    })
  }

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

  console.log(orderDetail)
  console.log(withoutCustom)

  // 커스텀 데이터에 따른 변화량 계산(샷 빼는 경우 마이너스 될수도 있으므로 Math.max 하면 안됨)
  useEffect(() => {
    setChangeInfo({
      caffeine: orderDetail.caffeine - basicDrink.caffeine,
      sugar: orderDetail.sugar - basicDrink.sugar,
      money: orderDetail.price - basicDrink.price,
      cal: orderDetail.cal - basicDrink.cal,
    })
  }, [orderDetail])
  

  // 기록 등록 axios
  const addDrinkRecord = async () => {
    await newDrinkRecord(
      orderDetail,
      (res) => {console.log(res);
      return res},
      (err) => {console.log(err)},
    )
      .then((response) => {
        console.log(response)
        if (response.status === 200) {
          history.push("/mypage")
        }
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
              <Item sx={{ fontWeight: "700" }}>{location.state.drinkItem.storeName}</Item>
            </Grid>
            <Grid item xs={4}>
              <Item style={{ fontWeight: "700" }}>{location.state.drinkItem.branch ? location.state.drinkItem.branch : '-'}</Item>
            </Grid>
            <Grid item xs={12}>
              <PaymentCustomDrinkMenuItem data={drinkItem} getRecordDate={getRecordDate}/>
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
        <DailyOtherInfo data={drinkDetail.dayDataDto} changedOtherInfo={changedOtherInfo}></DailyOtherInfo>
      </Card>

      <CustomOption drinkDetail={drinkDetail} orderDetail={orderDetail} 
        onClickOptionChangeHandler={onClickOptionChangeHandler}
        onClickSizeChangeHandler={onClickSizeChangeHandler}
        onclickSugarContentHandler={onclickSugarContentHandler}
        />

      <Grid item>
        <Link style={{textDecoration:'none'}} to={{ pathname: `/payment`, 
        // state={'결제페이지에 필요한 데이터를 모아모아 내려주면 됩니다'} 
        }}>
        <Button variant="contained"
          sx={{
            borderRadius: 2,
            background: "#ffba00",
            fontSize: 16,
            fontWeight: "700",
            mt: 1,
            ml: 26,
          }}>
          주문하기
        </Button>
        </Link>
      </Grid>
    </div>
  );
}


export default PaymentCustomPage;
