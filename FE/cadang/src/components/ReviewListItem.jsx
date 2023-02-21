import * as React from "react"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { styled } from "@mui/material/styles"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { Card } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import { Link, useHistory } from "react-router-dom"

import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import DeleteIcon from "@mui/icons-material/Delete"
import { deleteReview } from "../api/report"

const Img = styled("img")({
  margin: "auto",
  display: "block",
  width: "75%",
})

function ReviewListItem(props) {
  const history = useHistory()
  const [expandedIds, setExpandedIds] = useState([])

  useEffect(() => {
    console.log(props.selectIndex)
  })

  const onExpandClickHandler = (id) => {
    if (expandedIds.includes(id)) {
      setExpandedIds(expandedIds.filter((expandedId) => expandedId !== id))
    } else {
      setExpandedIds([...expandedIds, id])
    }
  }

  const deleteReviewRecord = async (reviewId) => {
    if (
      window.confirm(
        "정말 삭제하시겠습니까? 삭제된 기록은 복구가 불가능합니다."
      )
    ) {
      await deleteReview(
        reviewId,
        (res) => {
          console.log(res)
          return res
        },
        (err) => console.log(err)
      )
        .then((response) => {
          if (response.status === 200) {
            history.push("/mypage")
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  }

  // 긴 메모 내용 줄여서 표기
  const renderMemo = (memo, id) => {
    if (!memo) {
      return null
    }

    if (expandedIds.includes(id)) {
      return <Typography>{memo}</Typography>
    } else {
      return (
        <Typography  variant="body1" style={{ wordWrap: 'break-word' }}>
          {memo.length > 20 ? `${memo.slice(0, 15)}...` : memo}
          <Link onClick={() => onExpandClickHandler(id)}>
            <ExpandMoreIcon />
          </Link>
        </Typography>
      )
    }
  }

  console.log(props.reviews)
  const reviewDatas = props.reviews.recordList
  if (!reviewDatas || !reviewDatas.length) {
    return <div>아직 기록이 없어요:(</div>
  }
  return (
    <div>
      {reviewDatas.map((review) => {
        // console.log(review)
        return (
          <Card style={{ marginBottom: 5 }}>
            <Grid container xs={12} spacing={1} key={review.id} style={{display: 'flex'}}>
              <Grid item xs={3} margin="auto">
                <Img
                  id={review.id}
                  alt="drink"
                  src={review.photo}
                  sx={{ width: "100%", backgroundColor: "#fafafa" }}
                />
              </Grid>

              <Grid item xs={9} sm container>
                <Grid item xs={8}>
                  {/* 기록은 가게 이름이 안뜨는데 어카쥥 */}
                  <Typography variant="subtitle1" component="div">
                    {review.storeName !== null
                      ? review.storeName
                      : "직접추가 기록"}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle2" component="div">
                    {dayjs(review.regDate).format("YY/MM/DD")}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" component="div">
                    {review.drinkName}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">
                    {review.caffeine}mg / {review.sugar}g
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">
                    {review.cal}Kcal /{review.price}원
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  {renderMemo(review.memo, review.id)}
                  </Grid>
                  {/* <Link to={{ pathname: `/review/${review.id}`, state:{review} }}> */}
                  <Grid item xs={3}>
                  <Link
                    to={{
                      pathname: `/review/${review.id}`,
                      state: { review },
                    }}
                  >
                    <IconButton style={{ padding: 0, paddingBottom: 2 }}>
                      <EditOutlinedIcon />
                    </IconButton>
                  </Link>
                  <IconButton
                    onClick={() => deleteReviewRecord(review.id)}
                    style={{ padding: 0, paddingBottom: 2 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        )
      })}
    </div>
  )
}

export default ReviewListItem
