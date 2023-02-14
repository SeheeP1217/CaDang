import axios from "axios"

const token = localStorage.getItem("token")

const api = axios.create({
  baseURL: "http://i8a808.p.ssafy.io:8080",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwYXJrNjkzOCIsImlkIjo4LCJhdXRoIjoiUk9MRV9VU0VSIiwiZXhwIjoxNjc2NDIxODU0fQ.A5F0TESgslXBROgdtgaoz8QTjkN4L8mopVeU4MZiXy3Fa2JyataG5VUZ1F2SVeikvH0UiXTkLIppRGDL8SbHBg",
    "Content-Type": "application/json",
  },
})

async function checkCafeList(date, storeName, success, fail) {
  const res = await api
    .get(`/cafe/drinklist`, {
      params: {
        date: date,
        storeName: storeName,
      },
    })
    .then(success)
    .catch(fail)
  return res
}

export { checkCafeList }
