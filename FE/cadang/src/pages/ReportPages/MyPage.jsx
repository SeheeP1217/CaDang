import * as React from "react"
import { useMemo, useState } from "react"
import Button from "@mui/material-next/Button"
// import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack"
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch"
import AssessmentIcon from "@mui/icons-material/Assessment"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import Typography from "@mui/joy/Typography"
import Avatar from "@mui/joy/Avatar"
import Grid from "@mui/material/Grid"
import { Card, TextField } from "@mui/material"
import { Link } from "react-router-dom"
import dayjs from "dayjs"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import styled from "styled-components"

// 검색바 import
import ReviewSearchBar from "../../components/util/ReviewSearchBar"
import Pagination from "@mui/material/Pagination"

// 기록 리스트
import List from "@mui/joy/List"
import Paper from "@mui/material/Paper"

import MainDailyConsumptionGraph from "../../components/util/MainDailyConsumptionGraph"
import MainDailyOtherInfo from "../../components/MainDailyOtherInfo"
import ReviewListItem from "../../components/ReviewListItem"
import { Box } from "@mui/system"

// api
import { userReview, userSearchReview } from "../../api/report"
import { todayDashboard } from "../../api/main"
import { useEffect } from "react"

function MyPage() {
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
  const [pageIndex, setPageIndex] = useState(1)
  const [searchKeyword, setSearchKeyword] = useState("")

  const [selectIndex, setSelectIndex] = useState(-1)

  const getModifyReviewIndex = (selectIndexId) => {
    setSelectIndex(selectIndexId)
  }

  const [review, setReview] = useState({
    recordList: [
      {
        id: -1,
        storeName: "",
        drinkName: "",
        regDate: "",
        caffeine: 0,
        sugar: 0,
        cal: 0,
        price: 0,
        memo: null,
        photo: "",
        public: true,
      },
    ],
  })

  const [dashboard, setDashboard] = useState({
    userId: 0,
    nickname: "",
    image: "",
    date: "",
    caffeGoal: 0,
    sugarGoal: 0,
    caffeDaily: 0,
    sugarDaily: 0,
    calDaily: 0,
    moneyDaily: 0,
    caffeSuccess: true,
    sugarSuccess: true,
  })

  useMemo(() => {
    const getDashboard = async () => {
      await todayDashboard(
        dayjs().format("YYYY-MM-DD"),
        (res) => {
          return res.data
        },
        (err) => console.log(err)
      ).then((data) => setDashboard(data))
    }

    const getReviews = async () => {
      await userReview(
        pageIndex,
        (res) => {
          return res.data
        },
        (err) => console.log(err)
      ).then((data) => setReview(data))
    }
    getReviews()
    getDashboard()
    console.log(review)
  }, [])

  useEffect(() => {
    const getReviews = async () => {
      await userReview(
        pageIndex,
        (res) => {
          return res.data
        },
        (err) => console.log(err)
      ).then((data) => setReview(data))
    }
    getReviews()
    console.log(review)
  }, [pageIndex])

  const getPageIndex = (idx) => {
    setPageIndex(idx)
  }

  // 검색어 Input
  const onChangeKeyword = (e) => {
    setSearchKeyword(e.target.value)
  }

  // 리뷰 검색 axios
  const getSearchedReviews = async () => {
    await userSearchReview(
      1,
      searchKeyword,
      (res) => {
        console.log(res)
        return res.data
      },
      (err) => console.log(err)
    ).then((data) => setReview(data))
  }

  return (
    <div>
      <TitleBox>
        <Typography level="h3" fontSize="xl" fontWeight="xl">
          MyPage
        </Typography>
      </TitleBox>
      <Card sx={{ mb: 2 }}>
        <Grid container textAlign="center">
          <Grid item xs={3} padding="12px">
            <Avatar
              style={{
                width: "100px",
                height: "100px",
                margin: "2px",
                textAlign: "center",
              }}
              src={dashboard.image}
            />
          </Grid>
          <Grid item xs={9} style={{ paddingTop: "22px" }}>
            <Typography style={{ textAlign: "center", paddingLeft: "14px" }}>
              {dashboard.nickname} 님이
              <br />
              오늘 섭취한 양이에요
            </Typography>
            <MainDailyOtherInfo data={dashboard} />
          </Grid>
          <Grid item xs={12}>
            <MainDailyConsumptionGraph data={dashboard} />
          </Grid>
        </Grid>
      </Card>
      <Stack spacing={1}>
        <Button
          sx={{
            backgroundColor: "#ffba00",
            color: "white",
            fontFamily: "netmarble",
            fontSize: "20px",
            mt: "5px",
            mb: "5px",
            boxShadow: "2px 2px 2px 1px #FFab00",
          }}
          component={Link}
          to="/payment-report"
          variant="filledTonal"
          startIcon={
            <ContentPasteSearchIcon sx={{ color: "white", fontSize: "30px" }} />
          }
          endIcon={<ArrowForwardIosIcon sx={{ color: "white" }} />}
        >
          주문 내역 보러가기
        </Button>
        <Button
          sx={{
            backgroundColor: "#ffba00",
            color: "white",
            fontFamily: "netmarble",
            fontSize: "20px",
            mt: "5px",
            mb: "10px",
            boxShadow: "2px 2px 2px 1px #FFab00",
          }}
          component={Link}
          to="/report"
          variant="filledTonal"
          startIcon={<AssessmentIcon sx={{ color: "white" }} />}
          endIcon={<ArrowForwardIosIcon sx={{ color: "white" }} />}
        >
          내 리포트 보러가기
        </Button>
      </Stack>
      <Paper
        variant="outlined"
        sx={{ backgroundColor: "#fff3e0", marginTop: 2 }}
      >
        <TitleBox sx={{ paddingY: 0 }}>
          <InputTextBox
            id="outlined-basic"
            label="메뉴명 검색"
            variant="outlined"
            size="small"
            onChange={onChangeKeyword}
            InputProps={{
              classes: {
                root: {
                  borderColor: "#ffab00",
                },
              },
            }}
            style={{ marginTop: 10, marginLeft: 3 }}
          />
          <Button
            onMouseDown={getSearchedReviews}
            sx={{
              backgroundColor: "#3A130C",
              color: "white",
              fontFamily: "netmarble",
              fontSize: "15px",
              margin: 1,
            }}
          >
            검색
          </Button>
          {/* <ReviewSearchBar label="메뉴, 카페명 검색" data={review} getSearchedReviews={getSearchedReviews} onChangeKeyword={onChangeKeyword} /> */}
        </TitleBox>
        <Typography
          level="body4"
          fontWeight="xl"
          sx={{ letterSpacing: "0.15rem", marginTop: 1 }}
        >
          나의 기록
        </Typography>
        <List
          aria-labelledby="ellipsis-list-demo"
          sx={{ "--List-decorator-size": "56px" }}
        >
          <ReviewListItem
            reviews={review}
            selectIndex={selectIndex}
            onClick={getModifyReviewIndex}
          />
          <Stack spacing={2}>
            <Pagination
              style={{ margin: "auto" }}
              count={review.totalPage}
              shape="rounded"
              onChange={(e, value) => getPageIndex(value)}
            />
          </Stack>
        </List>
      </Paper>
    </div>
  )
}

export default MyPage

const TitleBox = styled(Box)`
  margin-top: 2px;
  margin-left: 1px;
  padding-top: 1px;
  paddign-top: 2px;
  border-bottom: 2px solid #ffab00 !important;
`

const ImageContainer = styled(Grid)`
  grid-template-columns: 3fr 7fr;
  grid-template-rows: repeat(2, 1fr);
`

const InputTextBox = styled(TextField)`
  border-color: #ffab00;
`
