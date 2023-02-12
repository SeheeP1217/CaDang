import axios from "axios";

const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: "http://i8a808.p.ssafy.io:8080",
  headers: {
    Authorization:
    "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzanNqbGltIiwiaWQiOjIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2NzYzMDMxOTl9.PCpbGPZRFE1aBrDxTl2UDlUnV_rxrLssryWr4GUCgY21CfgQTXp4TTkJ5KXxwPPF_gqcmHwkYP6xjarWHnmj0w",
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
