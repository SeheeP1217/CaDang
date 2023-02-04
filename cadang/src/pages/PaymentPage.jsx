import React, { useEffect, useState } from "react";
import { Paper, Box, Grid, Card } from "@mui/material";
import { styled } from "@mui/material/styles";
import DrinkMenuItem from "../components/util/DrinkMenuItem";
import Typography from "@mui/joy/Typography";
import CardContent from "@mui/material/CardContent";

export default function PaymentPage() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: "000000",
  }));
  const addMenu = [];
  const menuData = [{ pk: 1, name: "카페라떼", caffeine: 250, sugar: 30, cal: 350, price: 2500 }];

  return (
    <div style={{ padding: "3%", marginTop: "3%" }}>
      {/* =========== 카페 이름 /// 카페 지점 ============= */}
      <Box sx={{ flexGrow: 1 }}>
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
      <div style={{ marginTop: "3%" }}>
        <DrinkMenuItem />
      </div>
      <Box style={{ marginTop: "3%" }} component="span" sx={{ display: "block", fontSize: 18 }}>
        주문 음료
      </Box>
      <Card sx={{ mt: "3%", p: "1%" }}>
        <Grid container>
          <Grid item xs={8} sx={{ display: "flex", justifyContent: "flex-start" }}>
            <Typography
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                display: "inline",
                fontSize: 18,
              }}
            >
              아이스 아메리카노
            </Typography>
          </Grid>
          <Grid item xs={4} sx={{ boxShadow: 0, display: "flex", justifyContent: "flex-end" }}>
            <Typography
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                display: "inline",
                fontSize: 18,
              }}
            >
              +4500원
            </Typography>
          </Grid>

          <Grid item xs={8} sx={{ boxShadow: 0, display: "flex", justifyContent: "flex-start" }}>
            <Typography
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                display: "inline",
                fontSize: 18,
              }}
            >
              샷 추가
            </Typography>
          </Grid>
          <Grid item xs={4} sx={{ boxShadow: 0, display: "flex", justifyContent: "flex-end" }}>
            <Typography
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                display: "inline",
                fontSize: 18,
              }}
            >
              +500원
            </Typography>
          </Grid>

          <Grid item xs={8} sx={{ boxShadow: 0, display: "flex", justifyContent: "flex-start" }}>
            <Typography
              sx={{
                display: "inline",
                fontSize: 18,
              }}
            >
              헤이즐넛 시럽
            </Typography>
          </Grid>
          <Grid item xs={4} sx={{ boxShadow: 0, display: "flex", justifyContent: "flex-end" }}>
            <Typography
              sx={{
                display: "inline",
                fontSize: 18,
              }}
            >
              +500원
            </Typography>
          </Grid>
        </Grid>
      </Card>
      <Card style={{ background: "#ffffff" }} sx={{ p: "1%", mt: "3%" }}>
        <Grid container>
          <Grid item xs={8} sx={{ boxShadow: 0, display: "flex", justifyContent: "flex-start" }}>
            <Typography
              sx={{
                display: "inline",
                fontSize: 18,
              }}
            >
              총 주문 금액
            </Typography>
          </Grid>
          <Grid item xs={4} sx={{ boxShadow: 0, display: "flex", justifyContent: "flex-end" }}>
            <Typography
              sx={{
                display: "inline",
                fontSize: 18,
              }}
            >
              5500원
            </Typography>
          </Grid>
        </Grid>
      </Card>
      <Box style={{ marginTop: "10%" }} component="span" sx={{ display: "block", fontSize: 18 }}>
        결제 수단
      </Box>
    </div>
  );
}
