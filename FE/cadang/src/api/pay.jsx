import axios from "axios";

const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: "http://i8a808.p.ssafy.io:8080",
  headers: {
    // Authorization: localStorage.getItem("login-token"),
    Authorization:
      "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlc29tNzM1IiwiaWQiOjQsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2NzY1MDcyMDd9.ZXV0ZODZvQiB1p8a2LJ4DOVMNvBfJJXUi_36ZlcfMcZx90KRdUv3523WaQu24sXdTk2Xc3cz86ekL_Ox32SY8w",
    "Content-Type": "application/json",
  },
});

async function order(item, success, fail) {
  const res = await api.post(`/order`, item).then(success).catch(fail);
  return res;
}

export { order };
