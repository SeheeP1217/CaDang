import axios from "axios"

const token = localStorage.getItem("token")

const api = axios.create({
  baseURL: "http://i8a808.p.ssafy.io:8080",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhYmFiMTIzNCIsImlkIjo2OSwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY3NjA5ODMwOH0.sW7OaiNg0mOT0euRy1po_cguzTrPTJpqWcg2piKOIh9DKcEC1Ds_r4UAnDD8v1pLxHLl-KTOpij8ejwKdsPPag",
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
