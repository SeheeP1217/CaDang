import axios from "axios";

const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: "http://i8a808.p.ssafy.io:8080",
  headers: {
    Authorization:
    "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdGFyYnVja3MiLCJpZCI6MSwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY3NjMzNjcwMH0.vwZeywsGVXtdv1_SVTv0gGnytWlSs1v4hOJsUITZixgkuq55W7WaLy2VzOuRKODkM4X_NphAfIbxGDVml4bYCA",
    "Content-Type": "application/json",
  },
});

// 카페 신규 주문 확인 api
async function newOrderCheck(success, fail) {
  const res = await api.get(`/order/store-new`).then(success).catch(fail);
  return res;
}

// 신규 주문에 대한 수락 or 거절 요청 api
async function newOrderResponse(orderId,customerId,orderStatus,success,fail) {
  const res = await api.put(`/order`, 
    {
      orderId: orderId,
      customerId: customerId,
      orderStatus: orderStatus,
    })
    .then(success)
    .catch(fail);
    return res;
}

// 수락한 주문에 대한 리스트 내역 api
async function orderList(success,fail) {
  const res = await api.get(`/order/store-list`)
  .then(success)
  .catch(fail);
  return res;
}

export { newOrderCheck, newOrderResponse, orderList };
