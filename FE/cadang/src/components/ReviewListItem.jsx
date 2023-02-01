import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";
import IconButton from "@mui/material/IconButton";

import drink from "../assets/drink.png";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  width: "75%",
});

function ReviewListItem() {
  return (
    <Paper elevation={1} sx={{ backgroundColor: "#fafafa", margin: "3px" }}>
      <Grid container spacing={2}>
        <Grid item xs={2} margin='auto'>
            <Img
              alt="complex"
              src={drink}
              sx={{width: '90%', backgroundColor: "#fafafa" }}
            />
        </Grid>
        <Grid item xs={10} sm container margin='auto'>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                바닐라 라떼 (ICE)
              </Typography>
              <Typography variant="body2" gutterBottom>
                50mg / 24g / 240Kcal / 5,100원
              </Typography>
              <Typography variant="body2" color="text.secondary">
                역삼점 아바라 존맛탱!
              </Typography>
            </Grid>
          </Grid>
          <Grid >
            <Grid direction="column" justifyContent="space-between" alignItems="center">
              <Typography variant="subtitle1" >
                01/05
              </Typography>
              <IconButton>
                <EditOutlinedIcon />
              </IconButton>
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ReviewListItem;
