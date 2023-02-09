import axios from "axios"

const token = localStorage.getItem("token")

const api = axios.create({
  baseURL: "http://i8a808.p.ssafy.io:8080",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwYXJrNjkzOCIsImlkIjo0OCwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY3NjAyNjU2Nn0.-H4CaYC4mHQVbEHf29dQYoPUeBGjfqSjYUDTDoUl7EdeJvMuR0wrIsNEACrc6sDehioQZm0pAer168RRfy_cDg",

    // Authorization: `Token ${token}`,
    "Content-Type": "application/json",
  },
})

// camelCase로 함수 선언, ()
async function cafeDrinkData(franchiseId, drinkName, storeName, success, fail) {
  const res = await api
    .get(`/cafe/drink`, {
      params: {
        franchiseId: franchiseId,
        drinkName: drinkName,
        storeName: storeName,
      },
    })
    .then(success)
    .catch(fail)
  return res
}

async function cafeDrinkList(date, storeName, success, fail) {
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

export { cafeDrinkData, cafeDrinkList }
