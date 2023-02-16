import React, { useState } from "react"
import Typography from "@mui/joy/Typography"
import { Paper, Box, Grid } from "@mui/material"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import TextField from "@mui/material/TextField"
import Button from "@mui/material-next/Button"
import Stack from "@mui/material/Stack"
import styled from "styled-components"
import GoalSettingItem from "../../components/util/goalSettingItem"
import coffeebean from "../../assets/coffeebean.png"
import sugar from "../../assets/sugar.png"

import ade from "../../assets/menus/ade.png"
import americano from "../../assets/menus/americano.png"
import coke from "../../assets/menus/coke.png"
import frappe from "../../assets/menus/frappe.png"
import juice from "../../assets/menus/juice.png"
import latte from "../../assets/menus/latte.png"
import { useEffect } from "react"
import { useHistory, Link } from "react-router-dom"
import { setUserGoal } from "../../api/user"
import { fontFamily } from "@mui/system"

function InfoPage() {
  const history = useHistory()
  const [caffeineGoal, setCaffeineGoal] = useState(400)
  const [sugarGoal, setSugarGoal] = useState(25)

  const onChangeCaffeineGoal = (e) => {
    setCaffeineGoal(e.target.value)
  }

  const onChangeSugarGoal = (e) => {
    setSugarGoal(e.target.value)
  }

  console.log(caffeineGoal)
  console.log(sugarGoal)

  const setDrinkGoal = async () => {
    await setUserGoal(
      caffeineGoal,
      sugarGoal,
      (res) => {
        console.log(res)
        return res.data
      },
      (err) => console.log(err)
    )
      .then((response) => {
        console.log(response, "성공")
        if (response === "success") {
          history.push("/main")
        }
      })
      .catch(function (err) {
        console.log(err)
      })
  }

  return (
    <Paper elevation={2} sx={{ backgroundColor: "#F9F6F2", paddingTop: 1 }}>
      <Paper sx={{ width: "95%", paddingTop: 3, mx: "auto", mt: 1 }}>
        <Grid mx={2}>
          <div>목표량을 정해 볼까요?</div>
          <div>카페인 일일 섭취 권고량은 400mg 입니다.</div>
          <div>당류 일일 섭취 권고량은 25g 입니다.</div>
        </Grid>
        <Grid container sx={{ width: "100%", ml: 5, mt: 2 }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid
              container
              xs={5}
              alignItems="center"
              spacing={1}
              style={{ height: "110px" }}
            >
              <Grid item xs={4}>
                <img width="130%" src={americano} alt="americano" />
              </Grid>
              <Grid item xs={8}>
                <Typography style={{ whiteSpace: "normal", lineHeight: 1.2 }}>
                  아메리카노
                </Typography>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={coffeebean}
                    alt="coffeebean"
                    style={{ width: "22px", height: "22px" }}
                  />
                  <Typography style={{ fontSize: "12px" }}>140mg</Typography>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={sugar}
                    alt="sugar"
                    style={{ width: "22px", height: "22px" }}
                  />
                  <Typography style={{ fontSize: "12px" }}>0g</Typography>
                </div>
              </Grid>
            </Grid>

            <Grid
              container
              xs={5}
              alignItems="center"
              spacing={1}
              style={{ height: "110px" }}
            >
              <Grid item xs={4}>
                <img width="130%" src={latte} alt="latte" />
              </Grid>
              <Grid item xs={8}>
                <Typography style={{ whiteSpace: "normal", lineHeight: 1.2 }}>
                  카페모카
                </Typography>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={coffeebean}
                    alt="coffeebean"
                    style={{ width: "22px", height: "22px" }}
                  />
                  <Typography style={{ fontSize: "12px" }}>140mg</Typography>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={sugar}
                    alt="sugar"
                    style={{ width: "22px", height: "22px" }}
                  />
                  <Typography style={{ fontSize: "12px" }}>15.1g</Typography>
                </div>
              </Grid>
            </Grid>

            <Grid
              container
              xs={5}
              alignItems="center"
              spacing={1}
              style={{ height: "110px" }}
            >
              <Grid item xs={4}>
                <img width="130%" src={frappe} alt="frappe" />
              </Grid>
              <Grid item xs={8}>
                <Typography style={{ whiteSpace: "normal", lineHeight: 1.2 }}>
                  스무디
                </Typography>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={coffeebean}
                    alt="coffeebean"
                    style={{ width: "22px", height: "22px" }}
                  />
                  <Typography style={{ fontSize: "12px" }}>0~140mg</Typography>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={sugar}
                    alt="sugar"
                    style={{ width: "22px", height: "22px" }}
                  />
                  <Typography style={{ fontSize: "12px" }}>30~80g</Typography>
                </div>
              </Grid>
            </Grid>

            <Grid
              container
              xs={5}
              alignItems="center"
              spacing={1}
              style={{ height: "110px" }}
            >
              <Grid item xs={4}>
                <img width="130%" src={coke} alt="coke" />
              </Grid>
              <Grid item xs={8}>
                <Typography style={{ whiteSpace: "normal", lineHeight: 1.2 }}>
                  콜라
                </Typography>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={coffeebean}
                    alt="coffeebean"
                    style={{ width: "22px", height: "22px" }}
                  />
                  <Typography style={{ fontSize: "12px" }}>25mg</Typography>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={sugar}
                    alt="sugar"
                    style={{ width: "22px", height: "22px" }}
                  />
                  <Typography style={{ fontSize: "12px" }}>11g</Typography>
                </div>
              </Grid>
            </Grid>

            <Grid
              container
              xs={5}
              alignItems="center"
              spacing={1}
              style={{ height: "110px" }}
            >
              <Grid item xs={4}>
                <img width="130%" src={juice} alt="juice" />
              </Grid>
              <Grid item xs={8}>
                <Typography style={{ whiteSpace: "normal", lineHeight: 1.2 }}>
                  과일주스
                </Typography>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={coffeebean}
                    alt="coffeebean"
                    style={{ width: "22px", height: "22px" }}
                  />
                  <Typography style={{ fontSize: "12px" }}>0mg</Typography>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={sugar}
                    alt="sugar"
                    style={{ width: "22px", height: "22px" }}
                  />
                  <Typography style={{ fontSize: "12px" }}>8~12g</Typography>
                </div>
              </Grid>
            </Grid>

            <Grid
              container
              xs={5}
              alignItems="center"
              spacing={1}
              style={{ height: "110px" }}
            >
              <Grid item xs={4}>
                <img width="130%" src={ade} alt="ade" />
              </Grid>
              <Grid item xs={8}>
                <Typography style={{ whiteSpace: "normal", lineHeight: 1.2 }}>
                  에이드
                </Typography>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={coffeebean}
                    alt="coffeebean"
                    style={{ width: "22px", height: "22px" }}
                  />
                  <Typography style={{ fontSize: "12px" }}>0mg</Typography>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={sugar}
                    alt="sugar"
                    style={{ width: "22px", height: "22px" }}
                  />
                  <Typography style={{ fontSize: "12px" }}>42~62g</Typography>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      <GoalSettingItem
        onChangeCaffeineGoal={onChangeCaffeineGoal}
        onChangeSugarGoal={onChangeSugarGoal}
      />
      <Stack spacing={1} width="50%" margin="auto">
        <Button
          variant="filledTonal"
          sx={{
            backgroundColor: "#ffab00",
            color: "white",
            fontSize: "20px",
            fontFamily: "netmarble",
          }}
          onMouseDown={setDrinkGoal}
        >
          입력완료
        </Button>
        <Button
          component={Link}
          to="/main"
          variant="text"
          style={{ color: "black", fontFamily: "netmarble" }}
        >
          나중에 설정하기
        </Button>
      </Stack>
    </Paper>
  )
}

const CaffeAmount = styled(Typography)`
  font-family: netmarble;
`

export default InfoPage
