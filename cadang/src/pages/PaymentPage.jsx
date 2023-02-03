import React, { useEffect, useState } from "react";
import { Paper, Box, Grid } from "@mui/material";
import { styled } from '@mui/material/styles';
import DrinkMenuItem from "../components/util/DrinkMenuItem";
import Typography from "@mui/joy/Typography";
import CardContent from '@mui/material/CardContent';

export default function PaymentPage() {

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: "000000"
  }));

  const menuData = [
    { pk: 1, name: "카페라떼", caffeine: 250, sugar: 30, cal: 350, price: 2500 },
  ];

  return (
    <div style={{padding: "3%", marginTop:"3%"}}>
      {/* =========== 카페 이름 /// 카페 지점 ============= */}
      <Box style={{  }}
        sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Item style={{}}>스타벅스</Item>
          </Grid>
          <Grid item xs={4}>
            <Item style={{}}>강남점</Item>
          </Grid>
        </Grid>
      </Box>
      {/* =============================================== */}
      <div style={{marginTop: "3%"}}>
        <DrinkMenuItem/>
      </div>
      <Box style={{marginTop: "3%"}} component="span" sx={{ display: 'block' }}>주문 음료</Box>
      <Box backgroundColor="#ffffff">
        <Box>
          <Typography sx={{
            display: 'inline',
            fontSize: 20,
            }}>
              아이스 아메리카노
          </Typography>
          <Typography sx={{
            display:'inline',
            fontSize: 20,
            textAlign:'right'
            }}>
              +4500원
          </Typography>
        </Box>

        <Box>
        <Typography sx={{
            display: 'inline',
            fontSize: 20,
            }}>
              샷 추가
          </Typography>
          <Typography sx={{
            display:'inline',
            fontSize: 20,
            textAlign:'right'
            }}>
              +500원
          </Typography>
        </Box>
      </Box>
    </div>
  );
};