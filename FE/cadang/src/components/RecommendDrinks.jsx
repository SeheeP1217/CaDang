import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Container from '@mui/material/Container';
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import './RecommendDrinks.css';

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%"
});

export default function RecommendDrinks() {
  return (
    <Container className="container"
      sx={{
        p: 2,
        margin: "auto",
        maxWidth: 550,
        // flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff"
      }}
    >
      <Button className="btn">위치 업데이트</Button>
      <Grid container spacing={1}>
        <Grid item>
          <Typography className="text">스타벅스</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography ml={11}  gutterBottom variant="subtitle1" component="div">
            오늘은 아이스 아메리카노 어떨까요?
          </Typography>
        </Grid>
        <Grid item xs={8}>
        <ButtonBase className="drinkImg" sx={{ width: 128, height: 128 }}>
            <Img
              alt="drink"
              src="https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[110563]_20210426095937808.jpg"
            />
          </ButtonBase>
        </Grid>
        <Grid item>
          <Typography variant="body2" gutterBottom>
            카페인: 150mg
          </Typography>
          <Typography variant="body2" gutterBottom>
            당: 0g
          </Typography>
          <Typography variant="body2" gutterBottom>
            칼로리: 20kcal
          </Typography>
          <Typography variant="body2" gutterBottom>
            가격: 4500원
          </Typography>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            
            
          </Grid>
        </Grid>
      </Grid>
      <Button className="btn">주문하러 가기</Button>
    </Container>
  );
}