import React, { useEffect, useState } from "react";
import { Paper, Box, Grid, Card } from "@mui/material";
import Typography from "@mui/joy/Typography";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material-next/Button";
import errImg from "../../assets/500error.png";

export default function Error500Page() {
  return (
    <div>
      <Grid container sx={{ mt: 14 }}>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <CardMedia
            component="img"
            sx={{ width: 290, height: 170 }}
            image={errImg}
            alt="errorImg"
          />
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 1 }}>
        <Grid item xs={12} sx={{ boxShadow: 0, display: "flex", justifyContent: "center" }}>
          <Typography
            sx={{
              fontWeight: "700",
              display: "inline",
              fontSize: 20,
            }}
          >
            페이지가 작동하지 않습니다.
          </Typography>
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 1 }}>
        <Grid item xs={12} sx={{ boxShadow: 0, display: "flex", justifyContent: "center" }}>
          <Typography
            sx={{
              fontWeight: "500",
              display: "inline",
              fontSize: 15,
            }}
          >
            현재 링크에서 요청을 처리할 수 없습니다.
          </Typography>
        </Grid>
      </Grid>
      <Grid container sx={{}}>
        <Grid item xs={12} sx={{ boxShadow: 0, display: "flex", justifyContent: "center" }}>
          <Typography
            sx={{
              fontWeight: "500",
              display: "inline",
              fontSize: 15,
            }}
          >
            HTTP ERROR 500
          </Typography>
        </Grid>
      </Grid>
      <Grid container sx={{}}>
        <Grid item xs={12} sx={{ boxShadow: 0, display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{
              // width: "130px",
              borderRadius: 2,
              background: "#FFD0AE",
              fontSize: 14,
              fontWeight: "700",
              mt: 3,
            }}
          >
            새로고침
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
