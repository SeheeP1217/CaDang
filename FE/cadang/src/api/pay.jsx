import axios from "axios";

const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: "http://i8a808.p.ssafy.io:8080",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlc29tNzM1IiwiaWQiOjQsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2NzYzNzUzNDB9.Xa63ksGqP4oS6z6T2P32n9vL879GzZGDVPUhixGj3iI4yBKrqrzUbEIBi0lWw-AZ5lsfiC6mD_zC9PUT1YkBow",
    "Content-Type": "application/json",
  },
});

async function order(item, success, fail) {
  const res = await api.post(`/order`, item).then(success).catch(fail);
  return res;
}

export { order };
