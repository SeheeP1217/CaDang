import React, { useEffect, useState } from "react";
import "./CategorySearch.css";

const { kakao } = window;

export default function MapSearchList() {

  const [list, setList] = useState([]);

  // 마커를 클릭했을 때 해당 장소의 상세정보를 보여줄 커스텀오버레이입니다
  let placeOverlay = new kakao.maps.CustomOverlay({ zIndex: 1 }),
  contentNode = document.createElement("div"), // 커스텀 오버레이의 컨텐츠 엘리먼트 입니다
  markers = [], // 마커를 담을 배열입니다
  currCategory = "CE7"; // 현재 선택된 카테고리를 가지고 있을 변수입니다

  let mapContainer = document.getElementById("map"), // 지도를 표시할 div
  mapOption = {
    center: new kakao.maps.LatLng(37.50153289264357, 127.03983097807087), // 지도의 중심좌표
    level: 4, // 지도의 확대 레벨
  };

  // 지도를 생성합니다
  let map = new kakao.maps.Map(mapContainer, mapOption);

  // 장소 검색 객체를 생성합니다
  let ps = new kakao.maps.services.Places();

  // 지도 중심좌표를 얻어옵니다
  let latlng = map.getCenter();

  // 엘리먼트에 이벤트 핸들러를 등록하는 함수입니다
  function addEventHandle(target, type, callback) {
    if (target.addEventListener) {
      target.addEventListener(type, callback);
    } else {
      target.attachEvent("on" + type, callback);
    }
  }

    // 카테고리 검색을 요청하는 함수입니다
    function searchPlaces() {
      // if (!currCategory) {
      //   return;
      // }

      // 커스텀 오버레이를 숨깁니다
      placeOverlay.setMap(null);

      // 지도 중심좌표를 얻어옵니다
      latlng = map.getCenter();

      let message = "변경된 지도 중심좌표는 " + latlng.getLat() + " 이고, ";
      message += "경도는 " + latlng.getLng() + " 입니다";

      let resultDiv = document.getElementById("result");
      resultDiv.innerHTML = message;

      // 지도에 표시되고 있는 마커를 제거합니다
      removeMarker();

      for (let i = 1; i <= 3; i++) {
        ps.categorySearch("CE7", placesSearchCB, {
          // location: new kakao.maps.LatLng(37.5018952591279, 127.039347134781),
          x: latlng.getLng(),
          y: latlng.getLat(),
          useMapBounds: true,
          radius: 300, // 전방 300m
          page: i,
        });
      }
    }

    // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        // 정상적으로 검색이 완료됐으면 지도에 마커를 표출합니다
        console.log(data);
        // setList({...list, data});
        // getData(data);
        displayPlaces(data);
        // setList(list.concat(data));
        // if (list.length == 0) {
        //   setList(data);
        //   console.log(list.length);
        // } else if (list2.length == 0) {
        //   console.log();
        //   setList2(data);
        //   console.log(list2.length);
        // } else if (list3.length == 0) {
        //   setList3(data);
        //   console.log(list3.length);
        // }
        for (let i = 0; i < data.length; i++) {
          // displayMarker(data[i]);
          // displayPlaces(data[i]);
        }
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        // 검색결과가 없는경우 해야할 처리가 있다면 이곳에 작성해 주세요
      } else if (status === kakao.maps.services.Status.ERROR) {
        // 에러로 인해 검색결과가 나오지 않은 경우 해야할 처리가 있다면 이곳에 작성해 주세요
      }
    }

    // 지도에 마커를 표출하는 함수입니다
    function displayPlaces(places) {
      // 몇번째 카테고리가 선택되어 있는지 얻어옵니다
      // 이 순서는 스프라이트 이미지에서의 위치를 계산하는데 사용됩니다
      let order = document.getElementById(currCategory).getAttribute("data-order");
      // console.log("================");
      // console.log(places);
      // console.log("================");
      // setPlus(places);
      setList(places);

      // setList(list.concat(places));
      // setList([ ...list, places ]);

      // setList((data) => [...data, places]);
      console.log(list);

      for (let i = 0; i < places.length; i++) {
        // 마커를 생성하고 지도에 표시합니다
        let marker = addMarker(new kakao.maps.LatLng(places[i].y, places[i].x), order);

        // 마커와 검색결과 항목을 클릭 했을 때
        // 장소정보를 표출하도록 클릭 이벤트를 등록합니다
        (function (marker, place) {
          kakao.maps.event.addListener(marker, "click", function () {
            displayPlaceInfo(place);
          });
        })(marker, places[i]);
      }
    }

    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });
      let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

      for (let i = 0; i < place.length; i++) {
        // var marker = addMarker(new kakao.maps.LatLng(place[i].y, place[i].x));

        // 마커와 검색결과 항목을 클릭 했을 때
        // 장소정보를 표출하도록 클릭 이벤트를 등록합니다
        (function (marker, place) {
          kakao.maps.event.addListener(marker, "click", function () {
            // displayPlaceInfo(place);
            // 마커를 클릭하면 장소명이 인포윈도우에 표출
            infowindow.setContent(
              '<div style="padding:5px;font-size:12px;">' + place.place_name + "</div>"
            );
            infowindow.open(map, marker);
          });
        })(marker, place[i]);
      }

      //마커에 클릭이벤트를 등록
      kakao.maps.event.addListener(marker, "click", function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' + place.place_name + "</div>"
        );
        infowindow.open(map, marker);
      });
    }

    // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
    function addMarker(position, order) {
      let imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(27, 28), // 마커 이미지의 크기
        imgOptions = {
          spriteSize: new kakao.maps.Size(72, 208), // 스프라이트 이미지의 크기
          spriteOrigin: new kakao.maps.Point(46, order * 36), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
          offset: new kakao.maps.Point(11, 28), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
        marker = new kakao.maps.Marker({
          position: position, // 마커의 위치
          image: markerImage,
        });

      marker.setMap(map); // 지도 위에 마커를 표출합니다
      markers.push(marker); // 배열에 생성된 마커를 추가합니다

      return marker;
    }

    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    function removeMarker() {
      for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
    }

    // 클릭한 마커에 대한 장소 상세정보를 커스텀 오버레이로 표시하는 함수입니다
    function displayPlaceInfo(place) {
      let content =
        '<div class="placeinfo">' +
        '   <a class="title" href="' +
        place.place_url +
        '" target="_blank" title="' +
        place.place_name +
        '">' +
        place.place_name +
        "</a>";

      if (place.road_address_name) {
        content +=
          '    <span title="' +
          place.road_address_name +
          '">' +
          place.road_address_name +
          "</span>" +
          '  <span class="jibun" title="' +
          place.address_name +
          '">(지번 : ' +
          place.address_name +
          ")</span>";
      } else {
        content += '    <span title="' + place.address_name + '">' + place.address_name + "</span>";
      }

      content +=
        '    <span class="tel">' + place.phone + "</span>" + "</div>" + '<div class="after"></div>';

      contentNode.innerHTML = content;
      placeOverlay.setPosition(new kakao.maps.LatLng(place.y, place.x));
      placeOverlay.setMap(map);
    }

    // 각 카테고리에 클릭 이벤트를 등록합니다
    function addCategoryClickEvent() {
      let category = document.getElementById("category"),
        children = category.children;

      for (let i = 0; i < children.length; i++) {
        children[i].onclick = onClickCategory;
      }
    }

    // 카테고리를 클릭했을 때 호출되는 함수입니다
    function onClickCategory() {
      let id = this.id,
        className = this.className;

      placeOverlay.setMap(null);

      if (className === "on") {
        currCategory = "";
        // changeCategoryClass();
        removeMarker();
      } else {
        currCategory = "CE7";
        // changeCategoryClass(this);
        searchPlaces();
      }
    }

  useEffect(() => {

    // 지도를 생성합니다
  let map = new kakao.maps.Map(mapContainer, mapOption);

    searchPlaces();

    // 지도에 idle 이벤트를 등록합니다
    kakao.maps.event.addListener(map, "idle", searchPlaces);

    // 커스텀 오버레이의 컨텐츠 노드에 css class를 추가합니다
    contentNode.className = "placeinfo_wrap";

    // 커스텀 오버레이의 컨텐츠 노드에 mousedown, touchstart 이벤트가 발생했을때
    // 지도 객체에 이벤트가 전달되지 않도록 이벤트 핸들러로 kakao.maps.event.preventMap 메소드를 등록합니다
    addEventHandle(contentNode, "mousedown", kakao.maps.event.preventMap);
    addEventHandle(contentNode, "touchstart", kakao.maps.event.preventMap);

    // 커스텀 오버레이 컨텐츠를 설정합니다
    placeOverlay.setContent(contentNode);

    // 각 카테고리에 클릭 이벤트를 등록합니다
    addCategoryClickEvent();


  },[list]);

  return (
    <>
      <div className="container">
        <div
          className="map"
          id="map"
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            background: "beige",
          }}
        />
        <div id="category">
          <li id="CE7" data-order="4">
            <button className="category_bg cafe">카페</button>
          </li>
        </div>
        <p id="result"></p>
        <div className="list">
          {/* <div>
            {list.length !== 0
              ? list.map((element, i) => <div key={i}>{element.address_name}</div>)
              : null}
          </div> */}
          {/* <div>
            {list &&
              list.items.map((item) => {
                return <p>{item.address_name}</p>;
              })}
          </div> */}
          <div>
            {list.length !== 0
              ? list.map((element, i) => <div key={i}>{element.place_name}</div>)
              : null}
          </div>
        </div>
      </div>
    </>
  )
}