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
            <Grid Container key={menu.pk}>
              <Grid item xs={4}>
                <Img
                  alt="menu_img"
                  src={drink}
                  sx={{ width: "10%", backgroundColor: "#fafafa", margin: "0" }}
                />
              </Grid>
              <Grid item xs={8}>
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
  margin: "auto",
  display: "block",
  width: "75%",
});

export default MenuListItem;
