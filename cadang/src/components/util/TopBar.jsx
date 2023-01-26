import * as React from "react";
import './TopBar.css';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

export default function TopBar() {
  const ref = React.useRef(null);

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <AppBar className="appBar" position="static">
        <Toolbar>
          <Typography className="logoText" variant="h6" component="div" sx={{ flexGrow: 1 }}>
            마실까말까
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}