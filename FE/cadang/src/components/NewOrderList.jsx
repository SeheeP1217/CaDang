import React, { useEffect, useRef, useState, useMemo } from "react";
import PropTypes from "prop-types";
import NewOrderListItem from "./NewOrderListItem.jsx";
import SockJsClient from "react-stomp";
import { newOrderCheck } from "../api/cafeCeo";

export default function NewOrderList() {
  const $websocket = useRef();
  const [msg, setMsg] = useState("");
  const [drinks, setDrinks] = useState([]);

  console.log("NewOrderList !!!!!!!!!!!!! " + drinks);
  // if (!Array.isArray(props)) {
  //   console.log(props + " !!!!!!!null??????");
  //   return null;
  // }

  const deleteChild = (idx) => {
    const newChild = drinks;
    const index = newChild.indexOf(drinks[idx]);
    if (index > -1) {
      newChild.splice(index, 1);
      setDrinks([...newChild]);
    }
  };

  // NewOrderListItem의 수락 / 거절
  const onRemove = (targetId) => {
    const newOrderList = drinks.filter((item) => item.id !== targetId);
    // setDrinks((newOrderList) => {return(newOrderList)});
    setDrinks(newOrderList);
  };

  const getOrder = async () => {
    await newOrderCheck(
      (res) => {
        console.log(res.data);
        return res.data;
      },
      (err) => console.log(err)
    ).then((data) => setDrinks(data));

    // then((data) => setDrink(drink.concat(data)));
  };

  useMemo(() => {
    getOrder();
  }, []);

  useEffect(() => {}, []);

  useEffect(() => {
    console.log(msg);
    // setDrink((drink) => {
    //   console.log("새로 들어오기 이전 데이터 :", drink);
    //   return [data, ...drink];
    // })
    // if (msg === "주문이 들어왔습니다.")

    const getOrder2 = async () => {
      await newOrderCheck(
        (res) => {
          console.log(res.data);
          return res.data;
        },
        (err) => console.log(err)
      ).then((data) => setDrinks(data));

      // then((data) => setDrink(drink.concat(data)));
    };
    getOrder2();
    setMsg("");
    console.log(drinks + "=====");
  }, [msg]);

  if (drinks.length === 0) {
    return <h2>신규 주문이 없습니다.</h2>;
  }

  return (
    <div>
      <SockJsClient
        url="http://i8a808.p.ssafy.io:8080/websocket"
        headers={{
          Authorization:
            "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdGFyYnVja3MiLCJpZCI6MSwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY3NjMzNjcwMH0.vwZeywsGVXtdv1_SVTv0gGnytWlSs1v4hOJsUITZixgkuq55W7WaLy2VzOuRKODkM4X_NphAfIbxGDVml4bYCA",
        }}
        topics={["/topic/store-order-manage/1", ""]}
        onMessage={(msg) => {
          // console.log(msg);
          setMsg(msg);
        }}
        ref={$websocket}
      />
      {/* drinks.length !== 0 && */}
      {drinks.map((item, key) => (
        <NewOrderListItem drink={item} onRemove={onRemove} id={key} deleteChild={deleteChild} />
      ))}
    </div>
  );
}
