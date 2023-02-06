import * as React from "react"
import { Card, Grid } from "@mui/material"
import "./MonthAmount.css"

export default function MonthAmount() {
  return (
    <Card>
      <Grid className="paper">
        <h3>이번 달 음료 총 지출은 50000원 입니다.</h3>
      </Grid>
    </Card>
  )
}
