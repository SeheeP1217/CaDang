import axios from "axios"

const token = localStorage.getItem("token")

const api = axios.create({
  baseURL: "http://i8a808.p.ssafy.io:8080",
  headers: {
    Authorization:localStorage.getItem('login-token'),
    "Content-Type": "application/json",
  },
})

async function order(item, success, fail) {
  const res = await api.post(`/order`, item).then(success).catch(fail)
  return res
}

export { order }
