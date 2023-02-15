import React, { useState, useEffect } from "react"
import { Grid, List, Card, Divider, Button } from "@mui/material"
import Typography from "@mui/joy/Typography"
import drink from "../../assets/drink.png"

import ListItemButton from "@mui/material/ListItemButton"
import { Box, textAlign } from "@mui/system"
import loading from "../../assets/loadinggif.gif"

function MenuListItem(props) {
  const drinkListData = props.data
  const [isSelected, setIsSelected] = useState(-1)
  // const [selectedIndex, setSelectedIndex] = useState(0)
  // const [selectedCaffeine, setSelectedCaffeine] = useState(0)
  // const [selectedSugar, setSelectedSugar] = useState(0)
  // const [selectedCal, setSelectedCal] = useState(0)
  // const [selectedPrice, setSelectedPrice] = useState(0)

  // const handleListItemClick = (event, index) => {
  //   setSelectedIndex((prevIndex) => {
  //     // console.log(index)
  //     for (var i = 0; i < drinkListData.length; i++) {
  //       if (index === drinkListData[i].drinkId) {
  //         setSelectedCaffeine(()=>drinkListData[i].caffeine)
  //         setSelectedSugar(()=>drinkListData[i].sugar)
  //         setSelectedCal(()=>drinkListData[i].cal)
  //         setSelectedPrice(()=>drinkListData[i].price)
  //         break
  //       }
  //     }
  //     return index
  //   })
  // }
  // console.log(selectedCaffeine,selectedSugar,selectedCal,selectedPrice)

  // console.log(selectedIndex)
  // console.log("drinkListData", drinkListData)

  if (!props.data || !props.data.length) {
    return (
      <div>
        <img src={loading} alt={loading} style={{ maxWidth: "300px" }} />
        <Typography
          style={{
            fontSize: "30px",
            position: "absolute",
            bottom: "250px",
            left: "50px",
          }}
        >
          {"음료를 선택하세요:)"}
        </Typography>
      </div>
    )
  }

  return (
    <List>
      {drinkListData.map((menu, index) => {
        return (
          <Box sx={{ backgroundColor: "white" }} key={index}>
            <Divider />
            <Card
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "2px",
                marginBottom: "2px",
                borderRadius: "10px",
              }}
              sx={
                isSelected === index
                  ? { backgroundColor: "#FFBA00" }
                  : { backgroundColor: "white" }
              }
              onClick={() => {
                setIsSelected(index)
                props.getSelectedDrink(menu)
              }}
            >
              <Grid container display={"flex"} alignItems="center">
                <Grid item xs={3} display={"flex"} alignItems="center">
                  <img alt="menuImg" src={menu.img} width="90%" />
                </Grid>
                <Grid item xs={9}>
                  <Typography>{menu.drinkName}</Typography>
                  <Typography>
                    {menu.caffeine}mg / {menu.sugar}g / {menu.cal}kcal /{" "}
                    {menu.price}원
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          </Box>
        )
      })}
    </List>
  )
}

export default MenuListItem
