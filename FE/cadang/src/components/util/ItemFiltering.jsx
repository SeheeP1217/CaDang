import React, { useState, useEffect } from "react";
import MenuListItem from "./MenuListItem";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { Paper, Grid, Divider, Card, List } from "@mui/material";

function ItemFiltering(props) {
  const ListData = props.menu;
  // console.log("ListData", ListData.drinkableDrinks)
  const [filter, setFilter] = useState(true);
  const [sortType, setSortType] = useState("caffeine");
  console.log(sortType);
  const [next, setNext] = useState(false);

  const [showData, setShowData] = useState([]);
  function onClickFilter() {
    if (filter === false) {
      setShowData(() => ListData.drinkableDrinks);
      setFilter(() => true);
    } else if (filter === true) {
      setShowData(() => ListData.allDrinks);
      setFilter(() => false);
    }
  }
  /* eslint-disable */
  useEffect(() => {
    if (filter === false) {
      setShowData(() => ListData.drinkableDrinks);
      setFilter(() => true);
    } else if (filter === true) {
      setShowData(() => ListData.allDrinks);
      setFilter(() => false);
    }
  }, [ListData.drinkableDrinks]);

  useEffect(() => {
    const sortArray = (type) => {
      const types = {
        caffeine: "caffeine",
        sugar: "sugar",
        cal: "cal",
        price: "price",
        cnt: "cnt",
      };
      const sortProperty = types[type];
      const sorted = [...showData].sort((a, b) => a[sortProperty] - b[sortProperty]);
      const reverseSorted = [...showData].sort((a, b) => b[sortProperty] - a[sortProperty]);
      if (type === types.cnt) {
        setShowData(reverseSorted);
      } else {
        setShowData(sorted);
      }
    };

    sortArray(sortType);
  }, [sortType, filter]);

  return (
    <Card>
      <Grid container sx={{ display: "flex" }} justifyContent="end" alignItems="center">
        <Grid item>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="되는 음료만 보기"
            labelPlacement="end"
            margin="0"
            onClick={onClickFilter}
          />

          <FormControl size="small" sx={{ paddingTop: 1 }}>
            <NativeSelect defaultValue="caffeine" onChange={(e) => setSortType(e.target.value)}>
              <option value="caffeine">낮은 카페인순</option>
              <option value="sugar">낮은 당순</option>
              <option value="cal">낮은 칼로리순</option>
              <option value="price">낮은 가격순</option>
              <option value="cnt">많이 마신순</option>
            </NativeSelect>
          </FormControl>
        </Grid>
        <Grid item>
          <MenuListItem
            data={showData}
            getSelectedDrink={props.getSelectedDrink}
            setNext={setNext}
          />
        </Grid>
      </Grid>
    </Card>
  );
}

const menuData = [
  { pk: 1, name: "카페라떼", caffeine: 300, sugar: 10, cal: 200, price: 3000 },
  {
    pk: 2,
    name: "바닐라 라떼",
    caffeine: 200,
    sugar: 20,
    cal: 300,
    price: 5000,
  },
  {
    pk: 3,
    name: "아이스 아메리카노",
    caffeine: 100,
    sugar: 30,
    cal: 100,
    price: 4500,
  },
];

export default ItemFiltering;
