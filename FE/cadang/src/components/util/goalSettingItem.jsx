import * as React from "react";
import { Box, Button, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";

export default function goalSettingItem(props) {
  return (
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
        >☕ 카페인 목표량
        </Grid>
        <Grid item xs={6}>
        <TextField id="standard-basic" label="목표량(mg)" variant="standard"
        onChange={props.onChangeCaffeineGoal}
        defaultValue={props.caffeineGoal ? props.caffeineGoal: '400'}/>
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
        🍯 당 목표량
        </Grid>
        <Grid item xs={6}>
        <TextField id="standard-basic" label="목표량(g)" variant="standard" 
        defaultValue={props.sugarGoal ? props.sugarGoal : '25'}
        onChange={props.onChangeSugarGoal}/>
        </Grid>
      </Grid>
    </Box>
  )
}
