import React, { useEffect, useRef, useState, useMemo } from "react";
import PropTypes from "prop-types";
import NewOrderListItem from "./NewOrderListItem.jsx";
import SockJsClient from "react-stomp";
import { newOrderCheck } from "../api/cafeCeo";

export default function NewOrderList() {
  const $websocket = useRef();
  const [msg, setMsg] = useState("");
  const [data, setData] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [userId, setUserId] = useState(0);

  console.log("NewOrderList !!!!!!!!!!!!! " + drinks);
  // if (!Array.isArray(props)) {
  //   console.log(props + " !!!!!!!null??????");
  //   return null;
  // }

  const handleClickSendToMsg = () => {
    if (userId !== 0) {
      $websocket.current.sendMessage(
        "/message/order-response/" + userId + "",
        "주문이 수락 혹은 거절됐습니다."
      );
      console.log("send to server : 주문이 수락 혹은 거절됐습니다.");
    }
  };

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
    // 화면이 뜨자마자 신규 주문 조회 api를 호출해서
    // 신규 주문 리스트 받아와서 화면에 렌더링한다.
    getOrder();
  }, []);

  useEffect(() => {
    setDrinks(data);
  }, [data]);

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
      ).then((data) => setData(data));

      // then((data) => setDrink(drink.concat(data)));
    };
    getOrder2();
    setMsg("");
    console.log(drinks + "=====");
  }, [msg]);

  useEffect(() => {
    setDrinks(data);
  }, [data]);

  useEffect(() => {
    console.log("하위 컴포넌트에서 set한 userId : " + userId);

    // 웹소켓 통신하기 !!!!!!!!!
    setTimeout(() => handleClickSendToMsg(), 30);

    setTimeout(() => setUserId(0), 30);
  }, [userId]);

  // if (drinks.length === 0) {
  //   return <h2>신규 주문이 없습니다.</h2>;
  // }

  return (
    <div>
      {/* 웹소켓 연결 클라이언트 */}
      <div>
        <SockJsClient
          url="http://i8a808.p.ssafy.io:8080/websocket"
          headers={{
            Authorization:
              "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdGFyYnVja3MiLCJpZCI6MSwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY3NjUwNjcxOX0.PFVyJuhUcxKWPXop6YRC6nosELoZIAGDGaU2ctk75zseUstkYz6W-f08YzhAgGPdV9xbhbBqGKrmxZ0KVyYIOQ",
          }}
          topics={["/topic/store-order-manage/1", ""]}
          onMessage={(msg) => {
            console.log(msg);
            setMsg(msg);
          }}
          ref={$websocket}
        />
      </div>
      {/* drinks.length !== 0 && */}
      {drinks.length === 0 ? (
        <h2>신규 주문이 없습니다.</h2>
      ) : (
        drinks.map((item, key) => (
          <NewOrderListItem
            drink={item}
            onRemove={onRemove}
            id={key}
            deleteChild={deleteChild}
            setUserId={setUserId}
          />
        ))
      )}
      {/* {drinks.map((item, key) => (
        <NewOrderListItem drink={item} onRemove={onRemove} id={key} deleteChild={deleteChild} />
      ))} */}
    </div>
  );
}
