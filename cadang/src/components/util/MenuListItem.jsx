import * as React from "react";
import { Paper, Grid } from "@mui/material";
import Typography from "@mui/joy/Typography";
import drink from '../../assets/drink.png';
import { styled } from "@mui/material/styles";

function MenuListItem(props) {
  return (
    <Paper sx={{ backgroundColor:'white' }} marginBottom={7.6}>
      <Grid Container spacing={2}>
        <Grid item xs={4}>
        <Img
              alt="menu_img"
              src={drink}
              sx={{width: '10%', backgroundColor: "#fafafa", margin: '0'}}
            />
        </Grid>
        <Grid item xs={8} container direction="column">
          <Grid item xs={8}>
            <Typography>아이스 아메리카논</Typography>
          </Grid>
          <Grid item xs={4}>카/당/칼/가</Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

const Img = styled("img")({
  margin: "auto",
  display: "block",
  width: "75%",
});

export default MenuListItem;
