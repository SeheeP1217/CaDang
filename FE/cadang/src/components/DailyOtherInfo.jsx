import Typography from "@mui/joy/Typography";
import { List } from "@mui/material";

function DailyOtherInfo(props) {
  console.log(props.changedOtherInfo);
  return (
    <List>
      {props !== undefined && (
        <Typography textAlign="center" alignItems="center">
          💰 {props.data.moneyDaily}
            {props.changedOtherInfo.money ? ` + ${props.changedOtherInfo.money}` : ""} 원
          | 🍔 {props.data.calDaily}
            {props.changedOtherInfo.cal ? ` + ${props.changedOtherInfo.cal}` : ""} Kcal
        </Typography>
      )}
    </List>
  );
}

export default DailyOtherInfo;
