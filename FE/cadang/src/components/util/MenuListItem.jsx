import * as React from "react";
import { Grid, List } from "@mui/material";
import Typography from "@mui/joy/Typography";
import drink from "../../assets/drink.png";

import ListItemButton from "@mui/material/ListItemButton";


function MenuListItem(props) {
  const drinkListData = props.showData

  const [selectedIndex, setSelectedIndex] = React.useState();
  // const menuDatas = props.menus.drinkList
  // console.log('MenuListItem에서 menuDatas 콘솔 찍는 중', menuDatas)

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <List>
      {drinkListData.map((menu, index) => {
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
                <img alt="menuImg" src={menu.img} width="80%" />
              </Grid>
              <Grid item xs={8}>
                <Typography>{menu.drinkName}</Typography>
                <Typography>
                  {menu.caffeine}mg / {menu.sugar}g / {menu.cal}kcal / {menu.price}원
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
