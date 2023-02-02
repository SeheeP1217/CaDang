import * as React from "react";
import { Paper, Grid, Divider } from "@mui/material";
import Typography from "@mui/joy/Typography";
import drink from "../../assets/drink.png";
import { styled } from "@mui/material/styles";

function MenuListItem(props) {
  return (
    <Paper sx={{ backgroundColor: "white" }} marginBottom={7.6}>
      <Paper>
        {props.data.map((menu) => {
          return (
            <Grid container sx={{ display: 'flex' }} key={menu.pk}>
              <Grid item xs={4} margin='auto'>
                <img
                  alt="menu_img"
                  src={drink}
                  width='60%'
                />
              </Grid>
              <Grid item xs={8}  direction='column'>
                <Grid item xs={8}>
                  <Typography>{menu.name}</Typography>
                </Grid>
                <Grid item xs={4}>
                  {menu.caffeine} / {menu.sugar} / {menu.cal} / {menu.price}
                </Grid>
              </Grid>
              <Divider/>
            </Grid>
          );
        })}
      </Paper>
    </Paper>
  );
}

const Img = styled("img")({
  margin: 0,
  display: "block",
  width: "75%",
});

export default MenuListItem;
