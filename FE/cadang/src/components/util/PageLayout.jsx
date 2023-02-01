import * as React from "react";
import { Paper, Box } from "@mui/material/Box";
import Typography from "@mui/joy/Typography";

function PageLayout() {
  return (
    <Paper sx={{ backgroundColor: "#EFF5F5" }}>
      <Box width="90%" margin="auto">
        <Typography
          level="h3"
          fontSize="xl2"
          fontWeight="xl"
          id="ios-example-demo"
          mt={2}
        >
          Settings
        </Typography>
      </Box>
    </Paper>
  );
}

export default PageLayout;
