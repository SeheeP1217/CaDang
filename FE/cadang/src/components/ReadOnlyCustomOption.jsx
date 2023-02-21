import { Card, Grid, Divider, Box } from "@mui/material"
import styled from "styled-components"

function ReadOnlyCustomOption(props) {
  // console.log(props.data)
  const custom = props.data
  return (
    <div>
      <Divider>custom</Divider>
      <Card>
        <Grid container>
          <CustomTitle item xs={6}>
            <TitleBox>사이즈</TitleBox>
          </CustomTitle>
          <Grid item xs={6}>
            {custom.size} 사이즈
          </Grid>
          <CustomTitle item xs={6}>
            <TitleBox>샷</TitleBox>
          </CustomTitle>
          <Grid item xs={6}>
            {custom.shot}샷
          </Grid>
          <CustomTitle item xs={6}>
            <TitleBox>휘핑</TitleBox>
          </CustomTitle>
          <Grid item xs={6}>
            {custom.whip ? "O" : "X"}
          </Grid>
          <CustomTitle item xs={6}>
            <TitleBox>당도</TitleBox>
          </CustomTitle>
          <Grid item xs={6}>
            {custom.sugarContent}
          </Grid>
          <CustomTitle item xs={6}>
            <TitleBox>시럽</TitleBox>
          </CustomTitle>
          <Grid item xs={6}>
            {custom.syrup} 번
          </Grid>
          <CustomTitle item xs={6}>
            <TitleBox>바닐라 시럽</TitleBox>
          </CustomTitle>
          <Grid item xs={6}>
            {custom.vanilla} 번
          </Grid>
          <CustomTitle item xs={6}>
            <TitleBox>카라멜 시럽</TitleBox>
          </CustomTitle>
          <Grid item xs={6}>
            {custom.caramel} 번
          </Grid>
          <CustomTitle item xs={6}>
            <TitleBox>헤이즐넛 시럽</TitleBox>
          </CustomTitle>
          <Grid item xs={6}>
            {custom.hazelnut} 번
          </Grid>
        </Grid>
      </Card>
    </div>
  )
}

const CustomTitle = styled(Grid)`
  text-align: center;
`
const TitleBox = styled(Box)`
  background-color: #3a130c;
  color: #ffffff;
  border-radius: 3px;
  margin-left: 25px;
  margin-right: 25px;
  margin-top: 3px;
  margin-bottom: 3px;
`
export default ReadOnlyCustomOption
