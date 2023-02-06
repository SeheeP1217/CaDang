import React, { useEffect, useState } from "react"
import { Paper, Box, Grid, Card } from "@mui/material"
import { styled } from "@mui/material/styles"
import DrinkMenuItem from "../../components/util/DrinkMenuItem"
import Typography from "@mui/joy/Typography"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import kakaopay from "../../assets/payment_icon_yellow_large.png"
import Button from "@mui/material-next/Button"

export default function PaymentPage() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: "000000",
  }))
  const addMenu = [{ cafe: "스타벅스" }]
  const menuData = [
    {
      pk: 1,
      name: "아이스 아메리카노",
      caffeine: 250,
      sugar: 30,
      cal: 350,
      price: 2500,
    },
  ]

  return (
    <div style={{ padding: "3%", marginTop: "3%" }}>
      {/* =========== 카페 이름 /// 카페 지점 ============= */}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Item sx={{ fontWeight: "700" }}>스타벅스</Item>
          </Grid>
          <Grid item xs={4}>
            <Item style={{ fontWeight: "700" }}>강남점</Item>
          </Grid>
        </Grid>
      </Box>
      {/* =============================================== */}
      <div style={{ marginTop: "3%" }}>
        <DrinkMenuItem />
      </div>
      <Box
        style={{ marginTop: "3%" }}
        component="span"
        sx={{ display: "block", fontSize: 18, fontWeight: "700" }}
      >
        주문 음료
      </Box>
      <Card sx={{ mt: "3%", p: 1 }}>
        <Grid container>
          <Grid
            item
            xs={8}
            sx={{ display: "flex", justifyContent: "flex-start" }}
          >
            <Typography
              sx={{
                fontWeight: "700",
                display: "inline",
                fontSize: 18,
              }}
            >
              아이스 아메리카노
            </Typography>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{ boxShadow: 0, display: "flex", justifyContent: "flex-end" }}
          >
            <Typography
              sx={{
                fontWeight: "700",
                display: "inline",
                fontSize: 18,
              }}
            >
              +4500원
            </Typography>
          </Grid>

          <Grid
            item
            xs={8}
            sx={{ boxShadow: 0, display: "flex", justifyContent: "flex-start" }}
          >
            <Typography
              sx={{
                fontWeight: "700",
                display: "inline",
                fontSize: 18,
              }}
            >
              샷 추가
            </Typography>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{ boxShadow: 0, display: "flex", justifyContent: "flex-end" }}
          >
            <Typography
              sx={{
                display: "inline",
                fontSize: 18,
                fontWeight: "700",
              }}
            >
              +500원
            </Typography>
          </Grid>

          <Grid
            item
            xs={8}
            sx={{ boxShadow: 0, display: "flex", justifyContent: "flex-start" }}
          >
            <Typography
              sx={{
                display: "inline",
                fontSize: 18,
                fontWeight: "700",
              }}
            >
              헤이즐넛 시럽
            </Typography>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{ boxShadow: 0, display: "flex", justifyContent: "flex-end" }}
          >
            <Typography
              sx={{
                display: "inline",
                fontSize: 18,
                fontWeight: "700",
              }}
            >
              +500원
            </Typography>
          </Grid>
        </Grid>
      </Card>
      <Card style={{ background: "#ffffff" }} sx={{ p: 1, mt: "3%" }}>
        <Grid container>
          <Grid
            item
            xs={8}
            sx={{ boxShadow: 0, display: "flex", justifyContent: "flex-start" }}
          >
            <Typography
              sx={{
                display: "inline",
                fontSize: 18,
                fontWeight: "700",
              }}
            >
              총 주문 금액
            </Typography>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{ boxShadow: 0, display: "flex", justifyContent: "flex-end" }}
          >
            <Typography
              sx={{
                display: "inline",
                fontSize: 18,
                fontWeight: "700",
              }}
            >
              5500원
            </Typography>
          </Grid>
        </Grid>
      </Card>
      <Box
        style={{ marginTop: "10%" }}
        component="span"
        sx={{ display: "block", fontSize: 18, fontWeight: "700" }}
      >
        결제 수단
      </Box>
      <Card sx={{ display: "flex", p: 1, mt: 1 }}>
        <CardMedia
          component="img"
          sx={{ width: 100 }}
          image={kakaopay}
          alt="kakaopay"
        />
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: "700",
            mt: 1,
            ml: 8,
          }}
        >
          카카오페이
        </Typography>
      </Card>
      <Grid sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          sx={{
            borderRadius: 2,
            background: "#F7BE81",
            fontSize: 16,
            fontWeight: "700",
            mt: 3,
            ml: 26,
          }}
        >
          결제하기
        </Button>
      </Grid>
    </div>
  )
}
