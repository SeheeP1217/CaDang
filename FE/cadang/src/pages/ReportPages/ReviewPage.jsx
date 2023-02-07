import * as React from "react"
import { useEffect, Fragment } from "react"
import { useParams, Route, useLocation } from "react-router-dom"
import { Grid, Card } from "@mui/material"
import Typography from "@mui/joy/Typography"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

import ModifyReviewInfo from "../../components/ModifyReviewInfo"
import CustomOption from "../../components/CustomOption"


const ReviewPage = (props) => {
  const params = useParams()
  const location = useLocation()
  const data = props.state

  return (
    <Fragment>
      <Typography level="h3" fontSize="xl" fontWeight="xl">
        Review {params.reviewId} {data}
      </Typography>
      {/* <ModifyReviewInfo />
      <Card sx={{ marginTop: 2, height: 110 }}>
        <TextField
          fullWidth
          id="standard-multiline-static"
          label='리뷰를 작성하세요'
          multiline
          rows={4}
          maxRows={5}
          variant="standard"/>
      </Card>
      <CustomOption />
      <Grid item>
        <Button fullWidth={true}>저장하기</Button>
      </Grid> */}
    </Fragment>
  )
}

export default ReviewPage
