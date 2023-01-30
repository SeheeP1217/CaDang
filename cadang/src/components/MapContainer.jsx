import React, { useState,useEffect } from 'react';
import { MapMarker, Map } from "react-kakao-maps-sdk";
import './MapContainer.css'

const { kakao } = window;

const MapContainer = ({searchPlace}) => {

  const [location, setLocation] = useState({});
  const [info, setInfo] = useState()
  const [markers, setMarkers] = useState([])
  const [map, setMap] = useState()

    useEffect(() => {

      if (!map) return
      const ps = new kakao.maps.services.Places()
  
      ps.keywordSearch('역삼역 카페', (data, status, _pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가합니다
          const bounds = new kakao.maps.LatLngBounds()
          let markers = []
  
          for (var i = 0; i < data.length; i++) {
            // @ts-ignore
            markers.push({
              position: {
                lat: data[i].y,
                lng: data[i].x,
              },
              content: data[i].place_name,
            })
            // @ts-ignore
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
          }
          setMarkers(markers)
  
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
          map.setBounds(bounds)
        }
      })
    }, [map])


       // Get the user's current location
    navigator.geolocation.getCurrentPosition(position => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    });

    // // 마커를 클릭했을 때 해당 장소의 상세정보를 보여줄 커스텀오버레이입니다
    // const placeOverlay = new kakao.maps.CustomOverlay({zIndex:1}), 
    //       contentNode = document.createElement('div'), // 커스텀 오버레이의 컨텐츠 엘리먼트 입니다 
    //       markers = []; // 마커를 담을 배열입니다

    //   const container = document.getElementById('myMap');
    //   const options = {
    //     center: new kakao.maps.LatLng(location.lat, location.lng),
    //     level: 3
    //   };
    //   const map = new kakao.maps.Map(container, options);
    //   // map.setCenter(new kakao.maps.LatLng37(503325874722, 127.04403462366));
    //   // 장소 검색 객체를 생성합니다
    //   const ps = new kakao.maps.services.Places();

    //   // ps.keywordSearch(searchPlace, placesSearchCB); 
    //   // 카테고리로 카페를 검색합니다
    //   ps.categorySearch('CE7', placesSearchCB, {useMapBounds:true}); 

    //   function placesSearchCB (data, status, pagination) {
    //       if (status === kakao.maps.services.Status.OK) {

    //         displayMarker(data);
              
    //           // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
    //           // LatLngBounds 객체에 좌표를 추가합니다
    //           let bounds = new kakao.maps.LatLngBounds();

    //           for (let i=0; i<data.length; i++) {
    //             displayMarker(data[i]);    
    //             bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
    //           }       

    //           map.setBounds(bounds);
    //       } 
    //   }

    //   // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    //   function removeMarker() {
    //     for ( var i = 0; i < markers.length; i++ ) {
    //       markers[i].setMap(null);
    //     }   
    //     markers = [];
    //   }

    //   function displayMarker(place) {
    //       // let marker = new kakao.maps.Marker({
    //       //   map: map,
    //       //   position: new kakao.maps.LatLng(place.y, place.x) 
    //       // });
    //       let infowindow = new kakao.maps.InfoWindow({zIndex:1});

    //       for(let i=0;i<place.length;i++) {
    //         var marker = addMarker(new kakao.maps.LatLng(place[i].y, place[i].x));

    //         // 마커와 검색결과 항목을 클릭 했을 때
    //         // 장소정보를 표출하도록 클릭 이벤트를 등록합니다
    //         (function(marker, place) {
    //           kakao.maps.event.addListener(marker, 'click', function() {
    //             // displayPlaceInfo(place);
    //             // 마커를 클릭하면 장소명이 인포윈도우에 표출
    //             infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
    //             infowindow.open(map, marker);
    //           });
    //       })(marker, place[i]);
    //       }

          // 마커에 클릭이벤트를 등록
        //   kakao.maps.event.addListener(marker, 'click', function() {
        //   // 마커를 클릭하면 장소명이 인포윈도우에 표출
        //   infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
        //   infowindow.open(map, marker);
        // });
      // }

      // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
      // function addMarker(position) {
      //   var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
      //       imageSize = new kakao.maps.Size(27, 28),  // 마커 이미지의 크기
      //       imgOptions =  {
      //           spriteSize : new kakao.maps.Size(72, 208), // 스프라이트 이미지의 크기
      //           offset: new kakao.maps.Point(11, 28) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
      //       },
      //       markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
      //           marker = new kakao.maps.Marker({
      //           position: position, // 마커의 위치
      //           image: markerImage 
      //       });

      //   marker.setMap(map); // 지도 위에 마커를 표출합니다
      //   markers.push(marker);  // 배열에 생성된 마커를 추가합니다

      //   return marker;
      // }


  // }, [searchPlace]);

    return (
        // <div className='myMap' id='myMap' style={{
        //     width: '500px', 
        //     height: '300px'
        // }}></div>

<Map // 로드뷰를 표시할 Container
      center={{
        lat: 37.566826,
        lng: 126.9786567,
      }}
      style={{
        width: "100%",
        height: "350px",
      }}
      level={2}
      onCreate={setMap}
    >
      {markers.map((marker) => (
        <MapMarker
          key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
          position={marker.position}
          onClick={() => setInfo(marker)}
        >
          {info &&info.content === marker.content && (
            <div style={{color:"#000"}}>{marker.content}</div>
          )}
        </MapMarker>
      ))}
    </Map>

    );
}

export default MapContainer;