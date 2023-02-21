// import * as React from "react";
import React, { useState, useEffect } from "react";
import CategorySearch from "../../components/CategorySearch";
// import { MapMarker, Map } from "react-kakao-maps-sdk";

export default function CafeMapPage() {
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(inputText);
    setInputText("");
  };

  const [state, setState] = useState({
    center: {
      lat: 37.503325874722,
      lng: 127.04403462366,
    },
    errMsg: null,
    isLoading: true,
  });

  useEffect(() => {
    // if (navigator.geolocation) {
    //   // GeoLocation을 이용해서 접속 위치를 얻어옵니다
    //   navigator.geolocation.getCurrentPosition(
    //     (position) => {
    //       setState((prev) => ({
    //         ...prev,
    //         center: {
    //           lat: position.coords.latitude, // 위도
    //           lng: position.coords.longitude, // 경도
    //         },
    //         isLoading: false,
    //       }))
    //     },
    //     (err) => {
    //       setState((prev) => ({
    //         ...prev,
    //         errMsg: err.message,
    //         isLoading: false,
    //       }))
    //     }
    //   )
    // } else {
    //   // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
    //   setState((prev) => ({
    //     ...prev,
    //     errMsg: "geolocation을 사용할수 없어요..",
    //     isLoading: false,
    //   }))
    // }
  }, [state]);

  return (
    <>
      {/* <form className="inputForm" onSubmit={handleSubmit}>
        <input
          placeholder="Search Place..."
          onChange={onChange}
          value={inputText}
        />
        <button type="submit">검색</button>
      </form> */}
      {/* <Map // 지도를 표시할 Container
        center={state.center}
        style={{
          // 지도의 크기
          width: "100%",
          height: "400px",
        }}
        level={3} // 지도의 확대 레벨
      >
        {!state.isLoading && (
          <MapMarker position={state.center}>
            <div style={{ padding: "5px", color: "#000" }}>
              {state.errMsg ? state.errMsg : "여기에 계신가요?!"}
            </div>
          </MapMarker>
        )}
      </Map> */}

      {/* <MapContainer searchPlace={place} /> */}
      <CategorySearch />
      {/* <MapSearchList/> */}
    </>
  );
}
