import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios"
import {
  Button,
  CssBaseline,
  TextField,
  FormControl,
  // FormHelperText,
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

// mui의 css 우선순위가 높기때문에 important를 설정 - 실무하다 보면 종종 발생 우선순위 문제
// const FormHelperTexts = styled(FormHelperText)`
//   width: 100%;
//   padding-left: 16px;
//   font-weight: 700 !important;
//   color: #d32f2f !important;
// `

const Boxs = styled(Box)`
  padding-bottom: 40px !important;
`

const UserWithdrawalPage = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#3A130C",
      },
    },
  })
  const history = useHistory()
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/
  const onChangePassword = (e) => {
    if (!e.target.value || passwordRegex.test(e.target.value)) {
      setPasswordError(false)
      console.log(password)
    } else setPasswordError("숫자+영문자 조합으로 8~20자리로 입력해주세요.")
    setPassword(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    axios
      .delete("http://i8a808.p.ssafy.io:8080/user2/deleteAccount", {
        params: { password: password },
        headers: { Authorization: localStorage.getItem("login-token") },
      })
      .then((response) => {
        console.log(response, "성공")
        alert("탈퇴되었습니다.")
        history.push("/")
      })
      .catch((error) => {
        console.log(error)
        console.log("aaaaaaa", password)
      })
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
          <TitleCard>
            <Typography component="h1" variant="h4">
              회원탈퇴
            </Typography>
          </TitleCard>
          <Typography component="h3" variant="h6">
            정말 탈퇴하시겠습니까? <br />
            탈퇴 후 복구는 불가합니다.
          </Typography>
          <Boxs
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <FormControl component="fieldset" variant="standard">
              <Grid container>
                <TextField
                  required
                  fullWidth
                  type="password"
                  id="password"
                  name="password"
                  label="비밀번호를 입력하세요"
                  variant="standard"
                  // error={passwordError !== "" || false}
                  onChange={onChangePassword}
                  inputProps={{
                    style: {
                      caretColor: "orange",
                    },
                  }}
                />
              </Grid>

              <SendButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"
                className="button"
              >
                탈퇴
              </SendButton>
            </FormControl>
          </Boxs>
        </Box>
      </Container>
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

export default UserWithdrawalPage
