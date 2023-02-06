import React from "react"
import Carousel from "react-material-ui-carousel"
import { Paper, Card, Grid } from "@mui/material"
import "./MonthRank.css"
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded"
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded"

const items = [
  {
    name: "이번 달 많이 마신 음료 랭킹",
    top1: "1. 스타벅스 돌체라떼",
    top2: "2. 바나프레소 아이스 아메리카노",
    top3: "3. 커피빈 바닐라 라떼",
  },
  {
    name: "이번 달 카페인 함량 높은 음료 랭킹",
    top1: "1. 커피빈 바닐라 라떼",
    top2: "2. 바나프레소 아이스 아메리카노",
    top3: "3. 스타벅스 돌체라떼",
  },
  {
    name: "이번 달 당 함량 높은 음료 랭킹",
    top1: "1. 바나프레소 아이스 아메리카노",
    top2: "2. 스타벅스 돌체라떼",
    top3: "3. 커피빈 바닐라 라떼",
  },
]
function MonthRank(props) {
  return (
    <Paper>
      <Carousel
        className="carousel"
        NextIcon={<KeyboardArrowRightRoundedIcon />}
        PrevIcon={<KeyboardArrowLeftRoundedIcon />}
        navButtonsProps={{
          // 실제 버튼의 색상과 반경을 변경합니다. THIS STYLES BOTH BUTTONS
          style: {
            backgroundColor: "transparent",
            borderRadius: 0,
            color: "cornflowerblue",
            zIndex: 0,
          },
        }}
        navButtonsAlwaysVisible={true}
        animation="slide"
        cycleNavigation={false}
        autoPlay={false}
        next={() => {
          /* Do stuff */
        }}
        prev={() => {
          /* Do other stuff */
        }}
      >
        {items.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
    </Paper>
  )
}

function Item(props) {
  return (
    <Paper className="paper">
      <h2>{props.item.name}</h2>
      <p>{props.item.top1}</p>
      <p>{props.item.top2}</p>
      <p>{props.item.top3}</p>
    </Paper>
  )
}

export default MonthRank
