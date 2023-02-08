import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Card, Grid, Divider } from "@mui/material";
import Typography from "@mui/joy/Typography";

function ReadOnlyCustomOption(props) {
  const custom = props.data
  return (
    <div>
      <Divider>custom</Divider>
      <Card>
        <Grid container>
          <Grid item xs={4}>사이즈</Grid>
          <Grid item xs={8}>{custom.size}</Grid>
          <Grid item xs={4}>샷</Grid>
          <Grid item xs={8}>{custom.shot}</Grid>
          <Grid item xs={4}>휘핑</Grid>
          <Grid item xs={8}>{custom.whip}</Grid>
          <Grid item xs={4}>당도</Grid>
          <Grid item xs={8}>{custom.sugarContent}</Grid>
          <Grid item xs={4}>시럽</Grid>
          <Grid item xs={8}>{custom.syrup}</Grid>
          <Grid item xs={4}>바닐라 시럽</Grid>
          <Grid item xs={8}>{custom.vanilla}</Grid>
          <Grid item xs={4}>헤이즐넛 시럽</Grid>
          <Grid item xs={8}>{custom.caramel}</Grid>
          <Grid item xs={4}>카라멜 시럽</Grid>
          <Grid item xs={8}>{custom.hazelnut}</Grid>
        </Grid>
      </Card>
    </div>
  );
}

export default ReadOnlyCustomOption;
