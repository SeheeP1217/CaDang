import axios from "axios";

const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: "http://i8a808.p.ssafy.io:8080",
  headers: {
    Authorization:
    "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzanNqbGltIiwiaWQiOjIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2NzYzMzI5MTZ9.EmP0DkZs6vpdCNfOocU_eCCHZTpK5mjDYKJn-XXAbr4-pa0o86jgRWN4apbk5-DecBmH0Ye2XhhjT5anSDoslw",
    "Content-Type": "application/json",
  },
});

async function checkCafeList(date, storeName, success, fail) {
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

export { checkCafeList };
