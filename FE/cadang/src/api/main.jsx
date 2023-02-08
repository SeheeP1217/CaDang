import axios from "axios";

const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: "http://i8a808.p.ssafy.io:8080",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhYmFiMTIzNCIsImlkIjoxOSwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY3NTg0NTUyOH0.XWZ70Gf5gAjVZahqh4FnLzhVnXBUFrpI3FDAG6gNRChyk3v4Oshkw_jtwJWi-bDSooMvavz7YFl3wiJEvwlG5w",
    "Content-Type": "application/json",
  },
});

// camelCase로 함수 선언, ()
async function recommendDrinks(storeNames, date, userId, success, fail) {
  const res = await api
    .post(`/cafe/recommend`, {
      storeNames: storeNames,
      date: date,
      userId: userId,
    })
    .then(success)
    .catch(fail);
  return res;
}

async function todayDashboard(date, userId, success, fail) {
  const res = await api
    .get(`/data/day`, {
      params: {
        userId: userId,
        date: date,
      },
    })
    .then(success)
    .catch(fail);
  return res;
}

export { recommendDrinks, todayDashboard };
