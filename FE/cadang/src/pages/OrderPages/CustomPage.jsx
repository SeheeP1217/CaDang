import * as React from "react";
import { Paper, Box, Grid, Card } from "@mui/material";
import Typography from "@mui/joy/Typography";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import DailyConsumptionGraph from "../../components/util/DailyConsumptionGraph";
import DrinkMenuItem from "../../components/util/DrinkMenuItem";
import CustomOption from "../../components/CustomOption";

function CustomPage() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: "000000",
  }))

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
      <Card>
        <DailyConsumptionGraph data={data} />
      </Card>

      <CustomOption />

      <Grid item>
      <Button component={Link} to="/payment" fullWidth={true}>주문하기</Button>
      </Grid>
    </div>
  )
}

const data = [
  {
    name: "카페인",
    consumption: 2400,
    change: 4000,
  },
  {
    name: "당",
    consumption: 1398,
    change: 3000,
  },
];

const menuData = [
  { pk: 1, name: "카페라떼", caffeine: 250, sugar: 30, cal: 350, price: 2500 },
]

export default CustomPage
