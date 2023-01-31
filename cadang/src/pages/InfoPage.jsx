import * as React from "react";
import Typography from "@mui/joy/Typography";
import { Paper, Box, Grid, Card } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import { margin, rgbToHex } from "@mui/system";
import Button from "@mui/material-next/Button";
import Stack from "@mui/material/Stack";
import styled from "styled-components";

function InfoPage() {
  return (
    <Paper elevation={2} sx={{ backgroundColor: "#EFF5F5" , paddingTop: 1} }>
      <Paper sx={{ width: "90%", paddingTop: 3, mx: 'auto', mt: 2}}>
        <Box mx={2}>
          <Typography>목표량을 정해 볼까요?</Typography>
          <Typography>카페인 일일 섭취 권고량은 400mg 입니다.</Typography>
          <Typography>당류 일일 섭취 권고량은 25g 입니다.</Typography>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6} >
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
        <Grid container>
          <Grid item xs={6} style={{ background: "rgba(232, 222, 248)", borderRadius: "10px", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <goalCard>☕ 카페인 목표량</goalCard>
          </Grid>
          <Grid item xs={6} >
            <TextField id="standard-basic" placeholder="목표량 입력" variant="standard" />
          </Grid>
          <Grid item xs={12}>
            <div style={{height: '15px'}}></div>
          </Grid>

          <Grid item xs={6} style={{ background: "rgba(232, 222, 248)", borderRadius: "10px", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", }}>
            <goalCard>🍯 당 목표량</goalCard>
          </Grid>
          <Grid item xs={6}>
            <TextField style={{ height: "100%" }} id="standard-basic" placeholder="목표량 입력" variant="standard" />
          </Grid>
        </Grid>
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

const goalCard = styled.div`
  text-align: center;
`

export default InfoPage;
