import * as React from "react"
import {
  // Avatar,
  // Button,
  CssBaseline,
  // TextField,
  // FormControl,
  // FormControlLabel,
  // Checkbox,
  // FormHelperText,
  // Grid,
  Box,
  Typography,
  Container,
} from "@mui/material/"

import {createTheme, ThemeProvider } from "@mui/material/styles"
import ImageUploader from "../components/util/imageuploader"
import RegisterForm from "../components/RegisterForm"

export default function RegisterPage() {
  const theme = createTheme()

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              회원가입
            </Typography>

            <Box>
              <ImageUploader />
            </Box>
            <Box>
              <RegisterForm />
            </Box>
          </Box>
        </Container>
      </ThemeProvider>

    </div>
  )
}
