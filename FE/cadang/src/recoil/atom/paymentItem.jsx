import { atom, selector } from "recoil";

// 결제 성공했을 경우, 신규 주문 등록을 위한
// 주문 등록 아이템 정보

// const item = {
//   drinkId: 0,
//   caffeine: 0,
//   sugar: 0,
//   cal: 0,
//   price: 0,
//   shot: 0,
//   whip: false,
//   sugarContent: "BASIC",
//   syrup: 0,
//   vanilla: 0,
//   hazelnut: 0,
//   caramel: 0,
//   photo: "",
//   storeName: "",
//   storeId: 0,
// };

const orderItem = atom({
  key: "orderItem",
  default: {
    drinkId: 0,
    caffeine: 0,
    sugar: 0,
    cal: 0,
    price: 0,
    shot: 0,
    whip: false,
    sugarContent: "BASIC",
    syrup: 0,
    vanilla: 0,
    hazelnut: 0,
    caramel: 0,
    photo: "",
    storeName: "",
    storeId: 0,
  },
});

// const orderItem = atom({
//   key: "orderItem",
//   default: item,
// });

export { orderItem };
