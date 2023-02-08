import axios from "axios"

const token = localStorage.getItem("token")

const api = axios.create({
  baseURL: "http://i8a808.p.ssafy.io:8080",
  headers: {
    Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhYmFiMTIzNCIsImlkIjoxOSwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY3NTg0Njc3N30.dDqU2_55_N-XNPy4e199ufyR48qsJNat1YTpu_nSPhkKK_jXsRYr5l_dC2b938AOhXSSrICvA-lfGrLpMtw6IA",
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
