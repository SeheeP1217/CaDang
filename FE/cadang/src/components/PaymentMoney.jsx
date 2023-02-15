import React, { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { Paper, Box, Grid, Card } from "@mui/material";
import { styled } from "@mui/material/styles";
import Typography from "@mui/joy/Typography";

export default function PaymentMoney() {
  return (
    <div>
      <Box
        style={{ marginTop: "3%" }}
        component="span"
        sx={{ display: "block", fontSize: 18, fontWeight: "700" }}
      >
        주문 음료
      </Box>
      <Card sx={{ mt: "3%", p: 1 }}>
        <Grid container>
          <Grid item xs={8} sx={{ display: "flex", justifyContent: "flex-start" }}>
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
          <Grid item xs={4} sx={{ boxShadow: 0, display: "flex", justifyContent: "flex-end" }}>
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

          <Grid item xs={8} sx={{ boxShadow: 0, display: "flex", justifyContent: "flex-start" }}>
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
          <Grid item xs={4} sx={{ boxShadow: 0, display: "flex", justifyContent: "flex-end" }}>
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

          <Grid item xs={8} sx={{ boxShadow: 0, display: "flex", justifyContent: "flex-start" }}>
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
          <Grid item xs={4} sx={{ boxShadow: 0, display: "flex", justifyContent: "flex-end" }}>
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
    </div>
  );
}
