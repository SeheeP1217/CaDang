import { atom, selector } from "recoil";

// 현재 날짜 세팅
const date = new Date();
const year = date.getFullYear();
const month = ("0" + (date.getMonth() + 1)).slice(-2);
const day = ("0" + date.getDate()).slice(-2);

// 현재 날짜 string으로 변환
const dateString = year + "-" + month + "-" + day;

const userId = atom({
  key: "userId",
  default: "somin",
});

const todayDate = atom({
  key: "todayDate",
  default: dateString,
});

const location = atom({
  key: "location",
  default: "",
});

export { userId, todayDate, location };
