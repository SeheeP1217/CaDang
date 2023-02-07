import axios from "axios"

const api = axios.create({
  baseURL: "http://i8a808.p.ssafy.io:8080",
  headers: {
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
}

export { cafeDrinkData, cafeDrinkList }
