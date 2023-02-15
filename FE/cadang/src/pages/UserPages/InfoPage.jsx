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

import ade from "../../assets/menus/ade.png"
import americano from "../../assets/menus/americano.png"
import coke from "../../assets/menus/coke.png"
import frappe from "../../assets/menus/frappe.png"
import juice from "../../assets/menus/juice.png"
import latte from "../../assets/menus/latte.png"
import { useEffect } from "react"
import { useHistory, Link } from "react-router-dom"
import { setUserGoal } from "../../api/user"

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
        <Box mx={2}>
          <div>목표량을 정해 볼까요?</div>
          <div>카페인 일일 섭취 권고량은 400mg 입니다.</div>
          <div>당류 일일 섭취 권고량은 25g 입니다.</div>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <ListItem>
                <img width="50%" src={americano} alt="americano" />
                <ListItemText primary="아메리카노" secondary="140mg, 0g" />
              </ListItem>
            </Grid>
            <Grid item xs={6}>
              <ListItem>
                <img width="50%" src={latte} alt="latte" />
                <ListItemText primary="카페모카" secondary="140mg, 15.1g" />
              </ListItem>
            </Grid>
            <Grid item xs={6}>
              <ListItem>
                <img width="50%" src={frappe} alt="frappe" />
                <ListItemText primary="스무디" secondary="140mg, 30~80g" />
              </ListItem>
            </Grid>
            <Grid item xs={6}>
              <ListItem>
                <img width="50%" src={coke} alt="coke" />
                <ListItemText primary="콜라" secondary="25mg, 11g" />
              </ListItem>
            </Grid>
            <Grid item xs={6}>
              <ListItem>
                <img width="50%" src={juice} alt="juice" />
                <ListItemText primary="과일주스" secondary="0mg, 8~12g" />
              </ListItem>
            </Grid>
            <Grid item xs={6}>
              <ListItem>
                <img width="50%" src={ade} alt="ade" />
                <ListItemText primary="에이드" secondary="0mg, 42~62g" />
              </ListItem>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <GoalSettingItem
        onChangeCaffeineGoal={onChangeCaffeineGoal}
        onChangeSugarGoal={onChangeSugarGoal}
      />
      <Stack spacing={1} width="50%" margin="auto">
        <Button
          variant="filledTonal"
          sx={{ backgroundColor: "#ffba00" }}
          onMouseDown={setDrinkGoal}
        >
          입력완료
        </Button>
        <Link to={"/main"}>
          <Button variant="text">나중에 설정하기</Button>
        </Link>
      </Stack>
    </Paper>
  )
}

export default InfoPage
