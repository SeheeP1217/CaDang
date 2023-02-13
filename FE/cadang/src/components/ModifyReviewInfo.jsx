import * as React from "react"
import { useState, useEffect } from "react"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { Card } from "@mui/material"
import Badge from "@mui/material/Badge"
// import { useLocation } from "react-router-dom"
import DatePickerComponent from "./DatePickerComponent"

import ImageModifier from "./util/ImageModifier"

function ModifyReviewInfo(props) {
  // const location = useLocation()
  // console.log(location)
  //console.log(props.data)
  const detail = props.data
  const image = props.image
  // console.log("현재 이미지", image)
  // console.log(props.recordDate)

  // if (location.state.review !== undefined) {
  //   const review = location.state.review

  return (
    <Card>
      <Grid container sx={{ display: "flex" }}>
        <Grid item margin="auto">
          {/* <Badge
              badgeContent="변경"
              color="primary"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            > */}
          <ImageModifier
            getImg={props.getImg}
            changeImg={props.changeImg}
            deleteImg={props.deleteImg}
            beforeModifyImage={image}
          ></ImageModifier>
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
              {detail.caffeine}mg / {detail.sugar}g / {detail.cal}Kcal /{" "}
              {detail.price}원
            </Typography>
            <DatePickerComponent
              recordDate={props.recordDate}
              getRecordDate={props.getRecordDate}
            />
          </Grid>
          <Grid></Grid>
        </Grid>
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
            {detail.caffeine}mg / {detail.sugar}g / {detail.cal}Kcal /{" "}
            {detail.price}원
          </Typography>
          <DatePickerComponent
            recordDate={props.recordDate}
            getRecordDate={props.getRecordDate}
          />
        </Grid>
        <Grid></Grid>
      </Grid>
    </Card>
  )
}
// }

export default ModifyReviewInfo
