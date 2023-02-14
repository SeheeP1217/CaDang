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
import { createTheme, ThemeProvider } from "@mui/material/styles"
import styled from "styled-components"
import ProfileImageUploader from "../../components/util/ProfileImageUploader"
import default_image from "../../assets/default_image.png"
// import netmarbleM from "../../assets/fonts/netmarble/netmarbleM"

const RegisterPage = () => {
  // const [checked, setChecked] = useState(false)
  const [username, setUserName] = useState("")
  const [memberId, setMemberId] = useState("")
  const [email, setEmail] = useState("")
  const [key, setKey] = useState("")
  const [password, setPassword] = useState("")
  const [passwordState, setpasswordState] = useState("")
  const [nickname, setNickname] = useState("")

  const [usernameError, setUserNameError] = useState("")
  const [memberIdError, setMemberIdError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [keyError, setKeyError] = useState("")
  const [passwordStateError, setPasswordStateError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [nicknameError, setNicknameError] = useState("")
  const [registerError, setRegisterError] = useState("")
  const history = useHistory()

  const [checkIdDone, setCheckIdDone] = useState(false)
  const [checkEmailDone, setCheckEmailDone] = useState(false)
  const [checkEmailNumberDone, setCheckEmailNumberDone] = useState(false)
  const [image, setImage] = useState()

  const [imgFile, setImgfile] = useState(null)
  const [prevUrl, setPrevUrl] = useState("")

  const [focused, setFocused] = useState(false)

  const handleFocus = () => {
    setFocused(true)
  }

  const handleBlur = () => {
    setFocused(false)
  }

  const getImg = (image_file, preview_URL) => {
    setImgfile(() => image_file)
    setPrevUrl(() => preview_URL)
  }

  // const onhandlePost = async (data) => {
  //   const { memberId, email, username, nickname, password } = data

  //   const postData = {
  //     username: username,
  //     memberId: memberId,
  //     password: password,
  //     email: email,
  //     nickname: nickname,
  //   }

  //   const formData = new FormData()
  //   formData.append("img", image.image_file)
  //   formData.append("data", JSON.stringify(postData))

  //   // post

  //   axios
  //     .post("http://i8a808.p.ssafy.io:8080/user/join", formData, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //       params: postData,
  //     })
  //     .then(function (response) {
  //       console.log(response, "성공")
  //       history.push("/info")
  //     })
  //     .catch(function (err) {
  //       console.log(err)
  //       setRegisterError("회원가입에 실패하였습니다. 다시 한 번 확인해 주세요.")
  //     })
  // }
  // 이름 유효성 검사
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

  // 아이디 유효성 체크
  const idRegex = /^[a-zA-Z0-9]+$/
  const onChangeUserId = (e) => {
    if (!e.target.value || idRegex.test(e.target.value) || memberId.length < 1)
      setMemberIdError(false)
    else setMemberIdError("영문자+숫자 조합으로 입력해주세요.")
    setMemberId(e.target.value)
  }

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

  // 닉네임 유효성 검사
  const nicknameRegex = /^(([가-힣a-zA-Z0-9]).{1,20})+$/
  const onChangeNickname = (e) => {
    if (
      !e.target.value ||
      nicknameRegex.test(e.target.value) ||
      nickname.length < 1
    )
      setNicknameError(false)
    else setNicknameError("한글, 영어, 숫자로 1~20자만 사용 가능합니다.")
    setNickname(e.target.value)
  }

  // 아이디 중복 확인
  const idCheck = async (data) => {
    data = memberId
    axios
      .get("http://i8a808.p.ssafy.io:8080/user/id/verify", {
        params: { id: data },
      })
      .then(function (response) {
        console.log(response, "성공")
        alert("사용할 수 있는 아이디입니다.")
        console.log(data)
        setCheckIdDone(() => true)
      })
      .catch(function (err) {
        console.log(err)
        alert("이미 사용 중인 아이디입니다.")
      })
  }

  const handleId = (e) => {
    e.preventDefault()

    const data = new FormData(e.currentTarget[0])
    const joinData = {
      memberId: data.get("memberId"),
    }
    idCheck(joinData)
  }

  // 이메일 중복 확인 & 인증번호 받기
  const emailCheck = async (data) => {
    data = email
    console.log(email)
    axios
      .post(
        "http://i8a808.p.ssafy.io:8080/user/email",
        null,
        { params: { email } },
        { headers: { Authorization: `` } }
      )
      .then(function (response) {
        alert("메일로 인증번호가 발송되었습니다.")
        console.log(response, "성공")
        const checkEmailDone = "yes"
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
    axios
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

    // const data = new FormData(e.currentTarget)
    // const joinData = {
    //   username: data.get("username"),
    //   memberId: data.get("memberId"),
    //   password: data.get("password"),
    //   passwordState: data.get("passwordState"),
    //   email: data.get("email"),
    //   nickname: data.get("nickname"),
    // }
    // const { username, memberId, password, passwordState, email, nickname } =
    //   joinData

    // 회원가입 동의 체크
    // if (!checked) alert("회원가입 약관에 동의해주세요.")
    if (
      idRegex.test(memberId) &&
      emailRegex.test(email) &&
      passwordRegex.test(password) &&
      password === passwordState &&
      usernameRegex.test(username) &&
      nicknameRegex.test(nickname) &&
      checkEmailDone === true &&
      checkIdDone === true &&
      checkEmailNumberDone === true
      // checked
    ) {
      console.log(username, memberId, password, passwordState, email, nickname)
      console.log(imgFile)
      axios({
        method: "post",
        url: "http://i8a808.p.ssafy.io:8080/user/join",
        headers: { "Content-Type": "multipart/form-data" },
        data: {
          img: imgFile || null,
        },
        params: {
          username,
          memberId,
          password,
          email,
          nickname,
        },
      })
        .then((res) => {
          console.log(res, "<<<")
          history.push("/info")
        })
        .catch((err) => {
          console.error(err)
          // if(errorCode=="USER-002"){
          //   alert("사용 중인 아이디입니다.")
          // }
        })
    }
  }
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
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TitleCard>
            <Typography component="h1" variant="h4">
              회원가입
            </Typography>
          </TitleCard>
          <Boxs
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 0 }}
          >
            <FormControl component="fieldset" variant="standard">
              <BackCard>
                <Grid container spacing={1} m={0}>
                  <ImageContainer>
                    <ProfileImageUploader
                      getImg={getImg}
                      style="grid-column: 1 / span 2; grid-row: 1 / 3;"
                    ></ProfileImageUploader>
                  </ImageContainer>
                  <Grid item xs={7}>
                    <Grid>
                      <TextField
                        required
                        fullWidth
                        id="username"
                        name="username"
                        label="이름"
                        onChange={onChangeUserName}
                        inputProps={{
                          style: {
                            caretColor: "orange",
                          },
                        }}
                      />
                      <FormHelperTexts>{usernameError}</FormHelperTexts>
                    </Grid>
                    <Grid sx={{ mt: 1.5 }}>
                      <TextField
                        required
                        fullWidth
                        id="nickname"
                        name="nickname"
                        label="닉네임"
                        // error={nicknameError !== "" || false}
                        onChange={onChangeNickname}
                        inputProps={{
                          style: {
                            caretColor: "orange",
                          },
                        }}
                      />
                    </Grid>
                    <FormHelperTexts>{nicknameError}</FormHelperTexts>
                  </Grid>

                  <Grid item xs={8.5}>
                    <TextField
                      required
                      fullWidth
                      id="memberId"
                      name="memberId"
                      label="아이디"
                      // error={memberIdError !== "" || false}
                      onChange={onChangeUserId}
                      inputProps={{
                        style: {
                          caretColor: "orange",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <BackButton
                      type="click"
                      onClick={handleId}
                      fullWidth
                      variant="contained"
                      size="small"
                    >
                      중복 <br />
                      확인하기
                    </BackButton>
                  </Grid>
                  <FormHelperTexts>{memberIdError}</FormHelperTexts>
                  <Grid item xs={11.5}>
                    <TextField
                      required
                      fullWidth
                      type="password"
                      id="password"
                      name="password"
                      label="비밀번호 (숫자+영문자+특수문자 8자리 이상)"
                      // error={passwordError !== "" || false}
                      onChange={onChangePassword}
                      inputProps={{
                        style: {
                          caretColor: "orange",
                        },
                      }}
                    />
                  </Grid>
                  <FormHelperTexts>{passwordError}</FormHelperTexts>
                  <Grid item xs={11.5}>
                    <TextField
                      required
                      fullWidth
                      type="password"
                      id="passwordState"
                      name="passwordState"
                      label="비밀번호 재입력"
                      // error={passwordStateError !== "" || false}
                      onChange={onChangePasswordState}
                      inputProps={{
                        style: {
                          caretColor: "orange",
                        },
                      }}
                    />
                  </Grid>
                  <FormHelperTexts>{passwordStateError}</FormHelperTexts>
                  <Grid item xs={8.5}>
                    <TextField
                      required
                      fullWidth
                      type="email"
                      id="email"
                      name="email"
                      label="이메일 주소"
                      onChange={onChangeEmail}
                      inputProps={{
                        style: {
                          caretColor: "orange",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <BackButton
                      noValidate
                      type="click"
                      onClick={handleEmail}
                      fullWidth
                      variant="contained"
                      size="small"
                    >
                      인증번호 보내기
                    </BackButton>
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
                      inputProps={{
                        style: {
                          caretColor: "orange",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <BackButton
                      noValidate
                      type="click"
                      onClick={handleEmailNumber}
                      fullWidth
                      variant="contained"
                      size="medium"
                      style={{ height: "57.5px" }}
                    >
                      확인
                    </BackButton>
                  </Grid>

                  {/* <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox onChange={handleAgree} color="primary" />
                    }
                    label="회원가입 약관에 동의합니다."
                  />
                </Grid> */}
                </Grid>
              </BackCard>
              <SendButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 1 }}
                size="large"
              >
                가입하기
              </SendButton>
            </FormControl>
            <FormHelperTexts>{registerError}</FormHelperTexts>
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

const BackCard = styled(Box)`
  border-radius: 10px !important;
  // border: 2px solid #674f04 !important;
  padding-bottom: 10px !important;
`

const BackButton = styled(Button)`
  border-radius: 10px !important;
  heigth: 54px !important;
  // border: 2px solid #674f04 !important;
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

const ImageContainer = styled(Grid)`
  grid-template-columns: 3fr 7fr;
  grid-template-rows: repeat(2, 1fr);
`

const SendButton = styled(Button)`
  background-color: #ffba00 !important;
  margin-top: 9px !important;
`

export default RegisterPage
