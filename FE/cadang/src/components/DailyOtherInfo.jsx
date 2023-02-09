import Typography from "@mui/joy/Typography";
import { List } from "@mui/material";

function DailyOtherInfo(props) {
  console.log(props.money);
  return (
    <List>
      {props !== undefined && (
        <Typography textAlign="center" alignItems="center">
          💰 {props.money} | 🍔 {props.kcal}
        </Typography>
      )}
    </List>
  );
}

export default DailyOtherInfo;
