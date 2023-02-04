import MenuListItem from "../components/util/MenuListItem";
import ItemFiltering from "../components/util/ItemFiltering";

function TestPage() {
  return (
    <div>
      <ItemFiltering data={menuData}/>
    </div>
      
  )
}

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