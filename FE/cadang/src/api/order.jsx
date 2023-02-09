import axios from "axios"

const token = localStorage.getItem("token")

const api = axios.create({
  baseURL: "http://i8a808.p.ssafy.io:8080",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhYmFiMTIzNCIsImlkIjoxOSwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY3NTg0NTUyOH0.XWZ70Gf5gAjVZahqh4FnLzhVnXBUFrpI3FDAG6gNRChyk3v4Oshkw_jtwJWi-bDSooMvavz7YFl3wiJEvwlG5w",

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

async function cafeDrinkList(userId, date, storeName, success, fail) {
  const res = await api
    .get(`/cafe/drinklist`, {
      params: {
        userId: userId,
        date: date,
        storeName: storeName,
      },
    })
    .then(success)
    .catch(fail)
  return res
}

export { cafeDrinkData, cafeDrinkList }
