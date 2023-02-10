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