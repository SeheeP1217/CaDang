import axios from "axios";

const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhYmFiMTIzNCIsImlkIjo2OSwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY3NjIxODE0NX0.s_6_v2kF_hQ4fc7CwscGr47Koq3kzgcCIROUXMiOmJvvdq4x7Cudns_smA6wgf1TgFxy4S76CxxEyuBwwepixg",
    "Content-Type": "application/json",
  },
});

// 카페 신규 주문 확인 api
async function newOrderCheck(success, fail) {
  const res = await api.get(`/order/store-new`).then(success).catch(fail);
  return res;
}

export { newOrderCheck };
