import DrinkRecommendation from "../components/DrinkRecommendation";

function TestPage() {
  return (
    <div>
      <DrinkRecommendation />
    </div>
      
  )
}

const dailyData = [
  {
    calorie: 4000,
    money: 2400,
  }
]

const data = [
  {
    name: "카페인",
    consumption: 2400,
    change: 4000,
  },
  {
    name: "당",
    consumption: 1398,
    change: 3000,
  },
];

export default TestPage;


const menuData = [
  { pk: 1, name: "카페라떼", caffeine: 300, sugar: 10, cal: 200, price: 3000 },
  {
    pk: 2,
    name: "바닐라 라떼",
    caffeine: 200,
    sugar: 20,
    cal: 300,
    price: 5000,
  },
  {
    pk: 3,
    name: "아이스 아메리카노",
    caffeine: 100,
    sugar: 30,
    cal: 100,
    price: 4500,
  },
];