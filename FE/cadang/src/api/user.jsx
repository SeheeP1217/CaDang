import axios from "axios";



const api = axios.create({
  baseURL: "http://i8a808.p.ssafy.io:8080",
  headers: {
    Authorization:
    "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzanNqbGltIiwiaWQiOjIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2NzY0MjM4MjZ9.7OA_nrQzOYLSqqBunIr81qr9BaynoLuG5qyHPxRFMIDa5ZCUmnsKIdBBhok9xdTSL0Pq4CeDB9Dl5FGu4wTVbw",
    "Content-Type": "application/json",
  },
});

async function findPwd(email, memberId, success, fail) {
  const res = await api
    .post(`/user/email/findpw`, {
      email: email,
      memberId: memberId,
    })
    .then(success)
    .catch(fail);
  return res;
}

// 목표량 변경
async function setUserGoal(caffeGoal, sugarGoal, success, fail) {
  const res = await api
    .put(`/user2/goalSet`, {
      caffeGoal: caffeGoal,
      sugarGoal: sugarGoal,
    })
    .then(success)
    .catch(fail);
  return res;
}

export { findPwd, setUserGoal } ;