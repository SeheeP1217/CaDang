import * as React from "react"
import { Box, Grid, Typography } from "@mui/material"
import TextField from "@mui/material/TextField"
import coffeebean from "../../assets/coffeebean.png"
import sugar from "../../assets/sugar.png"
import { createTheme, ThemeProvider } from "@mui/material/styles"

export default function GoalSettingItem(props) {
  console.log(props)
  const theme = createTheme({
    palette: {
      primary: {
        main: "#3A130C",
      },
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
                fontSize: "18px",
              }}
            >
              카페인 목표량
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="standard-basic"
              placeholder="목표량(mg)"
              variant="standard"
              onChange={props.onChangeCaffeineGoal}
              value={props?.caffeGoal}
              style={{ marginLeft: "10px" }}
              inputProps={{
                style: {
                  caretColor: "orange",
                  textAlign: "center",
                },
              }}
            />
          </Grid>
          <Grid item xs={2}>
            mg
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
                fontSize: "18px",
              }}
            >
              당 목표량
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="standard-basic"
              placeholder="목표량(g)"
              variant="standard"
              onChange={props.onChangeSugarGoal}
              value={props?.sugarGoal}
              style={{
                marginLeft: "10px",
              }}
              inputProps={{
                style: {
                  caretColor: "orange",
                  textAlign: "center",
                },
              }}
            />
          </Grid>
          <Grid item xs={2}>
            g
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  )
}
