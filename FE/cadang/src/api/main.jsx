import axios from "axios"

const token = localStorage.getItem("token")

const api = axios.create({
  baseURL: "http://i8a808.p.ssafy.io:8080",
  headers: {
    Authorization:
    "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhYmFiMTIzNCIsImlkIjo2OSwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY3NjEzMTMzMX0.f7J33C-yMlQgLubKGHXeR81rFFGCdnHf244A1QfUs-eEKKru4Dtwxt-I5XYWpy5ZujjMHPBLHUWFA6eqP3fBsw",
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
