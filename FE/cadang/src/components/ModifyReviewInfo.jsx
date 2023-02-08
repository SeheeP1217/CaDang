import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Card } from "@mui/material";
import Badge from "@mui/material/Badge";
import { useLocation } from "react-router-dom"
import DatePickerComponent from "./DatePickerComponent";

import drink from "../assets/drink.png";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  width: "75%",
});

function ModifyReviewInfo() {
  const location = useLocation()
  console.log(location)
  if (location.state.review !== undefined) {
    const review = location.state.review

    return (
      <Card>
        <Grid container>
          <Grid item xs={4} margin="auto">
            <Badge
              badgeContent="변경"
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
                {review.storeName}
              </Typography>
              <Typography variant="subtitle1" component="div">
                {review.drinkName}
              </Typography>
              <Typography variant="body2">
                {review.caffeine}mg / {review.sugar}g / {review.cal}Kcal / {review.price}원
              </Typography>
              <DatePickerComponent/>
            </Grid>
            <Grid></Grid>
          </Grid>
        </Grid>
      </Card>
    );
  }
}

export default ModifyReviewInfo;
