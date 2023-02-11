import React from "react"
import Carousel from "react-material-ui-carousel"
import { Card } from "@mui/material"
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded"
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded"
import styled from "styled-components"

function MonthRank(props) {
  const items = [
    {
      name: "이번 달 많이 마신 음료 랭킹",
      type: "favRanking",
    },
    {
      name: "이번 달 카페인 함량 높은 음료 랭킹",
      type: "caffeRanking",
    },
    {
      name: "이번 달 당 함량 높은 음료 랭킹",
      type: "sugarRanking",
    },
  ]

  console.log("propsfav", props.favRanking)
  console.log("propssugar", props.sugarRanking)
  console.log("propscaffe", props.caffeRanking)
  return (
    <Card>
      <RankCarousel
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
          <Item key={i} item={item} ranking={props[item.type]} />
        ))}
      </RankCarousel>
    </Card>
  )
}

function Item(props) {
  return (
    <Card>
      <h3>{props.item.name}</h3>
      {props.ranking.map((rank, i) => (
        <p key={i}>
          {i + 1}. {rank}
        </p>
      ))}
    </Card>
  )
}
const RankCarousel = styled(Carousel)`
  margin: 0 auto;
  font-family: "netmarble";
`

export default MonthRank
