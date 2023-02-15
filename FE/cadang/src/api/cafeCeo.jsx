import axios from "axios";

const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: "http://i8a808.p.ssafy.io:8080",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdGFyYnVja3MiLCJpZCI6MSwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY3NjUwNjcxOX0.PFVyJuhUcxKWPXop6YRC6nosELoZIAGDGaU2ctk75zseUstkYz6W-f08YzhAgGPdV9xbhbBqGKrmxZ0KVyYIOQ",
    "Content-Type": "application/json",
  },
});

// 카페 신규 주문 확인 api
async function newOrderCheck(success, fail) {
  const res = await api.get(`/order/store-new`).then(success).catch(fail);
  return res;
}

// 신규 주문에 대한 수락 or 거절 요청 api
// 주문 상태가 제조 완료(COMPLETE) 혹은 픽업 완료(PICKUP) 상태로 변경됐을 경우 PUT 요청
async function setOrderStatus(orderId, orderStatus, success, fail) {
  const res = await api
    .put(`/order`, {
      orderId: orderId,
      orderStatus: orderStatus,
    })
    .then(success)
    .catch(fail);
  return res;
}

// 수락한 주문에 대한 리스트 내역 api
async function orderList(success, fail) {
  const res = await api.get(`/order/store-list`).then(success).catch(fail);
  return res;
}

// 주문 상태가 제조 완료(COMPLETE) 혹은 픽업 완료(PICKUP) 상태로 변경됐을 경우 PUT 요청
// async function setOrderStatus(orderId, orderStatus, success, fail) {
//   const res = await api
//   .put(`/order`)
// }

export { newOrderCheck, setOrderStatus, orderList };
