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
    <RankCard>
      <RankCarousel
        NextIcon={<KeyboardArrowRightRoundedIcon />}
        PrevIcon={<KeyboardArrowLeftRoundedIcon />}
        navButtonsProps={{
          // 실제 버튼의 색상과 반경을 변경합니다. THIS STYLES BOTH BUTTONS
          style: {
            backgroundColor: "transparent",
            borderRadius: 0,
            color: "#3A130C",
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
    </RankCard>
  )
}

function Item(props) {
  return (
    <Card>
      <Title>{props.item.name}</Title>
      {props.ranking.map((rank, i) => (
        <List key={i}>
          {i + 1}. {rank}
        </List>
      ))}
    </Card>
  )
}
const RankCarousel = styled(Carousel)`
  margin: 0 auto;
  font-family: "netmarble";
  border-top: 6px solid #ffba00 !important;
`

const Title = styled.h3`
  margin: 5px !important;
`

const List = styled.p`
  margin: 10px !important;
`

const RankCard = styled(Card)`
  margin-top: 10px !important;
`

export default MonthRank
