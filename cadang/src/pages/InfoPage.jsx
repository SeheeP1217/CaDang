import * as React from "react";
import Typography from "@mui/joy/Typography";
import { Paper, Box, Grid, Card } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import { margin } from "@mui/system";
import Button from "@mui/material-next/Button";
import Stack from "@mui/material/Stack";

function InfoPage() {
  return (
    <Paper elevation={2} sx={{ backgroundColor: "#EFF5F5" }}>
      <h1>목표량을 정해 볼까요?</h1>
      <h5>
        카페인 일일 섭취 권고량은 400mg 입니다. 당류 일일 섭취 권고량은 25g
        입니다.
      </h5>
      <Paper sx={{ width: "90%", margin: "auto" }}>
        <Box sx={{ width: "100%" }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <ListItem>
                <ListItemText primary="Photos" secondary="Jan 9, 2014" />
              </ListItem>
            </Grid>
            <Grid item xs={6}>
              <ListItem>
                <ListItemText primary="Photos" secondary="Jan 9, 2014" />
              </ListItem>
            </Grid>
            <Grid item xs={6}>
              <ListItem>
                <ListItemText primary="Photos" secondary="Jan 9, 2014" />
              </ListItem>
            </Grid>
            <Grid item xs={6}>
              <ListItem>
                <ListItemText primary="Photos" secondary="Jan 9, 2014" />
              </ListItem>
            </Grid>
            <Grid item xs={6}>
              <ListItem>
                <ListItemText primary="Photos" secondary="Jan 9, 2014" />
              </ListItem>
            </Grid>
            <Grid item xs={6}>
              <ListItem>
                <ListItemText primary="Photos" secondary="Jan 9, 2014" />
              </ListItem>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Box width='90%' my={3} mx='auto'>
        <Card width='50%'>☕ 카페인 목표량</Card>
        <TextField id="standard-basic" label="목표량 입력" variant="standard" />

        <Card>🍯 당 목표량</Card>
        <TextField id="standard-basic" label="목표량 입력" variant="standard" />
      </Box>
      <Stack spacing={1} width="50%" margin="auto">
        <Button
          variant="filledTonal"
          sx={{
            "&:hover, &.Mui-focusVisible": {
              zIndex: 1,
              backgroundColor: "#F99417",
            },
          }}
        >
          입력완료
        </Button>
        <Button variant="text">나중에 설정하기</Button>
      </Stack>
    </Paper>
  );
}

export default InfoPage;
