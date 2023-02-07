import axios from "axios";

const api = axios.create({
  baseURL: "http://i8a808.p.ssafy.io:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// camelCase로 함수 선언, ()
async function recommendDrinks(storeNames, date, userId, success, fail) {
  const res = await api
    .post(`/cafe/recommend`, { storeNames: storeNames, date: date, userId: userId })
    .then(success)
    .catch(fail);
  return res;
}

export { recommendDrinks };
