import axios from "axios"

const token = localStorage.getItem("token")

const api = axios.create({
  baseURL: "http://i8a808.p.ssafy.io:8080",
  headers: {
    Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhYmFiMTIzNCIsImlkIjoxOSwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY3NTk0NDgxMn0.0wKt87MoJnFpoIuwQZeBnj8e1v3LOGpBDEY2duER05ruO-G_D-Ub3TmKGiD0QkS7O1jJBaXzYHYmfF3ceb6ANg",
    "Content-Type": "application/json",
  },
})

// camelCase로 함수 선언, ()
async function userReview(userId, pageIndex, success, fail) {
  const res = await api
    .get(`/record`, { params: { userId: userId, page: pageIndex, size: 10 } })
    .then(success)
    .catch(fail)
  return res
}

async function userReviewDetail(reviewId, success, fail) {
  const res = await api
    .get(`/record/${reviewId}`, { params: { recordId: reviewId } })
    .then(success)
    .catch(fail)
  return res
}

export { userReview, userReviewDetail, }
