import * as React from "react";
import { Grid, List } from "@mui/material";
import Typography from "@mui/joy/Typography";
import drink from "../../assets/drink.png";

import ListItemButton from "@mui/material/ListItemButton";


function MenuListItem(props) {
  const [selectedIndex, setSelectedIndex] = React.useState();
  const menuDatas = props.menus.drinkList
  console.log('MenuListItem에서 menuDatas 콘솔 찍는 중', menuDatas)

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <List>
      {menuDatas.map((menu, index) => {
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
