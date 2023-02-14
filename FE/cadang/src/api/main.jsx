import axios from "axios"

const token = localStorage.getItem("token")

const api = axios.create({
  baseURL: "http://i8a808.p.ssafy.io:8080",
  headers: {
    Authorization:
    "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzanNqbGltIiwiaWQiOjIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2NzY0MjM4MjZ9.7OA_nrQzOYLSqqBunIr81qr9BaynoLuG5qyHPxRFMIDa5ZCUmnsKIdBBhok9xdTSL0Pq4CeDB9Dl5FGu4wTVbw",
    "Content-Type": "application/json",
  },
})

// camelCase로 함수 선언, ()
async function recommendDrinks(storeNames, date, success, fail) {
  const res = await api
    .post(`/cafe/recommend`, {
      storeNames: storeNames,
      date: date,
    })
    .then(success)
    .catch(fail)
  return res
}

async function todayDashboard(date, success, fail) {
  const res = await api
    .get(`/data/day`, {
      params: {
        date: date,
      },
    })
    .then(success)
    .catch(fail)
  return res
}

export { recommendDrinks, todayDashboard }
