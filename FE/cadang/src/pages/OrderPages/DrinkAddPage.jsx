import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Box, Divider, Grid, Card } from "@mui/material";
import { Typography, Button } from "@mui/joy";
import SearchIcon from "@mui/icons-material/Search";
import MenuListItem from "../../components/util/MenuListItem";
import FabButton from "../../components/util/FabButton";

// 검색바
import TextField from "@mui/material/TextField";
import AutocompleteSearchBar from "../../components/util/AutocompleteSearchBar";
import { searchDrinkMenu } from "../../api/order";

function DrinkAddPage() {
  // 검색어 변수 설정
  const [selectedFranchise, setSelectedFranchise] = useState({
    id: 0,
    franchiseName: "",
  });
  const [branchOptionInput, setbranchOptionInput] = useState("");
  const [keywordInput, setkeywordInput] = useState("");

  const [resultItem, setResultItem] = useState({
    drinkId: -1,
    drinkName: "",
    size: "",
    vol: -1,
    img: "",
    caffeine: -1,
    sugar: -1,
    cal: -1,
    price: -1,
    shot: -1,
    whip: true,
    franchiseId: -1,
    storeName: "",
    cnt: -1,
  });
  const [selectedDrink, setSelectedDrink] = useState({
    drinkId: null,
    drinkName: "",
    size: null,
    vol: null,
    img: "",
    caffeine: 0,
    sugar: 0,
    cal: 0,
    price: 0,
    shot: null,
    whip: null,
    franchiseId: null,
    storeName: null,
    cnt: 0,
  });
  const [next, setNext] = useState(false);

  // input data 반영
  const getSelectedFranchise = (selectCafe) => {
    setSelectedFranchise(selectCafe);
  };

  const onChangeKeywordInput = (e) => {
    setkeywordInput(e.target.value);
  };

  const onChangeBranchInput = (e) => {
    setbranchOptionInput(e.target.value);
  };

  const getSearchResult = async () => {
    await searchDrinkMenu(
      selectedFranchise.id,
      keywordInput,
      (res) => {
        return res.data;
      },
      (err) => console.log(err)
    ).then((data) => setResultItem(data));
  };

  const getSelectedDrink = (selectDrink) => {
    setSelectedDrink(selectDrink);
  };

  const finalData = {
    franchiseId: selectedFranchise.id,
    franchiseName: selectedFranchise.franchiseName,
    drink: selectedDrink,
    branch: branchOptionInput,
  };

  console.log("*** FinalData : " + selectedDrink.drinkId);

  const nextPage = (event) => {
    console.log("next Page 이동을 위한 클릭!!!! : " + finalData.drink.drinkId);
    if (next === false) {
      event.preventDefault();
      alert("음료를 선택해 주세요🙏");
    }
  };

  return (
    <div>
      <div style={{ position: "sticky", top: 0, zIndex: 1 }}>
        <Card
          sx={{
            backgroundColor: "#FFEDDE",
            paddingY: 2,
            paddingX: 1,
            marginTop: 1,
            border: "2px solid #3a130c",
          }}
        >
          <Typography level="h3" fontSize="xl" fontWeight="xl">
            메뉴검색
          </Typography>

          <Grid container xs={12} alignItems="center" textAlign="center">
            <Grid item xs={1.2}>
              카페
            </Grid>
            <Grid item xs={4.5}>
              <AutocompleteSearchBar
                label="카페 검색"
                data={cafeList}
                getSelectedFranchise={getSelectedFranchise}
              />
            </Grid>
            <Grid item xs={0.5}></Grid>
            <Grid item xs={1.5}>
              <Typography>지점</Typography>
            </Grid>
            <Grid item xs={4}>
              {/* padding 0으로 바꾸기 */}
              <TextField
                id="outlined-basic"
                label="지점 입력"
                variant="outlined"
                size="small"
                onChange={onChangeBranchInput}
                style={{ fontFamily: "netmarble", fontSize: "16px" }}
              />
            </Grid>
          </Grid>
          <Grid container xs={12}>
            <Grid item xs={1.5}>
              <Typography>메뉴</Typography>
            </Grid>
            <Grid item xs={7.5}>
              <TextField
                id="outlined-basic"
                label="메뉴명 검색"
                variant="outlined"
                size="small"
                onChange={onChangeKeywordInput}
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                fullWidth
                variant="solid"
                startDecorator={<SearchIcon />}
                onClick={getSearchResult}
                style={{ padding: "0px" }}
              >
                검색
              </Button>
            </Grid>
          </Grid>

          <Divider />
        </Card>
      </div>
      <MenuListItem
        data={resultItem}
        getSelectedDrink={getSelectedDrink}
        setNext={setNext}
      />
      <Link
        to={{ pathname: `/custom`, state: { finalData } }}
        onClick={nextPage}
      >
        <FabButton />
      </Link>
    </div>
  );
}

const cafeList = [
  { id: 10, franchiseName: "매머드커피" },
  { id: 7, franchiseName: "메가MGC커피" },
  { id: 5, franchiseName: "바나프레소" },
  { id: 4, franchiseName: "빽다방" },
  { id: 9, franchiseName: "스타벅스" },
  { id: 8, franchiseName: "이디야" },
  { id: 2, franchiseName: "컴포즈커피" },
  { id: 3, franchiseName: "투썸플레이스" },
  { id: 6, franchiseName: "파스쿠찌" },
  { id: 1, franchiseName: "폴바셋" },
  { id: 11, franchiseName: "할리스" },
];

export default DrinkAddPage;
