import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Card, Box, Grid, Divider } from "@mui/material";
import Typography from "@mui/joy/Typography";

function CustomOption() {
  return (
    <div>
      <Divider>custom</Divider>
      <Card>
        <Grid
          container
          sx={{ display: "flex", padding: 2 }}
          justifyContent="center"
        >
          <Grid item xs={3} textAlign="center" margin="auto">
            사이즈
          </Grid>
          <Grid
            item
            xs={9}
            justifyContent="center"
            alignItems="center"
            padding="auto"
          >
            <ButtonGroup variant="outlined" size="small">
              {/* 나중에 for문으로 변경 */}
              <Button>Small</Button>
              <Button>Regular</Button>
              <Button>Large</Button>
            </ButtonGroup>
          </Grid>
          <Grid item xs={3} textAlign="center" margin="auto">
            샷
          </Grid>
          <Grid item xs={9} justifyContent="center" alignItems="center">
            <ButtonGroup
              variant="outlined"
              aria-label="shot button group"
              justifyContent="center"
              size="small"
            >
              <IconButton color="secondary" aria-label="add an alarm">
                <RemoveCircleOutlineIcon />
              </IconButton>
              <Typography width="20%" margin="auto">
                2
              </Typography>
              <IconButton color="secondary">
                <AddCircleOutlineIcon />
              </IconButton>
            </ButtonGroup>
          </Grid>
          <Grid item xs={3} textAlign="center" margin="auto">
            휘핑
          </Grid>
          <Grid item xs={9} justifyContent="center" alignItems="center">
            <ButtonGroup variant="outlined" aria-label="shot button group" size="small">
              <Button>X</Button>
              <Button>O</Button>
            </ButtonGroup>
          </Grid>
          <Grid item xs={3} textAlign="center" margin="auto">
            당도
          </Grid>
          <Grid item xs={9} justifyContent="center" alignItems="center">
            <ButtonGroup variant="outlined" aria-label="size button group" size="small">
              <Button>덜달게</Button>
              <Button>기본</Button>
              <Button>달게</Button>
            </ButtonGroup>
          </Grid>

        </Grid>
      </Card>
    </div>
  );
}

export default CustomOption;
