import React, { useEffect, useState } from "react";
import { Paper, Box, Grid, Card } from "@mui/material";
import Typography from "@mui/joy/Typography";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material-next/Button";
import errorImg from "../../assets/404error.png";

export default function Error404Page() {
  return (
    <div>
      <Grid container sx={{ mt: 15 }}>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <CardMedia component="img" sx={{ width: 100 }} image={errorImg} alt="errorImg" />
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 3 }}>
        <Grid item xs={12} sx={{ boxShadow: 0, display: "flex", justifyContent: "center" }}>
          <Typography
            sx={{
              fontWeight: "700",
              display: "inline",
              fontSize: 19,
            }}
          >
            죄송합니다.
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ boxShadow: 0, display: "flex", justifyContent: "center" }}>
          <Typography
            sx={{
              fontWeight: "700",
              display: "inline",
              fontSize: 19,
            }}
          >
            현재 찾을 수 없는 페이지를
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ boxShadow: 0, display: "flex", justifyContent: "center" }}>
          <Typography
            sx={{
              fontWeight: "700",
              display: "inline",
              fontSize: 19,
            }}
          >
            요청하셨습니다.
          </Typography>
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 3 }}>
        <Grid item xs={12} sx={{ boxShadow: 0, display: "flex", justifyContent: "center" }}>
          <Typography
            sx={{
              fontWeight: "500",
              display: "inline",
              fontSize: 13,
            }}
          >
            존재하지 않는 주소를 입력하셨거나,
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ boxShadow: 0, display: "flex", justifyContent: "center" }}>
          <Typography
            sx={{
              fontWeight: "500",
              display: "inline",
              fontSize: 13,
            }}
          >
            요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
          </Typography>
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 3 }}>
        <Grid item xs={12} sx={{ boxShadow: 0, display: "flex", justifyContent: "center" }}>
          <Typography
            sx={{
              fontWeight: "500",
              display: "inline",
              fontSize: 13,
            }}
          >
            감사합니다.
          </Typography>
        </Grid>
      </Grid>
      <Grid container sx={{}}>
        <Grid item xs={6} sx={{ boxShadow: 0, display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{
              borderRadius: 2,
              background: "#FFD0AE",
              fontSize: 14,
              fontWeight: "500",
              mt: 3,
            }}
          >
            메인으로
          </Button>
        </Grid>
        <Grid item xs={6} sx={{ boxShadow: 0, display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{
              // width: "130px",
              borderRadius: 2,
              background: "#FFD0AE",
              fontSize: 14,
              fontWeight: "500",
              mt: 3,
            }}
          >
            이전 페이지
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
