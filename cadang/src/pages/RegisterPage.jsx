import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios"
import {
  Avatar,
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
import { createTheme, ThemeProvider } from "@mui/material/styles"
import styled from "styled-components"
import "./RegisterPage.css"

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

const RegisterPage = () => {
  const theme = createTheme()
  // const [checked, setChecked] = useState(false)
  const [emailError, setEmailError] = useState("")
  const [passwordState, setPasswordState] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [nameError, setNameError] = useState("")
  const [nicknameError, setNicknameError] = useState("")
  const [registerError, setRegisterError] = useState("")
  const history = useHistory()

  // const handleAgree = (event) => {
  //   setChecked(event.target.checked)
  // }

  const onhandlePost = async (data) => {
    const { email, name, nickname, password } = data
    const postData = { email, name, nickname, password }

    // post
    await axios
      .post("/user", postData)
      .then(function (response) {
        console.log(response, "성공")
        history.push("/login")
      })
      .catch(function (err) {
        console.log(err)
        setRegisterError("회원가입에 실패하였습니다. 다시 한 번 확인해 주세요.")
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const data = new FormData(e.currentTarget)
    const joinData = {
      name: data.get("name"),
      password: data.get("password"),
      rePassword: data.get("rePassword"),
      email: data.get("email"),
      nickname: data.get("nickname"),
    }
    const { name, password, rePassword, email, nickname } = joinData

    // 이름 유효성 검사
    const nameRegex = /^[가-힣a-zA-Z]+$/
    if (!nameRegex.test(name) || name.length < 1)
      setNameError("올바른 이름을 입력해주세요.")
    else setNameError("")

    // 비밀번호 유효성 체크
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/
    if (!passwordRegex.test(password))
      setPasswordState("숫자+영문자 조합으로 8~20자리로 입력해주세요.")
    else setPasswordState("")

    // 비밀번호 같은지 체크
    if (password !== rePassword)
      setPasswordError("비밀번호가 일치하지 않습니다.")
    else setPasswordError("")

    // 이메일 유효성 체크
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    if (!emailRegex.test(email)) setEmailError("올바른 이메일 형식이 아닙니다.")
    else setEmailError("")

    // 닉네임 유효성 검사
    const nicknameRegex = /^[가-힣a-zA-Z]+$/
    if (!nicknameRegex.test(nickname) || nickname.length < 1)
      setNicknameError("올바른 닉네임을 입력해주세요.")
    else setNicknameError("")

    // 회원가입 동의 체크
    // if (!checked) alert("회원가입 약관에 동의해주세요.")

    if (
      emailRegex.test(email) &&
      passwordRegex.test(password) &&
      password === rePassword &&
      nameRegex.test(name) &&
      nicknameRegex.test(nickname)
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }} />
          <Typography component="h1" variant="h5">
            회원가입
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
                    fullWidth
                    id="name"
                    name="name"
                    label="이름"
                    error={nameError !== "" || false}
                  />
                </Grid>
                <FormHelperTexts>{nameError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="password"
                    name="password"
                    label="비밀번호 (숫자+영문자+특수문자 8자리 이상)"
                    error={passwordState !== "" || false}
                  />
                </Grid>
                <FormHelperTexts>{passwordState}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="rePassword"
                    name="rePassword"
                    label="비밀번호 재입력"
                    error={passwordError !== "" || false}
                  />
                </Grid>
                <FormHelperTexts>{passwordError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    type="email"
                    id="email"
                    name="email"
                    label="이메일 주소"
                    error={emailError !== "" || false}
                  />
                </Grid>
                <FormHelperTexts>{emailError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="nickname"
                    name="nickname"
                    label="닉네임"
                    error={nicknameError !== "" || false}
                  />
                </Grid>
                <FormHelperTexts>{nicknameError}</FormHelperTexts>
                {/* <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox onChange={handleAgree} color="primary" />
                    }
                    label="회원가입 약관에 동의합니다."
                  />
                </Grid> */}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"
              >
                가입하기
              </Button>
            </FormControl>
            <FormHelperTexts>{registerError}</FormHelperTexts>
          </Boxs>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default RegisterPage
