import React, { useState, useEffect } from "react"
import { Grid, List, Card } from "@mui/material"
import Typography from "@mui/joy/Typography"
import drink from "../../assets/drink.png"

import ListItemButton from "@mui/material/ListItemButton"

function MenuListItem(props) {
  const drinkListData = props.showData

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [selectedCaffeine, setSelectedCaffeine] = useState(0)
  const [selectedSugar, setSelectedSugar] = useState(0)
  const [selectedCal, setSelectedCal] = useState(0)
  const [selectedPrice, setSelectedPrice] = useState(0)

  const handleListItemClick = (event, index) => {
    setSelectedIndex((prevIndex) => {
      // console.log(index)
      for (var i = 0; i < drinkListData.length; i++) {
        if (index === drinkListData[i].drinkId) {
          setSelectedCaffeine(()=>drinkListData[i].caffeine)
          setSelectedSugar(()=>drinkListData[i].sugar)
          setSelectedCal(()=>drinkListData[i].cal)
          setSelectedPrice(()=>drinkListData[i].price)
          break
        }
      }
      return index
    })
  }
  console.log(selectedCaffeine,selectedSugar,selectedCal,selectedPrice)

  // console.log(selectedIndex)
  // console.log("drinkListData", drinkListData)

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
              selected={selectedIndex === menu.id}
              onClick={(event) => handleListItemClick(event, menu.drinkId)}
            >
              <Grid item xs={3} margin="auto">
                <img alt="menuImg" src={menu.img} width="80%" />
              </Grid>
              <Grid item xs={9}>
                <Card>
                  <Typography>{menu.drinkName}</Typography>
                  <Typography>
                    {menu.caffeine}mg / {menu.sugar}g / {menu.cal}kcal /{" "}
                    {menu.price}원
                  </Typography>
                </Card>
              </Grid>
            </ListItemButton>
          </Grid>
        )
      })}
    </List>
  )
}

export default MenuListItem
