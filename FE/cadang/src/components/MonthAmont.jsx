import * as React from "react"
import { Card, Grid, Typography } from "@mui/material"
import styled from "styled-components"
import { createTheme, ThemeProvider } from "@mui/material/styles"

const money = 30000

export default function MonthAmount(props) {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#3A130C",
      },
    },
  })
  console.log("월월", props)
  return (
    <ThemeProvider theme={theme}>
      <AmountCard>
        <AmountGrid>
          <Typography>
            2월 음료 총 지출은{" "}
            <span style={{ backgroundColor: "#ffba00" }}>
              {props.totalPrice}원
            </span>{" "}
            입니다.
          </Typography>
        </AmountGrid>
      </AmountCard>
    </ThemeProvider>
  )
}

const AmountGrid = styled(Grid)`
  padding: 7px !important;
`
const AmountCard = styled(Card)`
  border-top: 6px solid #ffba00 !important;
  margin: 2px;
  margin-top: 10px !important;
`
