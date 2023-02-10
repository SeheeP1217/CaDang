import axios from "axios"

const token = localStorage.getItem("token")

const api = axios.create({
  baseURL: "http://i8a808.p.ssafy.io:8080",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhYmFiMTIzNCIsImlkIjoxOSwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY3NjA3MzM2NX0.v7Wl5Q4_iLE7djrJ3OjkxO27lfticCWPPPQMSQLlzsxbI7517FR7FoISS68cG9lpOf5AULRZ7C985dtgelcMAw",
  },
})

const formApi = axios.create({
  baseURL: "http://i8a808.p.ssafy.io:8080",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhYmFiMTIzNCIsImlkIjoxOSwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY3NjA3MzM2NX0.v7Wl5Q4_iLE7djrJ3OjkxO27lfticCWPPPQMSQLlzsxbI7517FR7FoISS68cG9lpOf5AULRZ7C985dtgelcMAw",
    "Content-Type": "multipart/form-data",
  },
})

// camelCase로 함수 선언

//리뷰 리스트 조회
async function userReview(userId, pageIndex, success, fail) {
  const res = await api
    .get(`/record`, { params: { userId: userId, page: pageIndex, size: 10 } })
    .then(success)
    .catch(fail)
  return res
}

//리뷰별 디테일 조회
async function userReviewDetail(reviewId, success, fail) {
  const res = await api.get(`/record/${reviewId}`).then(success).catch(fail)
  return res
}

//리뷰별 디테일 수정
// async function modifyReviewDetail(modifyData, success, fail) {
//   const res = await formApi
//     .put(`/record/`, modifyData)
//     .then(success)
//     .catch(fail)
//   return res
// }

//리뷰 삭제
async function deleteReview(reviewId, success, fail) {
  const res = await api
    .delete(`/record/${reviewId}`, { params: { recordId: reviewId } })
    .then(success)
    .catch(fail)
  return res
}

//캘린더
async function dataMonth(date, success, fail) {
  const res = await api
    .get("/data/month", {
      params: {
        date: date,
      },
    })
    .then(success)
    .catch(fail)
  return res
}

export { userReview, userReviewDetail, deleteReview, dataMonth }
