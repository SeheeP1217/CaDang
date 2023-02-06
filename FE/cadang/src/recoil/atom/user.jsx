import { atom, selector } from "recoil";

const userId = atom({
  key: "userId",
  default: "somin",
});

const todayDate = atom({
  key: "todayDate",
  default: "",
});

export { userId, todayDate };
