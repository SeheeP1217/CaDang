import * as React from "react";
import axios from "axios";
import dayjs from "dayjs";
import { Fragment, useState, useMemo, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Grid, Card } from "@mui/material";
import Typography from "@mui/joy/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { userReviewDetail } from "../../api/report";

import ModifyReviewInfo from "../../components/ModifyReviewInfo";
import ReadOnlyCustomOption from "../../components/ReadOnlyCustomOption";

const ReviewPage = () => {
  const history = useHistory();
  const location = useLocation();
  const reviewId = location.state.review.id;
  const originImg = location.state.review.photo;

  const [reviewDetail, setreviewDetail] = useState({
    reviewDetail: [
      {
        id: 0,
        photo: "",
        drinkName: "0",
        caffeine: 0,
        sugar: 0,
        cal: 0,
        price: 0,
        regDate: "0",
        memo: "0",
        size: "0",
        shot: 0,
        whip: null,
        sugarContent: "LESS",
        syrup: 0,
        vanilla: 0,
        caramel: 0,
        hazelnut: 0,
        orderStatus: "",
        defaultUrl: "",
      },
    ],
  });

  const [modifyDate, setmodifyDate] = useState(dayjs(reviewDetail.regDate).format("YYYY-MM-DD"));
  // const [modifyIsPublic, setmodifyIsPublic] = useState(true);
  const [modifyMemo, setModifyMemo] = useState(reviewDetail.memo);
  const [modifyImage, setModifyImage] = useState({
    image_file: "",
    preview_URL: originImg,
  });

  // console.log(modifyDate)
  useMemo(() => {
    const getReviewDetails = async () => {
      await userReviewDetail(
        reviewId,
        (res) => {
          return res.data;
        },
        (err) => console.log(err)
      ).then((data) => setreviewDetail(data));
    };
    getReviewDetails();
  }, [reviewId]);

  useEffect(() => {
    setmodifyDate(dayjs(reviewDetail.regDate).format("YYYY-MM-DD"));
    setModifyMemo(reviewDetail.memo);
    setModifyImage({
      image_file: "",
      preview_URL: originImg,
    });
  }, [reviewDetail, originImg]);

  // console.log(reviewDetail);
  const [isModified, setIsModified] = useState(0);

  /////////날짜 변경 확인
  const getRecordDate = (newValue) => {
    setmodifyDate(newValue);
  };

  /////////이미지 변경 확인
  const getImg = (image_file, preview_URL) => {
    const newImage = { image_file, preview_URL };
    setModifyImage(newImage);
  };

  const changeImg = () => {
    setIsModified(1);
    // console.log(isModified)
  };

  const deleteImg = () => {
    setIsModified(2);
    // console.log(isModified)
  };

  //리뷰글 변경 확인
  const onChangeMemo = (e) => {
    setModifyMemo(e.target.value);
  };

  const modifyData = {
    id: reviewDetail.id,
    regDate: modifyDate,
    isPublic: true,
    memo: modifyMemo,
    isModified: isModified,
  };

  // console.log(modifyData)
  const formData = new FormData();
  if (modifyImage.image_file) {
    formData.append("image", modifyImage.image_file);
  }
  formData.append("data", JSON.stringify(modifyData));

  const modifyReviewDetailRecord = async () => {
    await axios
      .put("http://i8a808.p.ssafy.io:8080/record", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("login-token"),
        },
        params: modifyData,
      })
      .then(function (response) {
        // console.log(response, "성공")
        if (response.status === 200) {
          history.push("/mypage");
        }
      })
      .catch(function (err) {
        // console.log(err)
      });
  };

  return (
    <Fragment>
      <Typography level="h3" fontSize="xl" fontWeight="xl">
        Review
      </Typography>
      <ModifyReviewInfo
        data={reviewDetail}
        image={modifyImage}
        getImg={getImg}
        changeImg={changeImg}
        deleteImg={deleteImg}
        getRecordDate={getRecordDate}
      />
      <Card sx={{ marginTop: 2, height: 110 }}>
        <TextField
          defaultValue={reviewDetail.memo}
          fullWidth
          multiline
          rows={4}
          variant="standard"
          onChange={onChangeMemo}
        />
      </Card>
      <ReadOnlyCustomOption data={reviewDetail} />
      <Grid item>
        <Button fullWidth={true} onClick={modifyReviewDetailRecord}>
          저장하기
        </Button>
      </Grid>
    </Fragment>
  );
};

export default ReviewPage;
