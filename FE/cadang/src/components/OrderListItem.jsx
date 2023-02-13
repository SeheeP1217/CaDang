import React, { useEffect, useRef, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { Paper, Box, Grid, Card } from "@mui/material";
import Typography from "@mui/joy/Typography";
import Button from "@mui/material-next/Button";

export default function OrderListItem(props) {

  useMemo(() => {
    

  },[]);

  function Item(props) {
    const { sx, ...other } = props;
    return (
      <Button
        sx={{
          p: 1,
          bgcolor: (theme) => (theme.palette.mode === "dark" ? "#101010" : "grey.100"),
          color: (theme) => (theme.palette.mode === "dark" ? "grey.300" : "grey.800"),
          border: "1px solid",
          borderColor: (theme) => (theme.palette.mode === "dark" ? "grey.800" : "grey.300"),
          borderRadius: 2,
          fontSize: "0.875rem",
          fontWeight: "700",
          ...sx,
        }}
        {...other}
      />
    );
  }


  return (
    <div>

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
                  fontSize: 16,
                  mt: "1%",
                }}
              >
                사용자 아이디
              </Typography>
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              bgcolor: "background.paper",
              borderRadius: 1,
              mt: 2,
            }}
          >
            <Item
              sx={{
                // width: "130px",
                borderRadius: 2,
                background: "#FF9E57",
                fontSize: 12,
                fontWeight: "500",
              }}
            >
              음료 제조 중
            </Item>

            <Item
              // variant="contained"
              sx={{
                // width: "130px",
                borderRadius: 2,
                background: "#FF9E57",
                fontSize: 12,
                fontWeight: "500",
              }}
            >
              제조 완료
            </Item>

            <Item
              // variant="contained"
              sx={{
                // width: "130px",
                borderRadius: 2,
                background: "#FF9E57",
                fontSize: 12,
                fontWeight: "500",
              }}
            >
              픽업 완료
            </Item>
          </Box>
    </div>
  )
}
