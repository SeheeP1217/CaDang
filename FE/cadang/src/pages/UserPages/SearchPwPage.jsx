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
  Card,
} from "@mui/material/"
import {
  createTheme,
  ThemeProvider,
  // CreateMUIStyled,
} from "@mui/material/styles"
import styled from "styled-components"

const SearchPwPage = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#3A130C",
      },
    },
  })

  const [memberId, setMemberId] = useState("")
  const [email, setEmail] = useState("")
  const [key, setKey] = useState("")
  const [memberIdError, setMemberIdError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [keyError, setKeyError] = useState("")
  const history = useHistory()

  // 아이디 유효성 체크
  const idRegex = /^[a-zA-Z0-9]+$/
  const onChangeUserId = (e) => {
    if (!e.target.value || idRegex.test(e.target.value) || memberId.length < 1)
      setMemberIdError(false)
    else setMemberIdError("영문자+숫자 조합으로 입력해주세요.")
    setMemberId(e.target.value)
  }

  // 이메일 유효성 체크
  const emailRegex =
    /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
  const onChangeEmail = (e) => {
    if (!e.target.value || emailRegex.test(e.target.value)) setEmailError(false)
    else setEmailError("올바른 이메일 형식이 아닙니다.")
    setEmail(e.target.value)
  }

  // 이메일 인증 번호 유효성 체크
  const keyRegex = /^[0-9]+$/
  const onChangeKey = (e) => {
    if (!e.target.value || keyRegex.test(e.target.value) || key.length < 1)
      setKeyError(false)
    else setKeyError("올바른 인증번호 형식이 아닙니다.")
    setKey(e.target.value)
  }

  // 이메일 인증번호 받기
  const handleEmail = (e) => {
    e.preventDefault()

    const params = {
      email: email,
      memberId: memberId,
    }
    console.log("aaa", email, memberId)
    console.log(params)
    axios
      .post("http://i8a808.p.ssafy.io:8080/user/email/findpw", params, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(response, "성공")
        alert("메일로 인증번호가 발송되었습니다.")
      })
      .catch((err) => {
        console.log(err)
        console.log(memberId, email)
      })
  }

  // 이메일 인증번호 확인하기
  const handleEmailNumber = (e) => {
    e.preventDefault()

    const params = {
      email: email,
      key: key,
    }
    console.log("aaa", email, key)
    console.log(params)
    axios
      .get(
        "http://i8a808.p.ssafy.io:8080/user/email/findpw",
        { params: params },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        console.log(response, "성공")
        // alert("인증이 완료되었습니다.")
        history.push({ pathname: "/reset-pw", props: { response } })
      })
      .catch(function (err) {
        console.log(err)
        console.log("인증번호가 틀렸습니다.")
      })
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
          <TitleCard>
            <Typography component="h1" variant="h5">
              비밀번호 찾기
            </Typography>
          </TitleCard>
          <Boxs component="form" noValidate sx={{ mt: 2 }}>
            <FormControl component="fieldset" variant="standard">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="memberId"
                    name="memberId"
                    label="아이디"
                    // error={memberIdError !== "" || false}
                    onChange={onChangeUserId}
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={8.5}>
                  <TextField
                    required
                    fullWidth
                    type="email"
                    id="email"
                    name="email"
                    label="이메일 주소"
                    onChange={onChangeEmail}
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={3.5}>
                  <SendButton
                    noValidate
                    type="click"
                    onClick={handleEmail}
                    fullWidth
                    variant="contained"
                    size="small"
                  >
                    인증번호
                    <br />
                    보내기
                  </SendButton>
                </Grid>
                <FormHelperTexts>{emailError}</FormHelperTexts>
                <Grid item xs={8.5}>
                  <TextField
                    required
                    fullWidth
                    type="key"
                    id="key"
                    name="key"
                    label="인증번호"
                    onChange={onChangeKey}
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={3.5}>
                  <SendButton
                    noValidate
                    type="click"
                    onClick={handleEmailNumber}
                    fullWidth
                    variant="contained"
                    size="medium"
                  >
                    확인
                  </SendButton>
                </Grid>
              </Grid>
            </FormControl>
            {/* <FormHelperTexts>{registerError}</FormHelperTexts> */}
            <Button component={Link} to="/sign-in" variant="text">
              이미 회원이라면? 로그인 하러 가기
            </Button>
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
const TitleCard = styled(Card)`
  border: 2px solid #ffba00 !important;
  padding: 3px !important;
  padding-right: 9px !important;
  padding-left: 9px !important;
  border-radius: 10px !important;
  background-color: white !important;
  margin-bottom: 10px !important;
  color: #ffba00 !important;
`
const SendButton = styled(Button)`
  background-color: #ffba00 !important;
`
export default SearchPwPage
