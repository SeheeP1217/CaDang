import axios from "axios"

const token = localStorage.getItem("token")

const api = axios.create({
  baseURL: "http://i8a808.p.ssafy.io:8080",
  headers: {
    Authorization: `Token ${token}`,
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

export { userReview }
