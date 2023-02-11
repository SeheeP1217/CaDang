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

const SearchPwPage = () => {
  const theme = createTheme()
  // const [checked, setChecked] = useState(false)
  const [memberId, setMemberId] = useState("")
  const [email, setEmail] = useState("")
  const [key, setKey] = useState("")

  const [memberIdError, setMemberIdError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [keyError, setKeyError] = useState("")

  const [checkEmailDone, setCheckEmailDone] = useState(false)
  const [checkEmailNumberDone, setCheckEmailNumberDone] = useState(false)

  const [loginError, setLoginError] = useState("")
  const history = useHistory()

  const onhandlePost = async (data) => {
    data = { email, memberId }

    await axios
      .get("http://i8a808.p.ssafy.io:8080/user/findid", {
        params: { email, memberId },
      })
      .then(function (response) {
        console.log(response.data, "성공")
        history.push("/sign-in")
      })
      .catch(function (err) {
        console.log(err, "에러")
        setLoginError("비밀번호를 찾을 수 없습니다. 다시 한 번 확인해 주세요")
      })
  }

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

  const emailCheck = async (data) => {
    data = email
    console.log(email)
    await axios
      .post(
        "http://i8a808.p.ssafy.io:8080/user/email/findpw",
        // null,
        { params: { email, memberId } }
      )
      .then(function (response) {
        console.log(response, "성공")
        alert("메일로 인증번호가 발송되었습니다.")
        setCheckEmailDone(() => true)
      })
      .catch(function (err) {
        console.log(err)
        alert("이미 계정이 있습니다.")
      })
  }

  const handleEmail = (e) => {
    e.preventDefault()

    const data = new FormData(e.currentTarget[0])
    const joinData = {
      email: data.get("email"),
    }
    emailCheck(joinData)
  }

  // 이메일 인증번호 확인하기
  const emailNumberCheck = async (data) => {
    data = { key, email }
    await axios
      .get("http://i8a808.p.ssafy.io:8080/user/email/verify", {
        params: { key: key, email: email },
      })
      .then(function (response) {
        console.log(response, "성공")
        alert("인증이 완료되었습니다.")

        const checkEmailNumberDone = "yes"
        setCheckEmailNumberDone(() => true)
      })
      .catch(function (err) {
        console.log(err)
        alert("인증번호가 틀렸습니다.")
      })
  }

  const handleEmailNumber = (e) => {
    e.preventDefault()

    const data = new FormData(e.currentTarget[0])
    const joinData = {
      key: data.get("key"),
      email: data.get("email"),
    }
    emailNumberCheck(joinData)
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    const data = new FormData(e.currentTarget)
    const joinData = {
      memberId: data.get("memberId"),
      email: data.get("email"),
    }
    const { memberId, email } = joinData

    // 회원가입 동의 체크
    // if (!checked) alert("회원가입 약관에 동의해주세요.")
    if (
      idRegex.test(memberId) &&
      emailRegex.test(email) &&
      checkEmailNumberDone === true
      // checked
    ) {
      onhandlePost({
        memberId,
        email,
      })
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
            비밀번호 찾기
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
                    id="memberId"
                    name="memberId"
                    label="아이디"
                    // error={memberIdError !== "" || false}
                    onChange={onChangeUserId}
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
                  />
                </Grid>
                <Grid item xs={3.5}>
                  <Button
                    noValidate
                    type="click"
                    onClick={handleEmail}
                    fullWidth
                    variant="contained"
                    size="small"
                  >
                    인증번호 보내기
                  </Button>
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
                  />
                </Grid>
                <Grid item xs={3.5}>
                  <Button
                    noValidate
                    type="click"
                    onClick={handleEmailNumber}
                    fullWidth
                    variant="contained"
                    size="medium"
                  >
                    확인
                  </Button>
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"
                className="button"
              >
                찾기
              </Button>
              <Grid>
                <Button component={Link} to="/search-pw" variant="text">
                  비밀번호 찾기
                </Button>
                |
                <Button component={Link} to="/sign-in" variant="text">
                  로그인
                </Button>
              </Grid>
            </FormControl>
            <FormHelperTexts>{loginError}</FormHelperTexts>
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
  padding-bottom: 40px !important;
`

export default SearchPwPage
