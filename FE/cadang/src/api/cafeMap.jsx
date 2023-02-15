import axios from "axios"

const token = localStorage.getItem("token")

const api = axios.create({
  baseURL: "http://i8a808.p.ssafy.io:8080",
  headers: {
    Authorization:localStorage.getItem('login-token'),
    // Authorization:
    // "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzanNqbGltIiwiaWQiOjIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2NzY0MjM4MjZ9.7OA_nrQzOYLSqqBunIr81qr9BaynoLuG5qyHPxRFMIDa5ZCUmnsKIdBBhok9xdTSL0Pq4CeDB9Dl5FGu4wTVbw",
    "Content-Type": "application/json",
  },
})

async function checkCafeList(date, storeName, success, fail) {
  const res = await api
    .get(`/cafe/drinklist`, {
      params: {
        date: date,
        storeName: storeName,
      },
    })
    .then(success)
    .catch(fail)
  return res
}

export { checkCafeList }
