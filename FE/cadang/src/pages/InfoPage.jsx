import * as React from "react";
import Typography from "@mui/joy/Typography";
import { Paper, Box, Grid } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import Button from "@mui/material-next/Button";
import Stack from "@mui/material/Stack";
import styled from "styled-components";

import ade from "../assets/menus/ade.png"
import americano from "../assets/menus/americano.png"
import coke from "../assets/menus/coke.png"
import frappe from "../assets/menus/frappe.png"
import juice from "../assets/menus/juice.png"
import latte from "../assets/menus/latte.png"

function InfoPage() {
  return (
    <Paper elevation={2} sx={{ backgroundColor: "#EFF5F5" , paddingTop: 1} }>
      <Paper sx={{ width: "90%", paddingTop: 3, mx: 'auto', mt: 2}}>
        <Box mx={2}>
          <titleDiv>목표량을 정해 볼까요?</titleDiv>
          <titleDiv>카페인 일일 섭취 권고량은 400mg 입니다.</titleDiv>
          <titleDiv>당류 일일 섭취 권고량은 25g 입니다.</titleDiv>
          <titleDiv>아메리카노</titleDiv>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6} >
              <ListItem>
                <img width='50%'src={americano} alt="americano" />
                
                <ListItemText primary="아메리카노" secondary="140mg, 0g" />
              </ListItem>
            </Grid>
            <Grid item xs={6}>
              <ListItem>
              <img width='50%'src={latte} alt="latte" />
                <ListItemText primary="카페모카" secondary="140mg, 15.1g" />
              </ListItem>
            </Grid>
            <Grid item xs={6}>
              <ListItem>
              <img width='50%'src={frappe} alt="frappe" />
                <ListItemText primary="스무디" secondary="140mg, 30~80g" />
              </ListItem>
            </Grid>
            <Grid item xs={6}>
              <ListItem>
              <img width='50%'src={coke} alt="coke" />
                <ListItemText primary="콜라" secondary="25mg, 11g" />
              </ListItem>
            </Grid>
            <Grid item xs={6}>
              <ListItem>
              <img width='50%'src={juice} alt="juice" />
                <ListItemText primary="과일주스" secondary="0mg, 8~12g" />
              </ListItem>
            </Grid>
            <Grid item xs={6}>
              <ListItem>
              <img width='50%'src={ade} alt="ade" />
                <ListItemText primary="에이드" secondary="0mg, 42~62g" />
              </ListItem>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Box width='90%' my={3} mx='auto'>
        <Grid container>
          <Grid item xs={6} style={{ background: "rgba(232, 222, 248)", borderRadius: "10px", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <goalCard>☕ 카페인 목표량</goalCard>
          </Grid>
          <Grid item xs={6} >
            <TextField id="standard-basic" placeholder="목표량 입력" variant="standard" />
          </Grid>
          <Grid item xs={12}>
            <div style={{height: '15px'}}></div>
          </Grid>

          <Grid item xs={6} style={{ background: "rgba(232, 222, 248)", borderRadius: "10px", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", }}>
            <goalCard>🍯 당 목표량</goalCard>
          </Grid>
          <Grid item xs={6}>
            <TextField style={{ height: "100%" }} id="standard-basic" placeholder="목표량 입력" variant="standard" />
          </Grid>
        </Grid>
      </Box>
      <Stack spacing={1} width="50%" margin="auto">
        <Button
          variant="filledTonal"
          sx={{
            "&:hover, &.Mui-focusVisible": {
              zIndex: 1,
              backgroundColor: "#F99417",
            },
          }}
        >
          입력완료
        </Button>
        <Button variant="text">나중에 설정하기</Button>
      </Stack>
    </Paper>
  );
}

const goalCard = styled.div`
  text-align: center;
`
const titleDiv = styled.div`
  font-size: 2em;

`

export default InfoPage;
