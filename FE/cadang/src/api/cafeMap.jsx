import axios from "axios";

const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: "http://i8a808.p.ssafy.io:8080",
  headers: {
    Authorization:
    "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlc29tNzM1IiwiaWQiOjQsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2NzY0MjAxNDJ9.-Z-H463JA7bRSHzvx4M80g347_O2taXdMZunObua9l2oirU-k7rWPjXX2Ydnjnp6aOwhRfdvBwqcpcy25ViLxw",
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
