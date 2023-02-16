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
import LoadingPage from "../LoadingPage"

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

const LoginPage = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#3A130C",
      },
    },
    typography: {
      fontFamily: "netmarble",
    },
  })
  // const [checked, setChecked] = useState(false)
  const [memberId, setMemberId] = useState("")
  const [password, setPassword] = useState("")
  const [memberIdError, setMemberIdError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [loginError, setLoginError] = useState("")
  const history = useHistory()
  const [loading, setLoading] = useState(false)

  const onhandlePost = async (data) => {
    const { memberId, password } = data
    const postData = { memberId, password }
    setLoading(true) // axios 호출 전 로딩페이지를 띄우기 위한 state 처리
    await axios
      .post("http://i8a808.p.ssafy.io:8080/login", postData, {
        withCredentials: true,
      })
      .then(async (response) => {
        console.log(response)

        return response
      })
      .then(async (response) => {
        if (response.headers.authorization) {
          localStorage.setItem("login-token", response.headers.authorization)
          console.log(data)
        }
        if (response.status === 200) {
          setLoading(false)
          // alert("로그인에 성공하였습니다.");
          history.push("/main")
          // setTimeout(() => {
          //   history.push("/main");
          // }, 800);
        }
      })
      .catch(function (err) {
        console.log(err)
        console.log("로그인 안됨")
        console.log(postData)
        setLoginError("로그인에 실패하였습니다. 다시 한 번 확인해 주세요")
      })
  }

  const idRegex = /^[a-zA-Z0-9]+$/
  const onChangeUserId = (e) => {
    if (!e.target.value || idRegex.test(e.target.value) || memberId.length < 1)
      setMemberIdError(false)
    else setMemberIdError("영문자+숫자 조합으로 입력해주세요.")
    setMemberId(e.target.value)
  }

  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/
  const onChangePassword = (e) => {
    if (!e.target.value || passwordRegex.test(e.target.value))
      setPasswordError(false)
    else setPasswordError("숫자+영문자 조합으로 8~20자리로 입력해주세요.")
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    const data = new FormData(e.currentTarget)
    const joinData = {
      memberId: data.get("memberId"),
      password: data.get("password"),
    }
    const { memberId, password } = joinData

    if (
      idRegex.test(memberId) &&
      passwordRegex.test(password)
      // checked
    ) {
      onhandlePost(joinData)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      {loading === true ? (
        <LoadingPage />
      ) : (
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
            <TitleCard>
              <Typography component="h1" variant="h4">
                로그인
              </Typography>
            </TitleCard>
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
                      variant="standard"
                      // error={memberIdError !== "" || false}
                      onChange={onChangeUserId}
                    />
                  </Grid>
                  <FormHelperTexts>{memberIdError}</FormHelperTexts>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      type="password"
                      id="password"
                      name="password"
                      label="비밀번호 (숫자+영문자+특수문자 8자리 이상)"
                      variant="standard"
                      // error={passwordError !== "" || false}
                      onChange={onChangePassword}
                    />
                  </Grid>
                  {/* <FormHelperTexts>{setPasswordError}</FormHelperTexts> */}
                </Grid>

                <SendButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  size="large"
                  className="button"
                >
                  LOGIN
                </SendButton>
                <Grid style={{ textAlign: "center" }}>
                  <Button component={Link} to="/search-id" variant="text">
                    아이디 찾기
                  </Button>
                  |
                  <Button component={Link} to="/search-pw" variant="text">
                    비밀번호 찾기
                  </Button>
                  |
                  <Button component={Link} to="/sign-up" variant="text">
                    회원가입
                  </Button>
                </Grid>
              </FormControl>
              <FormHelperTexts>{loginError}</FormHelperTexts>
            </Boxs>
          </Box>
        </Container>
      )}
    </ThemeProvider>
  )
}

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

export default LoginPage
