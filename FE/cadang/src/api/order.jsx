import axios from "axios";

const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: "http://i8a808.p.ssafy.io:8080",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhYmFiMTIzNCIsImlkIjo2OSwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY3NjA5ODMwOH0.sW7OaiNg0mOT0euRy1po_cguzTrPTJpqWcg2piKOIh9DKcEC1Ds_r4UAnDD8v1pLxHLl-KTOpij8ejwKdsPPag",

    // Authorization: `Token ${token}`,
    "Content-Type": "application/json",
  },
});

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
    .catch(fail);
  return res;
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
    .catch(fail);
  return res;
}

async function getCafeList(success, fail) {
  const res = await api.get(`/cafe`).then(success).catch(fail);
  return res;
}

export { cafeDrinkData, cafeDrinkList, getCafeList };
