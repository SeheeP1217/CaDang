import Typography from "@mui/joy/Typography"
import { List, Grid } from "@mui/material"
import coin from "../assets/coin.png"
import calories from "../assets/calories.png"

function DailyOtherInfo(props) {
  console.log(props.changedOtherInfo)
  return (
    <List>
      {props !== undefined && (
        <Grid container xs={12}>
          <Grid item xs={0.2} />
          <Grid item xs={1.3}>
            <img src={coin} alt="coin" width="28px" />
          </Grid>
          <Grid item xs={4.5} style={{ fontSize: "15px" }}>
            {props.data.moneyDaily}
            {props.changedOtherInfo.money
              ? ` + ${props.changedOtherInfo.money}`
              : ""}{" "}
            원
          </Grid>
          <Grid item xs={1.2}>
            <img src={calories} alt="calories" width="28px" />
          </Grid>
          <Grid item xs={4.5} style={{ fontSize: "15px" }}>
            {props.data.calDaily}
            {props.changedOtherInfo.cal
              ? ` + ${props.changedOtherInfo.cal}`
              : ""}{" "}
            Kcal
          </Grid>
          <Grid item xs={0.3} />
        </Grid>
      )}
    </List>
  )
}

export default DailyOtherInfo
