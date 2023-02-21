import React from "react";
import { Box, Grid, Card, Divider } from "@mui/material";
import Typography from "@mui/joy/Typography";

export default function PaymentRecord(props) {
  const regDate = props.order.regDate;
  const formattedRegDate = new Date(regDate).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card style={{ marginBottom: "5px" }}>
      <Box
        style={{ marginTop: "2%" }}
        component="span"
        sx={{ ml: 2, display: "block", fontSize: 18, fontWeight: "700" }}
      >
        픽업 완료
      </Box>
      <Divider />
      <Card sx={{ mt: "3%", p: 1 }}>
        <Grid container sx={{}}>
          {/* ================================================= */}
          <Grid item xs={12} sx={{ ml: 1, display: "flex", justifyContent: "flex-start" }}>
            <Typography
              sx={{
                fontWeight: "700",
                display: "inline",
                fontSize: 15,
                pb: 0.5,
              }}
            >
              {props.order.storeName}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              ml: 1,
              boxShadow: 0,
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <Typography
              sx={{
                fontWeight: "700",
                display: "inline",
                fontSize: 15,
                pb: 0.5,
              }}
            >
              {props.order.drinkName} {props.order.drinkPrice}원
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              ml: 1,
              boxShadow: 0,
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <Typography
              sx={{
                fontWeight: "700",
                display: "inline",
                fontSize: 15,
                pb: 0.5,
              }}
            >
              {formattedRegDate}
            </Typography>
          </Grid>
          {/* =============================================== */}
        </Grid>
      </Card>
    </Card>
  );
}
