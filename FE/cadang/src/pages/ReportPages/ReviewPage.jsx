import * as React from "react"
import { Fragment, useState, useMemo } from "react"
import { useLocation } from "react-router-dom"
import { Grid, Card } from "@mui/material"
import Typography from "@mui/joy/Typography"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

import { userReviewDetail } from "../../api/report"

import ModifyReviewInfo from "../../components/ModifyReviewInfo"
import ReadOnlyCustomOption from "../../components/ReadOnlyCustomOption"



const ReviewPage = () => {

  const location = useLocation()
  console.log(location)
  const reviewId = location.state.review.id
  console.log(reviewId)

  const [reviewDetail, setreviewDetail] = useState({ reviewDetail: [{
  id: 0,
  photo: "string",
  drinkName: "string",
  caffeine: 0,
  sugar: 0,
  cal: 0,
  price: 0,
  regDate: "2023-02-08T10:57:49.450Z",
  memo: "string",
  size: "string",
  shot: 0,
  whip: true,
  sugarContent: "LESS",
  syrup: 0,
  vanilla: 0,
  caramel: 0,
  hazelnut: 0,
  orderStatus: "REQUEST",
  efaultUrl: "string"
  }]})

  useMemo(() => {
    const getReviewDetails = async () => {
      await userReviewDetail(
        reviewId,
        (res) => {return res.data},
        (err) => console.log(err),
        )
        .then((data) => setreviewDetail(data))
    }
    getReviewDetails()
  }, [reviewId])

  return (
    <Fragment>
      <Typography level="h3" fontSize="xl" fontWeight="xl">
        Review
      </Typography>
      <ModifyReviewInfo data={reviewDetail}/>
      <Card sx={{ marginTop: 2, height: 110 }} >
        <TextField
          fullWidth
          id="standard-multiline-static"
          label='리뷰를 작성하세요'
          multiline
          rows={4}
          variant="standard"/>
      </Card>
      <ReadOnlyCustomOption data={reviewDetail} />
      <Grid item>
        <Button fullWidth={true}>저장하기</Button>
      </Grid>
    </Fragment>
  )
}

export default ReviewPage
