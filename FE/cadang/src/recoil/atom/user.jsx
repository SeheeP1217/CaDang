import { atom, selector } from "recoil";

const userId = atom({
  key: "userId",
  default: "somin",
});

const todayDate = atom({
  key: "todayDate",
  default: "",
});

const location = atom({
  key: "location",
  default: ""
});

export { userId, todayDate, location };
