import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import OrderStatus from "../components/OrderStatus";
import DrinkRecommendation from "../components/DrinkRecommendation";
import DailyConsumptionGraph from "../components/util/DailyConsumptionGraph";
import DailyOtherInfo from "../components/DailyOtherInfo";
import { Card } from "@mui/material";
import Typography from "@mui/joy/Typography";
import { useRecoilState, useRecoilValue } from "recoil";
import { userId, todayDate } from "../recoil/atom/user.jsx";
import { recommendDrinks } from "../api/main";

export default function MainPage() {
  const [load, setLoad] = useState(false);
  const [today, setToday] = useRecoilState(todayDate);
  const [location, setLocation] = useState({});

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

  const [list, setList] = useState([]);
  const [cafe, setCafe] = useState([""]);
  const container = [];
  const [drinkList, setDrinkList] = useState({ drink: [{
    drinkId: 0,
    franchiseId: "",
    drinkName: "",
    img: "",
    caffeine: 0,
    sugar: 0,
    cal: 0,
    price: 0,
    storeName: "",
  }]});

  const [drink, setDrink] = useState({ 
    drinkId: 0,
    franchiseId: "",
    drinkName: "",
    img: "",
    caffeine: 0,
    sugar: 0,
    cal: 0,
    price: 0,
    shot: null,
    size: null,
    vol:null,
    whip:null,
    storeName: "",
  })

  const getRandomIndex = function(length) {
    const idx = parseInt(Math.random() * length);
    return drinkList[idx];
  };

  // 첫 화면이 랜더링 되기 전
  useMemo(() => {
    // // 1. 현재 날짜 세팅
    // setToday(dateString);

    // console.log(today);

    // axios
    //   .get(
    //     `https://dapi.kakao.com/v2/local/search/category.json?category_group_code=CE7&page=1&size=15&sort=accuracy&x=127.03983097807087&y=37.50153289264357&radius=300`,
    //     {
    //       headers: { Authorization: `KakaoAK ${process.env.REACT_APP_REST_API_KEY}` },
    //     }
    //   )
    //   .then((res) => {
    //     const cafe = res.data.documents;
    //     // console.log(cafe);
    //     setList([...list, cafe]);
    //   });

    // console.log(list);
    // console.log("---------------");

    // // 음료 추천 통신 api 사용

    // const getDrinks = async () => {
    //   await recommendDrinks(
    //     cafe,
    //     dateString,
    //     2,
    //     (res) => {
    //       console.log(res.data);
    //       return res.data;
    //     },
    //     (err) => console.log(err)
    //   ).then((data) => setDrinkList(data));
    // };

    // getDrinks();
    // console.log(drinkList);
    // const item = getRandomIndex(drinkList.length);
    // console.log(item);
    // setDrink(item);


  }, []);

  useEffect(() => {
    // 1. 현재 날짜 세팅
    setToday(dateString);
    console.log(today);

    axios
      .get(
        `https://dapi.kakao.com/v2/local/search/category.json?category_group_code=CE7&page=1&size=15&sort=accuracy&x=127.03983097807087&y=37.50153289264357&radius=300`,
        {
          headers: { Authorization: `KakaoAK ${process.env.REACT_APP_REST_API_KEY}` },
        }
      )
      .then((res) => {
        const cafe = res.data.documents;
        // console.log(cafe);
        setList([...list, cafe]);
      });

    console.log(list);
    console.log("---------------");

    // 음료 추천 통신 api 사용

    const getDrinks = async () => {
      await recommendDrinks(
        cafe,
        dateString,
        2,
        (res) => {
          console.log("=======!!!!!!!!!!!!!!=========");
          console.log(res.data);
          return res.data;
        },
        (err) => console.log(err)
      ).then((data) => setDrinkList(data));
    };

    getDrinks();
    console.log("drinkList"+drinkList);
    const item = getRandomIndex(drinkList.length);
    console.log(item);
    setDrink(item);
    setLoad(true);
    setToday(dateString);
  },[]);

  useEffect(() => {
    function settingCafe() {
      const temp = list[0];
      console.log(temp);
      if (temp !== undefined) temp.map((element, i) => console.log(temp[i].place_name));

      if (temp !== undefined) temp.map((element, i) => container.push(element.place_name));

      setCafe([...container]);
      // if (temp !== undefined)
      //   temp.map((element, i) => setCafe([...cafe, temp[i].place_name]));
    }

    settingCafe();
  }, [list]);

  useEffect(() => {
    console.log(dateString);

    // 음료 추천 통신 api 사용

    const getDrinks = async () => {
      await recommendDrinks(
        cafe,
        dateString,
        2,
        (res) => {
          if(res.data !== undefined) {
            console.log(res.data);
            // setDrinkList(data);
            // res.data.map((element,i) => drinkList.push(element));
          }
          return res.data
        },
        (err) => console.log(err)
      ).then((data) => setDrinkList(data));
    };

    getDrinks();
    
  }, [cafe]);

  useEffect(() => {
    console.log(drinkList);
    // 음료 추천 : 서버로부터 받은 20개의 리스트 랜덤하게 1개의 데이터
    // 뽑아서 사용
    const item = getRandomIndex(drinkList.length);
    console.log(item);
    setDrink(item);
  }, [drinkList]);

  useEffect(() => {
    console.log("화면 랜더링");
    setLoad(true);
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
      { drink !== undefined &&
      <Box sx={{ mt: 1 }}>
        <DrinkRecommendation drink={drink} drinkList={drinkList} />
      </Box>
}
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
