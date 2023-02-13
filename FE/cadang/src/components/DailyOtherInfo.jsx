import Typography from "@mui/joy/Typography";
import { List } from "@mui/material";

function DailyOtherInfo(props) {
  console.log(props.money);
  return (
    <List>
      {props !== undefined && (
        <Typography textAlign="center" alignItems="center">
          💰 {props.data.moneyDaily} 원 | 🍔 {props.data.calDaily} Kcal
        </Typography>
      )}
    </List>
  );
}

export default DailyOtherInfo;
