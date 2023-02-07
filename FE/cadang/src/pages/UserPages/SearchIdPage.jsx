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

const SearchIdPage = () => {
  const theme = createTheme()
  // const [checked, setChecked] = useState(false)
  const [username, setUserName] = useState("")
  const [email, setEmail] = useState("")

  const [usernameError, setUserNameError] = useState("")

  const [emailError, setEmailError] = useState("")
  const [loginError, setLoginError] = useState("")
  const history = useHistory()

  const onhandlePost = async (data) => {
    const { email, name } = data
    const postData = { email, name }

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
      name: data.get("name"),
    }
    const { name, email } = joinData

    if (
      emailRegex.test(email) &&
      usernameRegex.test(name)
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
            아이디 찾기
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
                    id="username"
                    name="username"
                    label="이름"
                    // error={usernameError !== "" || false}
                    onChange={onChangeUserName}
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
                  />
                </Grid>
                <FormHelperTexts>{emailError}</FormHelperTexts>
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

export default SearchIdPage
