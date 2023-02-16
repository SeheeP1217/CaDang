import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
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
} from "@mui/material/";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styled from "styled-components";
import ModifyProfileImageUploader from "../../components/util/ModifyProfileImageUploader";
import default_image from "../../assets/default_image.png";
import GoalSettingItem from "../../components/util/goalSettingItem";
import { useMemo } from "react";
import { getUserProfile } from "../../api/user";
import { useEffect } from "react";

const UpdateProfilePage = () => {
  const history = useHistory()
  const theme = createTheme()

  // 기존 프로필 불러오기
  const [userProfile, setuserProfile] = useState({
    memberId: "",
    username: "",
    nickname: "",
    email: "",
    caffeGoal: 0,
    sugarGoal: 0,
    imgUrl: "",
    isModified: 0,
  });

  // 변경 정보 보낼 변수 선언
  const [changedProfile, setchangedProfile] = useState({
  nickname: "",
  caffeGoal: 1000,
  sugarGoal: 500,
  img: "",
  isModified: 0,
  });

  // 변화값 담을 변수
  const [modifiedImage, setModifiedImage] = useState({
    image_file: "",
    preview_URL: userProfile.imgUrl,
  })

  useMemo(() => {
    const getUserInfo = async () => {
      await getUserProfile(
        (res) => {
          return res.data;
        },
        (err) => console.log(err)
      ).then((data) => setuserProfile(data));
    };
    getUserInfo();
  }, []);

  useEffect(() => {
    setchangedProfile({
      nickname: userProfile.nickname,
      caffeGoal: userProfile.caffeGoal,
      sugarGoal: userProfile.sugarGoal,
      img: userProfile.imgUrl,
      isModified: 0
      })
  }, [userProfile]);

  console.log(userProfile);
  console.log(changedProfile);

  // 카페인 목표량 
  const onChangeCaffeineGoal = (e) => {
    setchangedProfile({
      ...changedProfile,
      caffeGoal: e.target.value,
  })
  }

  // 당 목표량
  const onChangeSugarGoal = (e) => {
    setchangedProfile({
      ...changedProfile,
      sugarGoal: e.target.value,
  })
  }

  // 프로필 이미지 변경 확인
  const getImg = (image_file, preview_URL) => {
      const newImage = {
        image_file: image_file,
        preview_URL: preview_URL
      }
      setModifiedImage(newImage)
    }
  const changeImg = () => {
    setchangedProfile({
      ...changedProfile,
      isModified: 1,
  })
  }

  const deleteImg = () => {
    setchangedProfile({
      ...changedProfile,
      isModified: 2,
  })
  }

  // 닉네임 변경 확인
  const onChangeNickname = (e) => {
    setchangedProfile({
      ...changedProfile,
      nickname: e.target.value,
  })
  }

  const data = new FormData()
  data.append("img", modifiedImage.image_file)
  data.append("nickname", changedProfile.nickname)
  data.append("caffeGoal", changedProfile.caffeGoal)
  data.append("sugarGoal", changedProfile.sugarGoal)
  data.append("isModified", changedProfile.isModified)

  const modifyInfo = async (e) => {
    e.preventDefault()
    await axios
      .put("http://localhost:8080/user2/modify", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          // "Content-Type": "application/json",
          Authorization:localStorage.getItem('login-token'),
        },
        // params: changedProfile,
      })
      .then((response) => {
        console.log(response, "성공")
        if (response.status === 200) {
          alert('정보가 성공적으로 변경되었습니다.')
          history.push("/mypage")
        }
      })
      .catch(function (err) {
        console.log(err)
      })
  }

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            회원 정보 수정
          </Typography>
          <ModifyProfileImageUploader defaultImage={userProfile.imgUrl} getImg={getImg}
          changeImg={changeImg}
          deleteImg={deleteImg}
          />
          <Boxs component="form" noValidate sx={{ mt: 2 }}>
            <FormControl component="fieldset" variant="standard">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography>이름</Typography>
                  <TextField fullWidth disabled label={userProfile.username} />
                </Grid>
                <Grid item xs={12}>
                  <Typography>아이디</Typography>
                  <TextField fullWidth disabled label={userProfile.memberId} />
                </Grid>

                <Grid item xs={12}>
                  <Typography>E-mail</Typography>
                  <TextField fullWidth disabled label={userProfile.email} />
                </Grid>

                <Grid item xs={12}>
                  <Typography>닉네임</Typography>
                  <TextField
                    fullWidth
                    defaultValue={userProfile.nickname}
                    onChange={onChangeNickname}
                  />
                </Grid>
              </Grid>
              <Button fullWidth style={{backgroundColor:'#ffba00', color:'white'}} sx={{ mt: 3 }} size="large">
                비밀번호 변경하기
              </Button>
              <GoalSettingItem 
              caffeineGoal={userProfile.caffeGoal}
              sugarGoal={userProfile.sugarGoal}
              onChangeCaffeineGoal={onChangeCaffeineGoal}
              onChangeSugarGoal={onChangeSugarGoal}/>
              <Button
                type="submit"
                style={{backgroundColor:'#ffba00', color:'white'}}
                sx={{ mt: 3 }}
                size="large"
                onClick={modifyInfo}
              >
                저장
              </Button>
              <Button variant="contanined" sx={{ mt: 3 }}>
                로그아웃
              </Button>
              <Button variant="contanined" sx={{ mt: 3 }}>
                회원탈퇴
              </Button>
            </FormControl>
          </Boxs>
        </Box>
      </Container>
  );
  
};

const SendButton = styled.button`
  background-color: #ffffff;
`;
const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700 !important;
  color: #d32f2f !important;
`;

const Boxs = styled(Box)`
  padding-bottom: 10px !important;
`;
export default UpdateProfilePage;
