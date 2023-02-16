import * as React from "react"
import { Box, Button, Grid, Typography } from "@mui/material"
import TextField from "@mui/material/TextField"
import coffeebean from "../../assets/coffeebean.png"
import sugar from "../../assets/sugar.png"
import styled from "styled-components"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useEffect } from "react"

export default function GoalSettingItem(props) {
  console.log(props)
  const theme = createTheme({
    palette: {
      primary: {
        main: "#3A130C",
      },
    },
    typography: {
      fontFamily: "netmarble",
    },
  })

  // useEffect(()=> {

  // }, [props])

  return (
    <ThemeProvider theme={theme}>
      <Box width="90%" my={3} mx="auto">
        <Grid container rowGap={2}>
          <Grid
            item
            xs={6}
            style={{
              background: "#ffba00",
              borderRadius: "10px",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={coffeebean} alt={coffeebean} style={{ width: "20%" }} />
            <Typography
              style={{
                fontFamily: "netmarble",
                fontSize: "20px",
              }}
            >
              카페인 목표량
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="standard-basic"
              placeholder="목표량(mg)"
              variant="standard"
              onChange={props.onChangeCaffeineGoal}
              value={props.changedProfile.caffeGoal}
              style={{ marginLeft: "10px" }}
              inputProps={{
                style: {
                  caretColor: "orange",
                },
              }}
            />
          </Grid>

          <Grid
            item
            xs={6}
            style={{
              background: "#ffba00",
              borderRadius: "10px",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={sugar} alt={sugar} style={{ width: "30px" }} />
            <Typography
              style={{
                fontFamily: "netmarble",
                fontSize: "20px",
              }}
            >
              당 목표량
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="standard-basic"
              placeholder="목표량(g)"
              variant="standard"
              onChange={props.onChangeSugarGoal}
              value={props.changedProfile.sugarGoal}
              style={{ marginLeft: "10px", fontFamily: "netmarble" }}
              inputProps={{
                style: {
                  caretColor: "orange",
                },
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  )
}
