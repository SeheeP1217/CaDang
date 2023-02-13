import axios from "axios";

const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: "http://i8a808.p.ssafy.io:8080",
  headers: {
    Authorization:
    "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzanNqbGltIiwiaWQiOjIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2NzYzMzI5MTZ9.EmP0DkZs6vpdCNfOocU_eCCHZTpK5mjDYKJn-XXAbr4-pa0o86jgRWN4apbk5-DecBmH0Ye2XhhjT5anSDoslw",
    "Content-Type": "application/json",
  },
});

// const formApi = axios.create({
//   baseURL: "http://i8a808.p.ssafy.io:8080",
//   headers: {
//     Authorization:
//     "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhYmFiMTIzNCIsImlkIjo2OSwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY3NjIxODE0NX0.s_6_v2kF_hQ4fc7CwscGr47Koq3kzgcCIROUXMiOmJvvdq4x7Cudns_smA6wgf1TgFxy4S76CxxEyuBwwepixg",
//     "Content-Type": "multipart/form-data",
//   },
// })

// camelCase로 함수 선언

//리뷰 리스트 조회
async function userReview(userId, pageIndex, success, fail) {
  const res = await api
    .get(`/record`, { params: { userId: userId, page: pageIndex, size: 10 } })
    .then(success)
    .catch(fail);
  return res;
}

//리뷰별 디테일 조회
async function userReviewDetail(reviewId, success, fail) {
  const res = await api.get(`/record/${reviewId}`).then(success).catch(fail);
  return res;
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
    .delete(`/record/${reviewId}`)
    .then(success)
    .catch(fail);
  return res;
}

// 당일 기준 레포트 데이터 조회
async function getWeeklyData(Date, success, fail) {
  const res = await api
    .get(`/data/week`, { params: { date: Date } })
    .then(success)
    .catch(fail);
  return res;
}

// 이전 일자 레포트 데이터 조회
async function getGraphData(Date, success, fail) {
  const res = await api
    .get(`/data/week/graph`, { params: { date: Date } })
    .then(success)
    .catch(fail);
  return res;
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
    .catch(fail);
  return res;
}

export { userReview, userReviewDetail, deleteReview, getWeeklyData, getGraphData, dataMonth };
