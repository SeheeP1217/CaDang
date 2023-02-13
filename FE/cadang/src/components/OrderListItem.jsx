import React, { useEffect, useRef, useState, useMemo } from "react";
import { Box, Grid, Card } from "@mui/material";
import Typography from "@mui/joy/Typography";
import Button from "@mui/material-next/Button";
import Divider from "@mui/material/Divider";

export default function OrderListItem(props) {
  const [orderItem, setOrderItem] = useState(props.order);

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

  useEffect(() => {
    setOrderItem(props.order);
  }, [props.order]);

  return (
    <div>
      <Grid sx={{ mt: 2 }} container>
        <Grid item xs={8} sx={{ display: "flex", justifyContent: "flex-start" }}>
          {orderItem !== undefined && (
            <Typography
              sx={{
                fontWeight: "700",
                display: "inline",
                fontSize: 18,
              }}
            >
              {orderItem.drinkName}
            </Typography>
          )}
        </Grid>
        <Grid item xs={4} sx={{ boxShadow: 0, display: "flex", justifyContent: "flex-end" }}>
          {orderItem !== undefined && (
            <Typography
              sx={{
                fontWeight: "700",
                display: "inline",
                fontSize: 16,
                mt: "1%",
              }}
            >
              {orderItem.memberId}
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          bgcolor: "background.paper",
          borderRadius: 1,
          mt: 1.5,
          mb: 0.5,
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
      <Divider />
    </div>
  );
}
