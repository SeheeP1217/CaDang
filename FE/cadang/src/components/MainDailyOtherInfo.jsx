import Typography from "@mui/joy/Typography"
import { List, Grid } from "@mui/material"
import coin from "../assets/coin.png"
import calories from "../assets/calories.png"

function MainDailyOtherInfo(props) {
  return (
    <List>
      {props !== undefined && (
        <Grid container xs={12}>
          <Grid item xs={1.5} />
          <Grid item xs={1.5}>
            <img src={coin} alt="coin" width="30px" />
          </Grid>
          <Grid item xs={3}>
            {props.data.moneyDaily} 원
          </Grid>
          <Grid item xs={1.5}>
            <img src={calories} alt="calories" width="30px" />
          </Grid>
          <Grid item xs={4}>
            {props.data.calDaily} Kcal
          </Grid>
          <Grid item xs={0.5} />
        </Grid>
      )}
    </List>
  )
}

export default MainDailyOtherInfo
