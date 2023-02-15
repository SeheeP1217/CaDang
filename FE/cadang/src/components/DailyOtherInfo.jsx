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
          <Grid item xs={1.5}>
            <img src={coin} alt="coin" width="30px" />
          </Grid>
          <Grid item xs={4.5}>
            {props.data.moneyDaily}
            {props.changedOtherInfo.money
              ? ` + ${props.changedOtherInfo.money}`
              : ""}{" "}
            원
          </Grid>
          <Grid item xs={1.5}>
            <img src={calories} alt="calories" width="30px" />
          </Grid>
          <Grid item xs={4.5}>
            {props.data.calDaily}
            {props.changedOtherInfo.cal
              ? ` + ${props.changedOtherInfo.cal}`
              : ""}{" "}
            Kcal
          </Grid>
        </Grid>
      )}
    </List>
  )
}

export default DailyOtherInfo
