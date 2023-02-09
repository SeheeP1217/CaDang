import axios from "axios";

const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: "http://i8a808.p.ssafy.io:8080",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhYmFiMTIzNCIsImlkIjoxOSwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY3NTk5MDMxNn0.ZuHeaPY1IkSdQnDzbDu440xeMMU6OHr61KUHDj1aJyYAOOSnonG_udXtFDgvWGdbjOV2WCTSHq2elpimFqnurQ",
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
