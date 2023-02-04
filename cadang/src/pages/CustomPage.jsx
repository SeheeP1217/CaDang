import * as React from "react";
import { Paper, Box, Grid, Divider } from "@mui/material";
import Typography from "@mui/joy/Typography";
import { styled } from "@mui/material/styles";

import TodayChart from "../components/TodayChart";
import DrinkMenuItem from "../components/util/DrinkMenuItem";

// 커스텀 옵션 폼
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

function CustomPage() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: "000000",
  }));



  return (
    <div>
      <Typography
        level="h3"
        fontSize="xl2"
        fontWeight="xl"
        id="ios-example-demo"
        mt={2}
      >
        옵션 Custom
      </Typography>
      <Grid container>
      <Box sx={{ flexGrow: 1 }} marginTop={1}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Item sx={{ fontWeight: "700" }}>스타벅스</Item>
          </Grid>
          <Grid item xs={4}>
            <Item style={{ fontWeight: "700" }}>강남점</Item>
          </Grid>
          <Grid item xs={12}>
          <DrinkMenuItem data={menuData} />
          </Grid>
        </Grid>
      </Box>
      </Grid>
      {/* 현황 */}
      <TodayChart />

      <Box>
        <Divider>custom</Divider>
        <br/>
        <Grid container sx={{ display: "flex" }} justifyContent="center" spacing={2} paddingBottom={2}>
          <Grid item xs={3} textAlign="center" margin="auto" >
            사이즈
          </Grid>
          <Grid item xs={9} justifyContent="center" alignItems="center" padding='auto'>
            <ButtonGroup variant="outlined" aria-label="size button group">
              {/* 나중에 for문으로 변경 */}
              <Button fullWidth={true}>Small</Button>
              <Button fullWidth={true}>Regular</Button>
              <Button fullWidth={true}>Large</Button>
            </ButtonGroup>
          </Grid>
          <Grid item xs={3} textAlign="center" margin="auto">샷</Grid>
          <Grid item xs={9} justifyContent="center" alignItems="center">
            <ButtonGroup
              variant="outlined"
              aria-label="shot button group"
              justifyContent="center"
            >
              <IconButton color="secondary" aria-label="add an alarm">
                <RemoveCircleOutlineIcon />
              </IconButton>
              <Typography width="20%" margin="auto">
                2
              </Typography>
              <IconButton color="secondary" aria-label="add an alarm">
                <AddCircleOutlineIcon />
              </IconButton>
            </ButtonGroup>
          </Grid>
          <Grid item xs={3} textAlign="center" margin="auto">휘핑</Grid>
          <Grid item xs={9} justifyContent="center" alignItems="center">
            <ButtonGroup variant="outlined" aria-label="shot button group">
              <Button style={{paddingLeft: "80%", paddingRight: "80%"}} >X</Button>
              <Button style={{paddingLeft: "80%", paddingRight: "80%"}} >O</Button>
            </ButtonGroup>
          </Grid>
          <Grid item xs={3} textAlign="center" margin="auto">
            당도
          </Grid>
          <Grid item xs={9} justifyContent="center" alignItems="center">
          <ButtonGroup variant="outlined" aria-label="size button group">
          <Button>덜달게</Button>
          <Button>기본</Button>
          <Button>달게</Button>
        </ButtonGroup>
          </Grid>
          <Grid item>
            <Button fullWidth={true}>주문하기</Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

const menuData = [
  { pk: 1, name: "카페라떼", caffeine: 250, sugar: 30, cal: 350, price: 2500 },
];

export default CustomPage;
