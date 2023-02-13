import axios from "axios";

const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: "http://i8a808.p.ssafy.io:8080",
  headers: {
    Authorization:
    "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhYmFiMTIzNCIsImlkIjo2OSwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY3NjIxODE0NX0.s_6_v2kF_hQ4fc7CwscGr47Koq3kzgcCIROUXMiOmJvvdq4x7Cudns_smA6wgf1TgFxy4S76CxxEyuBwwepixg",
    "Content-Type": "application/json",
  },
});

async function order(item, success, fail) {
  const res = await api.post(`/order`, item).then(success).catch(fail);
  return res;
}

export { order };
