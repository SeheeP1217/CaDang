import * as React from "react";
import { useState } from "react"
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Card } from "@mui/material";
import Badge from "@mui/material/Badge";
// import { useLocation } from "react-router-dom"
import DatePickerComponent from "./DatePickerComponent";

import ImageModifier from "./util/ImageModifier";


function ModifyReviewInfo(props) {
  // const location = useLocation()
  // console.log(location)
  console.log(props.data)
  const detail = props.data
  const [image, setImage] = useState(detail.photo)
  const [isModified, setIsModified] = useState(0)

  const getImg = (image_file, preview_URL) => {
    const newImage = { image_file, preview_URL }
    setImage(newImage)
  }

  const changeImg = () => {
    setIsModified(1)
    console.log(isModified)
  }
  
  const deleteImg = () => {
    setIsModified(2)
    console.log(isModified)
  }

  // if (location.state.review !== undefined) {
  //   const review = location.state.review


    return (
      <Card>
        <Grid container sx={{display: 'flex'}}>
          <Grid item margin="auto">
            {/* <Badge
              badgeContent="변경"
              color="primary"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            > */}
              <ImageModifier getImg={getImg} changeImg={changeImg} deleteImg={deleteImg} beforeModifyImage={image}>
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
                {detail.storeName}
              </Typography>
              <Typography variant="subtitle1" component="div">
                {detail.drinkName}
              </Typography>
              <Typography variant="body2">
                {detail.caffeine}mg / {detail.sugar}g / {detail.cal}Kcal / {detail.price}원
              </Typography>
              <DatePickerComponent/>
            </Grid>
            <Grid></Grid>
          </Grid>
        </Grid>
      </Card>
    );
  }
// }

export default ModifyReviewInfo;
