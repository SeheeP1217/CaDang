import axios from "axios"

const api = axios.create({
  baseURL: "http://i8a808.p.ssafy.io:8080",
  headers: {
    Authorization: localStorage.getItem("login-token"),
    "Content-Type": "application/json",
  },
})

async function findPwd(email, memberId, success, fail) {
  const res = await api
    .post(`/user/email/findpw`, {
      email: email,
      memberId: memberId,
    })
    .then(success)
    .catch(fail)
  return res
}

// 목표량 변경
async function setUserGoal(caffeGoal, sugarGoal, success, fail) {
  const res = await api
    .put(`/user2/goalSet`, {
      caffeGoal: caffeGoal,
      sugarGoal: sugarGoal,
    })
    .then(success)
    .catch(fail)
  return res
}

// 유저 프로필 가져오기
async function getUserProfile(success, fail) {
  const res = await api.get(`/user2/myinfo`).then(success).catch(fail)
  return res
}

// async function setNewInfo(data, changedProfile, success, fail) {
//   const res = await api
//     .put(`/user2/modify`, data, )
//     .then(success)
//     .catch(fail);
//   return res;
// }

export { findPwd, setUserGoal, getUserProfile }
