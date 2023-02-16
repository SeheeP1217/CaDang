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

const SearchIdPage = () => {
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
  const [username, setUserName] = useState("")
  const [email, setEmail] = useState("")

  const [usernameError, setUserNameError] = useState("")

  const [emailError, setEmailError] = useState("")
  const [loginError, setLoginError] = useState("")
  const history = useHistory()

  const onhandlePost = async (data) => {
    data = { email, username }

    await axios
      .get("http://i8a808.p.ssafy.io:8080/user/findid", {
        params: { email, username },
      })
      .then(function (response) {
        console.log(response.data, "성공")
        alert(`${username}님의 아이디는 ` + response.data + "입니다.")
        history.push("/password")
      })
      .catch(function (err) {
        console.log(err, "에러")
        setLoginError("아이디를 찾을 수 없습니다. 다시 한 번 확인해 주세요")
      })
  }

  const usernameRegex = /^[가-힣a-zA-Z]+$/
  const onChangeUserName = (e) => {
    if (
      !e.target.value ||
      usernameRegex.test(e.target.value) ||
      username.length < 1
    )
      setUserNameError(false)
    else setUserNameError("올바른 이름을 입력해주세요.")
    setUserName(e.target.value)
  }
  const emailRegex =
    /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
  const onChangeEmail = (e) => {
    if (!e.target.value || emailRegex.test(e.target.value)) setEmailError(false)
    else setEmailError("올바른 이메일 형식이 아닙니다.")
    setEmail(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    const data = new FormData(e.currentTarget)
    const joinData = {
      email: data.get("email"),
      username: data.get("username"),
    }
    const { username, email } = joinData

    if (
      emailRegex.test(email) &&
      usernameRegex.test(username)
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
          <TitleCard>
            <Typography component="h1" variant="h4">
              아이디 찾기
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
                    id="username"
                    name="username"
                    label="이름"
                    // error={usernameError !== "" || false}
                    onChange={onChangeUserName}
                    variant="standard"
                  />
                </Grid>
                <FormHelperTexts>{usernameError}</FormHelperTexts>
                <Grid item xs={12}>
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
                <FormHelperTexts>{emailError}</FormHelperTexts>
              </Grid>

              <SendButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"
                className="button"
              >
                찾기
              </SendButton>
              <Grid style={{ textAlign: "center" }}>
                <Button component={Link} to="/sign-in" variant="text">
                  로그인
                </Button>
                |
                <Button component={Link} to="/search-pw" variant="text">
                  비밀번호 찾기
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
export default SearchIdPage
