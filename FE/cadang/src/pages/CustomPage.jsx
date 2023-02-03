import * as React from "react";
import { Paper, Box, Grid } from "@mui/material";
import Typography from "@mui/joy/Typography";

import TodayChart from "../components/TodayChart";
import MenuListItem from "../components/util/MenuListItem";

// 커스텀 옵션 폼
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

function CustomPage() {
  return (
    <Paper width="85%" sx={{ backgroundColor: "#EFF5F5", marginTop: 2 }}>
      <Typography
        level="h3"
        fontSize="xl2"
        fontWeight="xl"
        id="ios-example-demo"
        mt={2}
      >
        옵션 Custom
      </Typography>

      <Grid container spacing={2}>
      <Grid item sx={{ display: "flex" }} xs={7} justifyContent="center">
          <Button variant="outlined" disabled>
            스타벅스
          </Button>
        </Grid>
        <Grid item sx={{ display: "flex" }} xs={5} justifyContent="center">
          <Button variant="outlined" disabled>
            강남점
          </Button>
        </Grid>
        <Grid item sx={{ display: "flex" }} xs={12} margin={1}>
          <MenuListItem data={menuData}/>
        </Grid>
      </Grid>
      {/* 현황 */}
      <TodayChart />

      <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          m: 1,
        },
      }}
    >
      <ButtonGroup variant="outlined" aria-label="size button group">
        <Typography width='20%' marginY='auto' marginRight={2}>사이즈</Typography>
        {/* 나중에 for문으로 변경 */}
        <Button>Small</Button>
        <Button>Regular</Button>
        <Button>Large</Button>
      </ButtonGroup>

      <ButtonGroup variant="outlined" aria-label="shot button group">
        <Typography width='20%'marginY='auto' marginRight={2}>샷</Typography>
        <IconButton color="secondary" aria-label="add an alarm">
        <RemoveCircleOutlineIcon />
      </IconButton>
      <Typography width='20%'marginY='auto' marginRight={2}>2</Typography>
        <IconButton color="secondary" aria-label="add an alarm">
        <AddCircleOutlineIcon />
      </IconButton>
      </ButtonGroup>

      <ButtonGroup variant="outlined" aria-label="shot button group">
        <Typography width='30%'marginY='auto' marginRight={2}>휘핑</Typography>
      <Button variant="outlined" color="primary">X</Button>
      <Button variant="outlined" color="primary">O</Button>
      </ButtonGroup>

      <ButtonGroup variant="outlined" aria-label="size button group">
        <Typography width='20%' marginY='auto' marginRight={2}>당도</Typography>
        {/* 나중에 for문으로 변경 */}
        <Button>덜달게</Button>
        <Button>기본</Button>
        <Button>달게</Button>
      </ButtonGroup>
    </Box>

    </Paper>
  );
}

const menuData = [
  { pk: 1, name: "카페라떼", caffeine: 250, sugar: 30, cal: 350, price: 2500 },
];

export default CustomPage;
