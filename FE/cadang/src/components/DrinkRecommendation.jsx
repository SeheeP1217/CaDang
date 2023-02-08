import { Button, Card, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import drink from "../assets/drink.png";
import axios from "axios";
import React, { useEffect, useState } from "react";

function DrinkRecommendation(props) {
  const [list, setList] = useState([]);
  const [cafe, setCafe] = useState([""]);
  const [load, setLoad] = useState(false);
  const container = [];
  const drinkItem = props.drink;
  console.log(drinkItem);
  // const [loc, setLoc] = useState([]);

  const getRandomIndex = function(length) {
    return parseInt(Math.random() * length)
  };

  const onChange = (event) => {
    console.log("위치 업데이트!!!!!!!");

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

    console.log(list);
  };

  useEffect(() => {
    setLoad(true);
  },[]);

  useEffect(() => {

    function settingCafe() {
      const temp = list[0];

      if (temp !== undefined) temp.map((element, i) => console.log(temp[i].place_name));

      if (temp !== undefined) temp.map((element, i) => container.push(element.place_name));

      setCafe([...container]);
      // if (temp !== undefined)
      //   temp.map((element, i) => setCafe([...cafe, temp[i].place_name]));
    }

    settingCafe();
  }, [list]);

  useEffect(() => {
    console.log(cafe);
  }, [cafe]);

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
          <Grid item>
            <Typography>{drinkItem.storeName}</Typography>
          </Grid>
          <Grid item>
            <Typography>오늘은 {drinkItem.drinkName} 어떨까요?</Typography>
          </Grid>

          <Grid item xs={4}>
            <Button>
              <img alt="menuImg" src={drinkItem.img} width="100%" />
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Typography>{drinkItem.caffeine}mg</Typography>
            <Typography>{drinkItem.sugar}g</Typography>
            <Typography>{drinkItem.cal}Kcal</Typography>
            <Typography>{drinkItem.price}원</Typography>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Button component={Link} to="/custom" size="small">
            주문하러 가기
          </Button>
        </Grid>
      </Card>
    </div>
  );
}

export default DrinkRecommendation;
