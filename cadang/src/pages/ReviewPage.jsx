import * as React from "react";
import { Paper, Box, Grid, Divider, Card } from "@mui/material";
import Typography from "@mui/joy/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


import ModifyReviewInfo from "../components/ModifyReviewInfo";
import CustomOption from "../components/CustomOption";

function ReviewPage() {
  return (
    <div>
      <Typography level="h3" fontSize="xl" fontWeight="xl">
        Review
      </Typography>
      <ModifyReviewInfo />
      <Card sx={{ marginTop: 2, height: 110}}>
      <TextField
          fullWidth
          id="standard-multiline-static"
          label="리뷰 작성하기"
          multiline
          rows={4}
          maxRows={5}
          variant="standard"
        />
      </Card>
      <CustomOption/>
      <Grid item>
            <Button fullWidth={true}>저장하기</Button>
          </Grid>

    </div>
  );
}

export default ReviewPage;
