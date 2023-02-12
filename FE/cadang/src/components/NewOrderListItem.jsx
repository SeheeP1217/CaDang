import React, { useEffect, useRef, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { Paper, Box, Grid, Card } from "@mui/material";
import Typography from "@mui/joy/Typography";
import Button from "@mui/material-next/Button";
import Divider from "@mui/material/Divider";

export default function NewOrderListItem(props) {
  const [drinkItem, setDrinkItem] = useState();

  useMemo(() => {
    setDrinkItem(props.drink);
  }, []);

  useEffect(() => {
    console.log(drinkItem);
  }, [drinkItem]);

  // console.log("NewOrderListItem !!!!!!!!!!! " + props.drink);

  return (
    <div>
      <Grid sx={{ mt: 2 }} container>
        <Grid item xs={8} sx={{ display: "flex", justifyContent: "flex-start" }}>
          {drinkItem !== undefined && (
            <Typography
              sx={{
                fontWeight: "700",
                display: "inline",
                fontSize: 18,
              }}
            >
              {drinkItem.drinkName}
            </Typography>
          )}
        </Grid>
        <Grid item xs={4} sx={{ boxShadow: 0, display: "flex", justifyContent: "flex-end" }}>
          {drinkItem !== undefined && (
            <Typography
              sx={{
                fontWeight: "700",
                display: "inline",
                fontSize: 16,
                mt: "1%",
              }}
            >
              {drinkItem.memberId}
            </Typography>
          )}
        </Grid>

        <Grid item xs={12} sx={{ boxShadow: 0, display: "flex", justifyContent: "flex-start" }}>
          <Typography
            sx={{
              fontWeight: "500",
              display: "inline",
              fontSize: 13,
            }}
          >
            샷 추가 + 1 / 헤이즐넛시럽 추가 + 1
          </Typography>
        </Grid>
      </Grid>
      <Grid container sx={{ mb: 2 }}>
        <Grid item xs={6} sx={{ boxShadow: 0, display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{
              borderRadius: 2,
              background: "#FF9E57",
              fontSize: 14,
              fontWeight: "500",
              mt: 2,
            }}
          >
            수락
          </Button>
        </Grid>
        <Grid item xs={6} sx={{ boxShadow: 0, display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{
              // width: "130px",
              borderRadius: 2,
              background: "#CBCBCB",
              fontSize: 14,
              fontWeight: "500",
              mt: 2,
            }}
          >
            거절
          </Button>
        </Grid>
      </Grid>
      <Divider />
    </div>
  );
}
