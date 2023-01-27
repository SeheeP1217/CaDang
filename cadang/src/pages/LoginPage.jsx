import React, { useState } from "react"
import { useHistory } from "react-router-dom"
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
import { createTheme, ThemeProvider, CreateMUIStyled } from "@mui/material/styles"
import styled from "styled-components"
import "./LoginPage.css"


// mui의 css 우선순위가 높기때문에 important를 설정 - 실무하다 보면 종종 발생 우선순위 문제
const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700 !important;
  color: #d32f2f !important;
`

const Boxs = styled(Box)`
  padding-bottom: 40px !important;
`





const LoginPage = () => {
  const theme = createTheme()
  // const [checked, setChecked] = useState(false)
  const [emailError, setEmailError] = useState("")
  const [passwordState, setPasswordState] = useState("")
  const [loginError, setLoginError] = useState("")
  const history = useHistory()

  const onhandlePost = async (data) => {
    const { email, passwords } = data
    const postData = { email, passwords }

    await axios
      .post("/login", postData)
      .then(function (response) {
        console.log(response, "성공")
        history.push("/main")
      })
      .catch(function (err) {
        console.log(err)
        setLoginError("로그인에 실패하였습니다. 다시 한 번 확인해 주세요")
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const data = new FormData(e.currentTarget)
    const joinData = {
      email: data.get("email"),
      passwords: data.get("password"),
    }
    const { email, passwords } = joinData

    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    if (!emailRegex.test(email)) setEmailError("올바른 이메일 형식이 아닙니다.")
    else setEmailError("")

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/
    if (!passwordRegex.test(passwords))
      setPasswordState("숫자+영문자 조합으로 8~20자리로 입력해주세요.")
    else setPasswordState("")

    if (
      emailRegex.test(email) &&
      passwordRegex.test(passwords)
      // checked
    ) {
      onhandlePost(joinData)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            로그인
          </Typography>
          <Boxs
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <FormControl component="fieldset" variant="standard">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    type="email"
                    id="email"
                    name="email"
                    label="이메일"
                    error={emailError !== "" || false}
                  />
                </Grid>
                <FormHelperTexts>{emailError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="password"
                    name="password"
                    label="비밀번호 (숫자+영문자+특수문자 8~20자리)"
                    error={passwordState !== "" || false}
                  />
                </Grid>
                <FormHelperTexts>{passwordState}</FormHelperTexts>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"
                className="button"
              >
                LOGIN
              </Button>
              <h4>아이디 찾기 | 비밀번호 찾기 | 회원가입 추가예정</h4>
            </FormControl>
            <FormHelperTexts>{loginError}</FormHelperTexts>
          </Boxs>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default LoginPage
