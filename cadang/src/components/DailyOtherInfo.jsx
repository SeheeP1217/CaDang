import Typography from "@mui/joy/Typography";
import { List } from "@mui/material";

function DailyOtherInfo(props) {
  return (
    <List>
      {props.data.map((info, index) => {
        return (
          <Typography textAlign='center' key={index} alignItems="center">
            💰 {info.money} | 🍔 {info.calorie}
          </Typography>
        );
      })}
    </List>
  );
}

export default DailyOtherInfo;
