import * as React from "react"
import { useEffect, useState } from "react"
import { styled } from "@mui/material/styles"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { Paper } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import { Link } from "react-router-dom"

import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import DeleteIcon from "@mui/icons-material/Delete"

const Img = styled("img")({
  margin: "auto",
  display: "block",
  width: "75%",
})

function ReviewListItem(props) {

  const onModifyClickHandler = (event) => {
    console.log(event.target.parentElement.parentElement.id)
    props.onClick(event.target.parentElement.parentElement.id)
    console.log(props.selectIndex)
  }

  useEffect(() => {
    console.log(props.selectIndex)
  })


  console.log(props.reviews)
  const reviewDatas = props.reviews.recordList
  return (
    <Paper elevation={1} sx={{ backgroundColor: "#fafafa", margin: "3px" }}>
      {reviewDatas.map(review => {
        return (
          <Grid container spacing={2} key={review.id}>
            <Grid item xs={2} margin="auto">
              <Img
                id={review.id}
                alt="complex"
                src={review.photo}
                sx={{ width: "90%", backgroundColor: "#fafafa" }}
              />
            </Grid>
            <Grid item xs={10} sm container margin="auto">
              <Grid item xs container spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1" component="div">
                    {review.drinkName}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {review.caffeine} / {review.sugar} / {review.cal} / {review.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {review.memo}
                  </Typography>
                </Grid>
              </Grid>
              <Grid>
                <Grid
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="subtitle1">{review.regDate}</Typography>
                  <IconButton component={Link} to={`/review/${review.id}`} state={ review } style={{ padding: 0 }} >
                      <EditOutlinedIcon />
                  </IconButton>
                  {/* <IconButton onClick={onModifyClickHandler} id={review.id} style={{ padding: 0 }} >
                    <Link to={`/record/${props.selectIndex}`}>
                      <EditOutlinedIcon />
                    </Link>
                  </IconButton> */}
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )
      })}

    </Paper >
  )
}

export default ReviewListItem
