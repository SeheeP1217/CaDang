import * as React from "react"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { Grid, Card } from "@mui/material"
import Typography from "@mui/joy/Typography"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

import ModifyReviewInfo from "../../components/ModifyReviewInfo"
import CustomOption from "../../components/CustomOption"


function ReviewPage(props) {
  const location = useLocation()
 
  useEffect(() => {
    console.log(location)
  }, [location])

  return (
    <div>
      <Typography level="h3" fontSize="xl" fontWeight="xl">
        Review
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
    </div>
  )
}

export default ReviewPage
