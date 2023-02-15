import axios from "axios"

const token = localStorage.getItem("token")

const api = axios.create({
  baseURL: "http://i8a808.p.ssafy.io:8080",
  headers: {
    Authorization:localStorage.getItem('login-token'),
    // Authorization: `Token ${token}`,
    "Content-Type": "application/json",
  },
})

// camelCase로 함수 선언, ()
//커스텀 페이지 음료 상세정보 조회
async function cafeDrinkData(franchiseId, drinkName, success, fail) {
  const res = await api
    .get(`/cafe/drink-record`, {
      params: {
        franchiseId: franchiseId,
        drinkName: drinkName,
      },
    })
    .then(success)
    .catch(fail)
  return res
}

// 선택 카페 음료 목록 조회
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

// 전체카페목록(이름만) 조회
async function getAllCafeList(success, fail) {
  const res = await api.get(`/cafe`).then(success).catch(fail)
  return res
}

async function searchDrinkMenu(franchiseId, keyword, success, fail) {
  const res = await api
    .get(`/cafe/list-record`, {
      params: { franchiseId: franchiseId, keyword: keyword },
    })
    .then(success)
    .catch(fail)
  return res
}

// 기록 추가
async function newDrinkRecord(orderDetail, success, fail) {
  const res = await api.post(`/record`, orderDetail).then(success).catch(fail)
  return res
}

export {
  cafeDrinkData,
  cafeDrinkList,
  getAllCafeList,
  searchDrinkMenu,
  newDrinkRecord,
}
