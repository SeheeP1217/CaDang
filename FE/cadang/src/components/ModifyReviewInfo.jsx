import * as React from "react";
import { useState } from "react"
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Card } from "@mui/material";
import Badge from "@mui/material/Badge";
import { useLocation } from "react-router-dom"
import DatePickerComponent from "./DatePickerComponent";

import drink from "../assets/drink.png";
import ImageModifier from "./util/ImageModifier";

const Img = styled("img")({
  margin: "15",
  display: "block",
  width: "75%",
});

function ModifyReviewInfo() {
  const location = useLocation()
  console.log(location)

  const [image, setImage] = useState(location.state.review.image)

  const getImg = (image_file, preview_URL) => {
    const newImage = { image_file, preview_URL }
    setImage(newImage)
  }

  if (location.state.review !== undefined) {
    const review = location.state.review


    return (
      <Card>
        <Grid container sx={{display: 'flex'}}>
          <Grid item margin="auto">z
            {/* <Badge
              badgeContent="변경"
              color="primary"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            > */}
              <ImageModifier getImg={getImg} beforeModifyImage={review.image}>
              </ImageModifier>
              {/* <Img
                alt="no Image"
                src={review.image}
                sx={{ width: "70%", backgroundColor: "#fafafa" }}
              /> */}
            {/* </Badge> */}
          </Grid>
          <Grid item margin="auto">
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
