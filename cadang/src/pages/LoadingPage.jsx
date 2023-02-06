import React, { useEffect, useState } from "react";
import { Paper, Box, Grid, Card } from "@mui/material";
import Typography from "@mui/joy/Typography";
import CardMedia from "@mui/material/CardMedia";
import questionMark from "../assets/question_mark.png";
import loading from "../assets/loading.png";

export default function LoadingPage() {

  return (
    <div>
<Grid container sx={{ mt: 15 }}>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <CardMedia component="img" sx={{ width: 100 }} image={questionMark} alt="questionMark" />
        </Grid>
      </Grid>
    </div>
  );
};