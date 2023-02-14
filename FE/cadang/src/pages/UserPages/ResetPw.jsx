import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import axios from "axios"
import {
  Button,
  CssBaseline,
  TextField,
  FormControl,
  // FormControlLabel,
  // Checkbox,
  FormHelperText,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material/"
import {
  createTheme,
  ThemeProvider,
  // CreateMUIStyled,
} from "@mui/material/styles"
import styled from "styled-components"

// const StyledButton = styled.button`
//   padding: 6px 12px;
//   border-radius: 8px;
//   font-size: 1rem;
//   line-height: 1.5;
//   border: 1px solid lightgray;

//   color: ${(props) => props.color || "gray"};
//   background: ${(props) => props.background || "white"};

//   ${(props) =>
//     props.primary &&
//     css`
//       color: white;
//       background: navy;
//       border-color: navy;
//     `}
// `

const ResetPwPage = () => {
  const theme = createTheme()

  const [password, setPassword] = useState("")
  const [passwordState, setpasswordState] = useState("")

  const [passwordStateError, setPasswordStateError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const history = useHistory()

  // 비밀번호 유효성 체크
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/
  const onChangePassword = (e) => {
    if (!e.target.value || passwordRegex.test(e.target.value))
      setPasswordError(false)
    else setPasswordError("숫자+영문자 조합으로 8~20자리로 입력해주세요.")

    if (!passwordState || e.target.value === passwordState)
      setPasswordStateError(false)
    else setPasswordStateError("비밀번호가 일치하지 않습니다.")
    setPassword(e.target.value)
  }

  // 비밀번호 같은지 체크
  const onChangePasswordState = (e) => {
    if (password === e.target.value) setPasswordStateError(false)
    else setPasswordStateError("비밀번호가 일치하지 않습니다.")
    setpasswordState(e.target.value)
  }

  const memberId = "6"
  console.log(memberId)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (
      passwordRegex.test(password) &&
      password === passwordState
      // checked
    ) {
      console.log(password, passwordState)
      axios({
        method: "put",
        url: "http://i8a808.p.ssafy.io:8080/user/newpass",
        data: {
          memberId,
          password,
        },
      })
        .then((res) => {
          console.log(res, "<<<")
          history.push("/sign-in")
        })
        .catch((err) => {
          console.error(err)
          console.log(memberId, password)
        })
    }
  }
  return (
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
            비밀번호 재설정
          </Typography>
          <Boxs
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 2 }}
          >
            <FormControl component="fieldset" variant="standard">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="password"
                    name="password"
                    label="비밀번호 (숫자+영문자+특수문자 8자리 이상)"
                    // error={passwordError !== "" || false}
                    onChange={onChangePassword}
                  />
                </Grid>
                <FormHelperTexts>{passwordError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="passwordState"
                    name="passwordState"
                    label="비밀번호 재입력"
                    // error={passwordStateError !== "" || false}
                    onChange={onChangePasswordState}
                  />
                  <FormHelperTexts>{passwordStateError}</FormHelperTexts>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3 }}
                    size="large"
                  >
                    비밀번호 재설정하기
                  </Button>
                </Grid>
              </Grid>
            </FormControl>
          </Boxs>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700 !important;
  color: #d32f2f !important;
`

const Boxs = styled(Box)`
  padding-bottom: 10px !important;
`
export default ResetPwPage
