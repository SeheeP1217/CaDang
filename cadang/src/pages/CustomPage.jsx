import * as React from "react";
import { Paper, Box, Grid, Divider } from "@mui/material";
import Typography from "@mui/joy/Typography";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

import TodayChart from "../components/TodayChart";
import DrinkMenuItem from "../components/util/DrinkMenuItem";
import CustomOption from "../components/CustomOption";

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
      <Typography level="h3" fontSize="xl" fontWeight="xl">
        Custom
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

      <CustomOption />

      <Grid item>
        <Button fullWidth={true}>주문하기</Button>
      </Grid>
    </div>
  );
}

const menuData = [
  { pk: 1, name: "카페라떼", caffeine: 250, sugar: 30, cal: 350, price: 2500 },
];

export default CustomPage;
