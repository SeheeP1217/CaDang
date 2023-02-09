import * as React from "react";
import { Fragment, useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Grid, Card } from "@mui/material";
import Typography from "@mui/joy/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { userReviewDetail, modifyReviewDetail } from "../../api/report";

import ModifyReviewInfo from "../../components/ModifyReviewInfo";
import ReadOnlyCustomOption from "../../components/ReadOnlyCustomOption";

const ReviewPage = () => {
  const location = useLocation();
  const reviewId = location.state.review.id;

  const [reviewDetail, setreviewDetail] = useState({
    reviewDetail: [
      {
        id: 0,
        photo: "string",
        drinkName: "string",
        caffeine: 0,
        sugar: 0,
        cal: 0,
        price: 0,
        regDate: "2023-02-08T10:57:49.450Z",
        memo: "string",
        size: "string",
        shot: 0,
        whip: true,
        sugarContent: "LESS",
        syrup: 0,
        vanilla: 0,
        caramel: 0,
        hazelnut: 0,
        orderStatus: "REQUEST",
        efaultUrl: "string",
      },
    ],
  });

  const [modifyDate, setmodifyDate] = useState(reviewDetail.regDate);
  const [modifyIsPublic, setmodifyIsPublic] = useState(true);
  const [modifyMemo, setModifyMemo] = useState(reviewDetail.memo);
  const [modifyImage, setImage] = useState(reviewDetail.photo);
  const [isModified, setIsModified] = useState(0);

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

  /////////날짜 변경 확인
  const getRecordDate = (dateInfo) => {
    const newDate = dateInfo;
    setmodifyDate(newDate);
    console.log(modifyDate);
  };

  useEffect(() => {
    getRecordDate();
  }, [modifyDate]);

  /////////이미지 변경 확인
  const getImg = (image_file, preview_URL) => {
    const newImage = { image_file, preview_URL };
    setImage(newImage);
    console.log(modifyImage);
  };

  const changeImg = () => {
    setIsModified(1);
    console.log(isModified);
  };

  const deleteImg = () => {
    setIsModified(2);
    console.log(isModified);
  };

  useEffect(() => {
    changeImg();
    deleteImg();
  }, [modifyImage]);

  //리뷰글 변경 확인
  const onChangeMemo = (e) => {
    setModifyMemo(e.target.value);
  };

  const modifyReviewDetailRecord = async () => {
    const modifyData = JSON.stringify({
      id: reviewDetail.id,
      regDate: modifyDate,
      isPublic: true,
      memo: modifyMemo,
      image: modifyImage,
      isModified: isModified,
    })
    await modifyReviewDetail(
      modifyData,
      (res) => console.log(res),
      (err) => console.log(err),
    ).then((res) => {
      if (res.status === 200) {
        window.location.reload()
      }
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
          fullWidth
          id="standard-multiline-static"
          placeholder={reviewDetail.memo}
          multiline
          rows={4}
          variant="standard"
          onChange={onChangeMemo}
        />
      </Card>
      <ReadOnlyCustomOption data={reviewDetail} />
      <Grid item>
        <Button fullWidth={true} onClick={modifyReviewDetailRecord}>저장하기</Button>
      </Grid>
    </Fragment>
  );
};

export default ReviewPage;
