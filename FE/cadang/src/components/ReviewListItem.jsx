import * as React from "react";
import dayjs from "dayjs";
import { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Link, useHistory } from "react-router-dom";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteReview } from "../api/report";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  width: "75%",
});

function ReviewListItem(props) {
  const onModifyClickHandler = (event) => {
    console.log(event.target.parentElement.parentElement.id);
    props.onClick(event.target.parentElement.parentElement.id);
    console.log(props.selectIndex);
  };

  useEffect(() => {
    console.log(props.selectIndex);
  });

  const deleteReviewRecord = async (reviewId) => {
    if (window.confirm("정말 삭제하시겠습니까? 삭제된 기록은 복구가 불가능합니다.")) {
      await deleteReview(
        reviewId,
        (res) => console.log(res),
        (err) => console.log(err)
        ).then((res) => {
          if (res.status === 200) {
            useHistory.push('/mypage')
          }
        });
      }
  };

  console.log(props.reviews);
  const reviewDatas = props.reviews.recordList;
  return (
    <Paper elevation={1} sx={{ backgroundColor: "#fafafa", margin: "3px" }}>
      {reviewDatas.map((review) => {
        //console.log(review)
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
                  <Typography variant="subtitle1" component="div">
                    {review.drinkName}
                  </Typography>
                  <Typography variant="body2">
                    {review.caffeine} / {review.sugar} / {review.cal} /
                    {review.price} 
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {review.memo}
                  </Typography>
                </Grid>
              </Grid>
              <Grid>
                <Grid justifyContent="space-between" alignItems="center">
                  <Typography variant="subtitle1">{dayjs(review.regDate).format("YY/MM/DD")}</Typography>
                  {/* <Link to={{ pathname: `/review/${review.id}`, state:{review} }}> */}
                  <Link to={{ pathname: `/review/${review.id}`, state:{review} }}>
                  <IconButton
                    // component={Link}
                    // to={`/review/${review.id}`}
                    // state={review}
                    style={{ padding: 0 }}
                    >
                    <EditOutlinedIcon />
                  </IconButton>
                    </Link>
                  <IconButton onClick={() => deleteReviewRecord(review.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        );
      })}
    </Paper>
  );
}

export default ReviewListItem;
