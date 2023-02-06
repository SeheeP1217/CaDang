import * as React from "react";
import { Box, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";

export default function goalSettingItem() {
  return (
    <Box width="90%" my={3} mx="auto">
      <Grid container>
        <Grid
          item
          xs={6}
          style={{
            background: "rgba(232, 222, 248)",
            borderRadius: "10px",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <goalCard>☕ 카페인 목표량</goalCard>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="standard-basic"
            placeholder="목표량 입력"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <div style={{ height: "15px" }}></div>
        </Grid>

        <Grid
          item
          xs={6}
          style={{
            background: "rgba(232, 222, 248)",
            borderRadius: "10px",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <goalCard>🍯 당 목표량</goalCard>
        </Grid>
        <Grid item xs={6}>
          <TextField
            style={{ height: "100%" }}
            id="standard-basic"
            placeholder="목표량 입력"
            variant="standard"
          />
        </Grid>
      </Grid>
    </Box>
  )
}
