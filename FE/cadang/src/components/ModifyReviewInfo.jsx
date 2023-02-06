import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Card } from "@mui/material";
import Badge from "@mui/material/Badge";
import AddIcon from "@mui/icons-material/Add";

import drink from "../assets/drink.png";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  width: "75%",
});

function ModifyReviewInfo() {
  return (
    <Card>
      <Grid container>
        <Grid item xs={4} margin="auto">
          <Badge
            badgeContent='변경'
            color="primary"
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Img
              alt="complex"
              src={drink}
              sx={{ width: "70%", backgroundColor: "#fafafa" }}
            />
          </Badge>
        </Grid>
        <Grid item xs={8} sm container margin="auto">
          <Grid item xs>
            <Typography variant="subtitle1" component="div">
              스타벅스 역삼점
            </Typography>
            <Typography variant="subtitle1" component="div">
              바닐라 라떼 (ICE)
            </Typography>
            <Typography variant="body2">
              50mg / 24g / 240Kcal / 5,100원
            </Typography>
            <Typography variant="body2" color="text.secondary">
              2023년 2월 1일
            </Typography>
          </Grid>
          <Grid></Grid>
        </Grid>
      </Grid>
    </Card>
  );
}

export default ModifyReviewInfo;
