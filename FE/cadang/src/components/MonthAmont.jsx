import * as React from "react"
import { Card, Grid } from "@mui/material"
import styled from "styled-components"

const money = 30000

export default function MonthAmount() {
  return (
    <AmountCard>
      <AmountGrid>2월 음료 총 지출은 {money}원 입니다.</AmountGrid>
    </AmountCard>
  )
}

const AmountGrid = styled(Grid)`
  padding: 7px !important;
`
const AmountCard = styled(Card)`
  margin: 2px
`