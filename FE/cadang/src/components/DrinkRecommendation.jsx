import { Button, Card, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import drink from "../assets/drink.png";
import axios from "axios";
import React, { useEffect, useState } from "react";

function DrinkRecommendation() {
  const [list, setList] = useState([]);
  // const [loc, setLoc] = useState([]);


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
        console.log(cafe[0]);
        setList([...list, cafe]);
      });

      
      // console.log(list);
  };

  useEffect(() => {
    console.log(list);
  },[list]);

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
            <Typography>오늘은 스타벅스 아이스아메리카노 어떨까요?</Typography>
          </Grid>

          <Grid item xs={4}>
            <Button>
              <img alt="menuImg" src={drink} width="100%" />
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Typography>150mg</Typography>
            <Typography>0g</Typography>
            <Typography>20Kcal</Typography>
            <Typography>4500원</Typography>
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
