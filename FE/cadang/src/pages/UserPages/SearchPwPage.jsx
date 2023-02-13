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

import { findPwd } from "../../api/user"

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

  const [memberId, setMemberId] = useState("")
  const [email, setEmail] = useState("")
  const [key, setKey] = useState("")
  const [memberIdError, setMemberIdError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [keyError, setKeyError] = useState("")
  const history = useState()

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
  // const handleEmail = (e) => {
  //   e.preventDefault()

  //   const params = {
  //     email: email,
  //     memberId: memberId,
  //   }
  //   console.log("aaa", email, memberId)
  //   console.log(params)
  //   axios
  //     .post("http://i8a808.p.ssafy.io:8080/user/email/findpw", {
  //       headers: { "Content-Type": "application/json" },
  //       postData: { memberId, email },
  //     })
  //     .then((response) => {
  //       console.log(response, "성공")
  //       alert("메일로 인증번호가 발송되었습니다.")
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //       console.log(memberId, email)
  //     })
  // }
  const [checkEmail, setCheckEmail] = useState({
    email: "",
    memberId: "",
  })

  const handleEmail = async () => {
    await findPwd(
      memberId,
      email,
      (res) => {
        console.log("aaaaaaaaaaa")
        return res.data
      },
      (err) => console.log(err)
    ).then((data) => setCheckEmail(data))
  }

  // 이메일 인증번호 확인하기
  const emailNumberCheck = async (data) => {
    data = { key, email }
    axios
      .get("http://i8a808.p.ssafy.io:8080/user/email/findpw", {
        params: { key: key, email: email },
      })
      .then(function (response) {
        console.log(response, "성공")
        alert("인증이 완료되었습니다.")
        history.push("/reset-pw")
      })
      .catch(function (err) {
        console.log(err)
        alert("인증번호가 틀렸습니다.")
      })
  }

  const handleEmailNumber = (e) => {
    const data = new FormData(e.currentTarget[0])
    const joinData = {
      key: data.get("key"),
      email: data.get("email"),
    }
    emailNumberCheck(joinData)
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
            비밀번호 찾기
          </Typography>
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
export default SearchPwPage
