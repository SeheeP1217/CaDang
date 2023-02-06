import * as React from "react";
import { Paper, Grid, Divider, Card, List } from "@mui/material";
import Typography from "@mui/joy/Typography";
import drink from "../../assets/drink.png";
import { styled } from "@mui/material/styles";
import ListItemButton from "@mui/material/ListItemButton";
import { Key } from "@mui/icons-material";

function MenuListItem(props) {
  const [selectedIndex, setSelectedIndex] = React.useState();

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <List>
      {props.data.map((menu, index) => {
        return (
          <Grid
            container
            sx={{ display: "flex" }}
            key={index}
            alignItems="center"
          >
            <ListItemButton
              selected={selectedIndex === menu.pk}
              onClick={(event) => handleListItemClick(event, menu.pk)}
            >
              <Grid item xs={3} margin="auto">
                <img alt="menuImg" src={drink} width="80%" />
              </Grid>
              <Grid item xs={8}>
                <Typography>{menu.name}</Typography>
                <Typography>
                  {menu.caffeine} / {menu.sugar} / {menu.cal} / {menu.price}
                </Typography>
              </Grid>
            </ListItemButton>
          </Grid>
        );
      })}
    </List>
  );
}

export default MenuListItem;
