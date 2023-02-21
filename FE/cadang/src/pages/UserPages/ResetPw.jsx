import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import axios from "axios"
import {
  Button,
  CssBaseline,
  TextField,
  FormControl,
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
} from "@mui/material/styles"
import styled from "styled-components"

const ResetPwPage = (location) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#3A130C",
      },
    },
  })
  const [memberId, setMemberId] = useState(-1)
  useEffect(() => {
    setMemberId(location.location.props.response.data.id)
  }, [location.location.props.response.data.id])

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

  // const memberId = "6"

  const handleSubmit = (e, memberId) => {
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
        headers: { "Content-Type": "application/json" },
        params: {
          memberId: memberId,
          password: password,
        },
      })
        .then((res) => {
          console.log(res, "<<<")
          history.push("/sign-in")
        })
        .catch((err) => {
          console.error(err)
          // console.log(memberId, password)
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
          <TitleCard>
            <Typography component="h1" variant="h5">
              비밀번호 재설정
            </Typography>
          </TitleCard>
          <Boxs
            component="form"
            noValidate
            onClick={(e) => handleSubmit(e, memberId)}
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
                    variant="standard"
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
                    variant="standard"
                  />
                  <FormHelperTexts>{passwordStateError}</FormHelperTexts>
                </Grid>
                <Grid item xs={12}>
                  <SendButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3 }}
                    size="large"
                  >
                    비밀번호 재설정하기
                  </SendButton>
                </Grid>
              </Grid>
              <Button
                component={Link}
                to="/sign-in"
                variant="text"
                style={{ marginTop: "5px" }}
              >
                로그인 하러 가기
              </Button>
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
export default ResetPwPage
