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
import { Card } from "@mui/material"
import { Link } from "react-router-dom"
import dayjs from "dayjs"
import styled from "styled-components"

// 검색바 import
import AutocompleteSearchBar from "../../components/util/AutocompleteSearchBar"

// 기록 리스트
import List from "@mui/joy/List"
import Paper from "@mui/material/Paper"

import MainDailyConsumptionGraph from "../../components/util/MainDailyConsumptionGraph"
import MainDailyOtherInfo from "../../components/MainDailyOtherInfo"
import ReviewListItem from "../../components/ReviewListItem"
import { Box } from "@mui/system"

// api
import { userReview } from "../../api/report"
import { todayDashboard } from "../../api/main"

function MyPage() {
  const userId = 2
  const pageIndex = 1

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
        userId,
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

  return (
    <>
      <div style={{ position: "sticky", top: 0, zIndex: 1 }}>
        <TitleBox>
          <Typography level="h3" fontSize="xl" fontWeight="xl">
            MyPage
          </Typography>
        </TitleBox>
      </div>
      <Card sx={{ mb: 2, pl: 1 }}>
        <Grid container textAlign="center">
          <Grid item xs={2} margin="auto">
            <Avatar src="/static/images/avatar/1.jpg" />
            <Typography>김싸퓌</Typography>
          </Grid>
          <Grid item xs={10}>
            <MainDailyConsumptionGraph data={dashboard} />
          </Grid>
          <Grid item xs={12}>
            <MainDailyOtherInfo data={dashboard} />
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

      <div style={{ position: "sticky", top: 0, zIndex: 1 }}>
        <TitleBox sx={{ paddingY: 0 }}>
          <AutocompleteSearchBar label="메뉴, 카페명 검색" data={top100Films} />
        </TitleBox>
      </div>
      <Paper variant="outlined" sx={{ backgroundColor: "#fff3e0" }}>
        <Typography
          level="body4"
          fontWeight="xl"
          sx={{ letterSpacing: "0.15rem" }}
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
        </List>
      </Paper>
    </>
  )
}

export default MyPage

const data = [
  {
    name: "카페인",
    consumption: 2400,
    change: 4000,
  },
  {
    name: "당",
    consumption: 1398,
    change: 3000,
  },
]

const dailyData = [
  {
    calorie: 4000,
    money: 2400,
  },
]

const TitleBox = styled(Box)`
  margin-top: 2px;
  margin-left: 1px;
  padding-top: 1px;
  paddign-top: 2px;
  border-bottom: 2px solid #ffab00 !important;
`

const top100Films = [
  { title: "아이스 아메리카노", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
  },
  {
    title: "Star Wars: Episode V - The Empire Strikes Back",
    year: 1980,
  },
  { title: "Forrest Gump", year: 1994 },
  { title: "Inception", year: 2010 },
  {
    title: "The Lord of the Rings: The Two Towers",
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: "Goodfellas", year: 1990 },
  { title: "The Matrix", year: 1999 },
  { title: "Seven Samurai", year: 1954 },
  {
    title: "Star Wars: Episode IV - A New Hope",
    year: 1977,
  },
  { title: "City of God", year: 2002 },
  { title: "Se7en", year: 1995 },
  { title: "The Silence of the Lambs", year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: "Life Is Beautiful", year: 1997 },
  { title: "The Usual Suspects", year: 1995 },
  { title: "Léon: The Professional", year: 1994 },
  { title: "Spirited Away", year: 2001 },
  { title: "Saving Private Ryan", year: 1998 },
  { title: "Once Upon a Time in the West", year: 1968 },
  { title: "American History X", year: 1998 },
  { title: "Interstellar", year: 2014 },
  { title: "Casablanca", year: 1942 },
  { title: "City Lights", year: 1931 },
  { title: "Psycho", year: 1960 },
  { title: "The Green Mile", year: 1999 },
  { title: "The Intouchables", year: 2011 },
  { title: "Modern Times", year: 1936 },
  { title: "Raiders of the Lost Ark", year: 1981 },
  { title: "Rear Window", year: 1954 },
  { title: "The Pianist", year: 2002 },
  { title: "The Departed", year: 2006 },
  { title: "Terminator 2: Judgment Day", year: 1991 },
  { title: "Back to the Future", year: 1985 },
  { title: "Whiplash", year: 2014 },
  { title: "Gladiator", year: 2000 },
  { title: "Memento", year: 2000 },
  { title: "The Prestige", year: 2006 },
  { title: "The Lion King", year: 1994 },
  { title: "Apocalypse Now", year: 1979 },
  { title: "Alien", year: 1979 },
  { title: "Sunset Boulevard", year: 1950 },
  {
    title:
      "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
    year: 1964,
  },
  { title: "The Great Dictator", year: 1940 },
  { title: "Cinema Paradiso", year: 1988 },
  { title: "The Lives of Others", year: 2006 },
  { title: "Grave of the Fireflies", year: 1988 },
  { title: "Paths of Glory", year: 1957 },
  { title: "Django Unchained", year: 2012 },
  { title: "The Shining", year: 1980 },
  { title: "WALL·E", year: 2008 },
  { title: "American Beauty", year: 1999 },
  { title: "The Dark Knight Rises", year: 2012 },
  { title: "Princess Mononoke", year: 1997 },
  { title: "Aliens", year: 1986 },
  { title: "Oldboy", year: 2003 },
  { title: "Once Upon a Time in America", year: 1984 },
  { title: "Witness for the Prosecution", year: 1957 },
  { title: "Das Boot", year: 1981 },
  { title: "Citizen Kane", year: 1941 },
  { title: "North by Northwest", year: 1959 },
  { title: "Vertigo", year: 1958 },
  {
    title: "Star Wars: Episode VI - Return of the Jedi",
    year: 1983,
  },
  { title: "Reservoir Dogs", year: 1992 },
  { title: "Braveheart", year: 1995 },
  { title: "M", year: 1931 },
  { title: "Requiem for a Dream", year: 2000 },
  { title: "Amélie", year: 2001 },
  { title: "A Clockwork Orange", year: 1971 },
  { title: "Like Stars on Earth", year: 2007 },
  { title: "Taxi Driver", year: 1976 },
  { title: "Lawrence of Arabia", year: 1962 },
  { title: "Double Indemnity", year: 1944 },
  {
    title: "Eternal Sunshine of the Spotless Mind",
    year: 2004,
  },
  { title: "Amadeus", year: 1984 },
  { title: "To Kill a Mockingbird", year: 1962 },
  { title: "Toy Story 3", year: 2010 },
  { title: "Logan", year: 2017 },
  { title: "Full Metal Jacket", year: 1987 },
  { title: "Dangal", year: 2016 },
  { title: "The Sting", year: 1973 },
  { title: "2001: A Space Odyssey", year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: "Toy Story", year: 1995 },
  { title: "Bicycle Thieves", year: 1948 },
  { title: "The Kid", year: 1921 },
  { title: "Inglourious Basterds", year: 2009 },
  { title: "Snatch", year: 2000 },
  { title: "3 Idiots", year: 2009 },
  { title: "Monty Python and the Holy Grail", year: 1975 },
]
