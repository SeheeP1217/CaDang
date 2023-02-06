import * as React from "react"
import { styled } from "@mui/material/styles"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { Paper } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import { Link } from "react-router-dom"

import drink from "../assets/drink.png"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import DeleteIcon from "@mui/icons-material/Delete"

const Img = styled("img")({
  margin: "auto",
  display: "block",
  width: "75%",
})

function ReviewListItem(props) {
  console.log(props.reviews)
  const reviewDatas = props.reviews.recordList
  return (
    <Paper elevation={1} sx={{ backgroundColor: "#fafafa", margin: "3px" }}>
    {reviewDatas.map(review => {
      return (
        <Grid container spacing={2}>
        <Grid item xs={2} margin="auto">
          <Img
            alt="complex"
            src={review.photo}
            sx={{ width: "90%", backgroundColor: "#fafafa" }}
          />
        </Grid>
        <Grid item xs={10} sm container margin="auto">
          <Grid item xs container direction="column" spacing={2}>
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
              direction="column"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="subtitle1">{review.regDate}</Typography>
              <IconButton component={Link} to="/review">
                <EditOutlinedIcon />
              </IconButton>
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      )
    })}
      
    </Paper>
  )
}

export default ReviewListItem
