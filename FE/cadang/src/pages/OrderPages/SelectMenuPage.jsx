import React, { useMemo, useState, useEffect } from "react";
import { Box, Card, Typography } from "@mui/material";
import Button from "@mui/material-next/Button";
import FabButton from "../../components/util/FabButton";
import { Link } from "react-router-dom";

import DailyConsumptionGraph from "../../components/util/DailyConsumptionGraph";
import ItemFiltering from "../../components/util/ItemFiltering";
import DailyOtherInfo from "../../components/DailyOtherInfo";

import { cafeDrinkList } from "../../api/order";
import { useRecoilValue } from "recoil";
import { todayDate } from "../../recoil/atom/user";

function SelectMenuPage(props) {
  const date = useRecoilValue(todayDate);
  const [storeName, setStoreName] = useState(props.location.state.cafe);
  const distance = props.location.state.dist;

  useEffect(() => {
    setStoreName(props.location.state.cafe);
  }, [storeName]);

  // const [possible, setPossible] = useState([])
  // const [impossible, setImpossible] = useState([])
  // const [all, setAll] = useState([])

  const [selectDrinkInfo, setSelectDrinkInfo] = useState({
    drinkId: -1,
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
    franchiseId: -1,
    storeName: storeName,
    cnt: 0,
  });

  const getSelectedDrink = (selectDrink) => {
    setSelectDrinkInfo({
      ...selectDrink,
      storeName: storeName,
    });
  };

  const [menu, setMenu] = useState({
    drinkableDrinks: [
      {
        drinkId: 0,
        drinkName: "",
        size: "",
        vol: 0,
        img: "",
        caffeine: 0,
        sugar: 0,
        cal: 0,
        price: 0,
        shot: 0,
        whip: true,
        franchiseId: 0,
        storeName: "",
        cnt: 0,
      },
    ],
    allDrinks: [
      {
        drinkId: 0,
        drinkName: "",
        size: "",
        vol: 0,
        img: "",
        caffeine: 0,
        sugar: 0,
        cal: 0,
        price: 0,
        shot: 0,
        whip: true,
        franchiseId: 0,
        storeName: "",
        cnt: 0,
      },
    ],
    dayDataDto: {
      id: 0,
      userId: 0,
      date: "2023-02-09",
      caffeGoal: 0,
      sugarGoal: 0,
      caffeDaily: 0,
      sugarDaily: 0,
      calDaily: 0,
      moneyDaily: 0,
      caffeSuccess: true,
      sugarSuccess: true,
    },
    franchiseId: 0,
    storeId: 0,
    storeName: "",
  });
  const consumptionInfo = menu.dayDataDto;
  const [changedOtherInfo, setChangedOtherInfo] = useState({
    money: 0,
    cal: 0,
  });
  useMemo(() => {
    const getMenus = async () => {
      await cafeDrinkList(
        date,
        storeName,
        (res) => {
          console.log("Response was successful:", res.data);
          setMenu(res.data);
        },
        (err) => {
          console.log(err);
        }
      );
    };

    getMenus();
  }, []);
  // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", menu);

  // useEffect(() => {
  //   getSelectedDrink()
  //   console.log(selectDrinkInfo)
  // }, [selectDrinkInfo]);

  // console.log("/////////-------/////////", menu);

  useEffect(() => {
    setChangedOtherInfo({
      money: selectDrinkInfo.price,
      cal: selectDrinkInfo.cal,
    });
  }, [selectDrinkInfo]);

  const finalData = {
    franchiseId: menu.franchiseId,
    franchiseName: storeName,
    drink: selectDrinkInfo,
    branch: "",
  };
  console.log("**** selctDrinkInfo : " + selectDrinkInfo);

  const nextPage = (event) => {
    console.log("next Page 이동을 위한 클릭!!!!");
    if (selectDrinkInfo.drinkId === -1) {
      event.preventDefault();
      alert("음료를 선택해 주세요🙏");
    }
  };

  return (
    <body>
      <div style={{ position: "sticky", top: 0, zIndex: 1 }}>
        <Box sx={{ backgroundColor: "#F9F6F2", paddingY: 0.3 }}>
          <Box sx={{ flexGrow: 1 }} textAlign="center">
            <Card style={{ height: "36px" }}>
              <Typography
                style={{
                  fontFamily: "netmarble",
                  fontSize: "22px",
                  margin: "auto",
                }}
              >
                {storeName} | {distance}m{/* <Button>상세 페이지</Button> */}
              </Typography>
            </Card>
          </Box>
          <Card style={{ marginTop: 15 }}>
            <DailyConsumptionGraph
              selectDrinkInfo={selectDrinkInfo}
              consumptionInfo={consumptionInfo}
            />
            <DailyOtherInfo
              data={menu.dayDataDto}
              changedOtherInfo={changedOtherInfo}
            ></DailyOtherInfo>
          </Card>
          <Card sx={{ marginY: 2 }}>{/* <DailyConsumptionGraph data={afterSelectData} /> */}</Card>
        </Box>
      </div>
      <ItemFiltering menu={menu} getSelectedDrink={getSelectedDrink} />
      {/* {drinkItem !== undefined && <Typography>{drinkItem.caffeine}mg</Typography>} */}
      <Link
        to={{
          pathname: `/payment/custom`,
          state: { drinkItem: selectDrinkInfo },
        }}
        onClick={nextPage}
      >
        <FabButton />
      </Link>
    </body>
  );
}

export default SelectMenuPage;
