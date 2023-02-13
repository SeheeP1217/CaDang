import axios from "axios";



const api = axios.create({
  baseURL: "http://i8a808.p.ssafy.io:8080",
  headers: {
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


export { findPwd } ;