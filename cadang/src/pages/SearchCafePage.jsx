// import * as React from "react";
import React, { useRef, useEffect } from "react";

const { kakao } = window;

export default function SearchCafePage() {
  
  useEffect(() => {
    let markers = [];
    const container = document.getElementById("map"); // 지도를 표시할 div

    const options = {
        center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
        level: 9, // 지도의 확대 레벨
    };

    const map = new window.kakao.maps.Map(container, options);

    // 장소 카테고리
    const ps = new window.kakao.maps.services.Place(map);

    ps.categorySearch('CE7', placeSearchCB, {useMapBounds:true});

    const markerPosition  = new kakao.maps.LatLng(37.365264512305174, 127.10676860117488);
    const marker = new kakao.maps.Marker({
        position: markerPosition
    });
    marker.setMap(map);

    // 버튼 클릭에 따라 지도 이동 기능을 막거나 풀고 싶은 경우에는 map.setDraggable 함수를 사용
    function setDraggable(draggable) {
        // 마우스 드래그로 지도 이동 가능여부를 설정
        map.setDraggable(draggable);
    }

    console.log("loading kakaomap");
}, []);

  return (
    <div
      id="map"
      className="map"
      style={{ width: "500px", height: "500px" }}
    ></div>
  );
}