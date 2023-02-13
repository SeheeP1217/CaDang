import { atom, selector } from "recoil";

// 결제 성공했을 경우, 신규 주문 등록을 위한
// 주문 등록 아이템 정보

const item = {
  drinkId: 1180,
  caffeine: 225,
  sugar: 0,
  cal: 0,
  price: 5000,
  shot: 3,
  whip: false,
  sugarContent: "BASIC",
  syrup: 0,
  vanilla: 0,
  hazelnut: 0,
  caramel: 0,
  photo:
    "https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[110563]_20210426095937808.jpg",
  storeName: "스타벅스 역삼대로",
  storeId: 1,
};

const orderItem = atom({
  key: "orderItem",
  default: item,
});

export { orderItem };
