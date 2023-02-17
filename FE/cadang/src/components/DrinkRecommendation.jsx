import { Button, Card, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import drink from "../assets/drink.png";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userId, todayDate } from "../recoil/atom/user.jsx";
import { recommendDrinks } from "../api/main";

function DrinkRecommendation() {
  const [list, setList] = useState([]);
  const [cafe, setCafe] = useState([""]);
  const [load, setLoad] = useState(false);
  const container = [];
  const [today, setToday] = useRecoilState(todayDate);
  const [drinkItem, setDrinkItem] = useState({
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
    vol: null,
    whip: null,
    storeName: "",
  });
  // console.log(drinkItem);
  const [drinkList, setDrinkList] = useState({
    drink: [
      {
        drinkId: 0,
        franchiseId: "",
        drinkName: "",
        img: "",
        caffeine: 0,
        sugar: 0,
        cal: 0,
        price: 0,
        storeName: "",
      },
    ],
  });
  const dateString = useRecoilValue(todayDate);
  // const [loc, setLoc] = useState([]);

  const getRandomIndex = function (length) {
    const idx = parseInt(Math.random() * length);
    return drinkList[idx];
  };

  const onChangeDrink = (event) => {
    // console.log("음료 새로 추천 !!!!!!!!!");
    const item = getRandomIndex(drinkList.length);
    // console.log(item);
    setDrinkItem(item);
  };

  const onChange = (event) => {
    // console.log("위치 업데이트!!!!!!!");

    // Get the user's current location
    //     navigator.geolocation.getCurrentPosition(position => {
    //     setLocation({
    //       lat: position.coords.latitude,
    //       lng: position.coords.longitude
    //     });
    //   });
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

    // console.log(list);
    // console.log("---------------");

    // 음료 추천 통신 api 사용

    const getDrinks = async () => {
      await recommendDrinks(
        cafe,
        dateString,
        (res) => {
          // console.log("=======!!!!!!!!!!!!!!=========");
          // console.log(res.data);
          return res.data;
        },
        (err) => console.log(err)
      ).then((data) => setDrinkList(data));
    };

    getDrinks();
    // console.log("drinkList" + drinkList);
    const item = getRandomIndex(drinkList.length);
    // console.log(item);
    setDrinkItem(item);
    setLoad(true);
    // console.log(dateString);
  };

  useEffect(() => {
    // 1. 현재 날짜 세팅
    setToday(dateString);
    // console.log(today);

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

    // console.log(list);
    // console.log("---------------");

    // 음료 추천 통신 api 사용

    const getDrinks = async () => {
      await recommendDrinks(
        cafe,
        dateString,
        (res) => {
          // console.log("=======!!!!!!!!!!!!!!=========");
          // console.log(res.data);
          return res.data;
        },
        (err) => console.log(err)
      ).then((data) => setDrinkList(data));
    };

    getDrinks();
    // console.log("drinkList" + drinkList);
    const item = getRandomIndex(drinkList.length);
    // console.log(item);
    setDrinkItem(item);
    setLoad(true);
    setToday(dateString);
  }, []);

  useEffect(() => {
    function settingCafe() {
      const temp = list[0];

      if (temp !== undefined) {
        // temp.map((element, i) => console.log(temp[i].place_name));
      }
      if (temp !== undefined) {
        temp.map((element, i) => container.push(element.place_name));
      }
      setCafe([...container]);
      // if (temp !== undefined)
      //   temp.map((element, i) => setCafe([...cafe, temp[i].place_name]));
    }

    settingCafe();
    // console.log(list);
  }, [list]);

  useEffect(() => {
    // console.log("**************서버로 보내는 카페 리스트 : "+cafe);

    const getDrinks = async () => {
      await recommendDrinks(
        cafe,
        dateString,
        (res) => {
          if (res.data !== undefined) {
            // console.log(res.data);
            // setDrinkList(data);
            // res.data.map((element,i) => drinkList.push(element));
          }
          return res.data;
        },
        (err) => console.log(err)
      ).then((data) => setDrinkList(data));
    };

    getDrinks();
  }, [cafe]);

  useEffect(() => {
    // console.log("===drinkList: " + drinkList);

    const item = getRandomIndex(drinkList.length);
    // console.log(item);
    setDrinkItem(item);
  }, [drinkList]);

  return (
    <div>
      <Card>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Button size="small" onClick={onChange}>
            위치 업데이트
          </Button>
        </Grid>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Grid item xs={12}>
            {drinkItem !== undefined && <Typography>{drinkItem.storeName}</Typography>}
          </Grid>
          <Grid item xs={12}>
            {drinkItem !== undefined && (
              <Typography>오늘은 {drinkItem.drinkName} 어떨까요?</Typography>
            )}
          </Grid>
          <Grid item xs={4}>
            {drinkItem !== undefined && (
              <Button onClick={onChangeDrink}>
                <img alt="menuImg" src={drinkItem.img} style={{ objectFit: "fill" }} width="100" />
              </Button>
            )}
          </Grid>
          <Grid item xs={4}>
            {drinkItem !== undefined && <Typography>{drinkItem.caffeine}mg</Typography>}
            {drinkItem !== undefined && <Typography>{drinkItem.sugar}g</Typography>}
            {drinkItem !== undefined && <Typography>{drinkItem.cal}Kcal</Typography>}
            {drinkItem !== undefined && <Typography>{drinkItem.price}원</Typography>}
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
            fontFamily: 'netmarble',
          }}
        >
          <Link to={{ pathname: `/payment/custom`, state: { drinkItem } }}>
            <Button size="small" style={{textDecoration: 'none', fontStyle: 'netmarble'}}>주문하러 가기</Button>
          </Link>
        </Grid>
      </Card>
    </div>
  );
}

export default DrinkRecommendation;
