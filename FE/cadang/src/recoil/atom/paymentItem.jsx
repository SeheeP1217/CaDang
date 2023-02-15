import { atom, selector } from "recoil";

// 결제 성공했을 경우, 신규 주문 등록을 위한
// 주문 등록 아이템 정보

const item = {
  drinkId: 1291,
  caffeine: 250,
  sugar: 0,
  cal: 5,
  price: 0,
  shot: 0,
  whip: false,
  sugarContent: "BASIC",
  syrup: 0,
  vanilla: 0,
  hazelnut: 0,
  caramel: 0,
  photo:
    "https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000000038]_20210430113202458.jpg",
  storeName: "스타벅스 역삼대로",
  storeId: 1,
};

const orderItem = atom({
  key: "orderItem",
  default: item,
});

export { orderItem };
