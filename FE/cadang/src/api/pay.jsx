import axios from "axios";

const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: "http://i8a808.p.ssafy.io:8080",
  headers: {
    Authorization:
    "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlc29tNzM1IiwiaWQiOjQsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2NzYzNTg2MDd9.T6ZVkwybF6AjR3HoicQqZTMrwwEfKDWNFlGSI2w_bv09hxOE0RWRvJdgcNMNJDprzp_62BWJ4_aePWYRisvq1g",
    "Content-Type": "application/json",
  },
});

async function order(item, success, fail) {
  const res = await api.post(`/order`, item).then(success).catch(fail);
  return res;
}

export { order };
