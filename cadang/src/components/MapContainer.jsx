import React, { useEffect } from 'react';

const { kakao } = window;

const MapContainer = ({searchPlace}) => {

    useEffect(() => {
      const container = document.getElementById('myMap');
      const options = {
        center: new kakao.maps.LatLng(37.503325874722, 127.04403462366),
        level: 4
      };
      const map = new kakao.maps.Map(container, options);
  
      const ps = new kakao.maps.services.Places();

      // ps.keywordSearch(searchPlace, placesSearchCB); 
      // 카테고리로 카페를 검색합니다
      ps.categorySearch('CE7', placesSearchCB, {useMapBounds:true}); 

      function placesSearchCB (data, status, pagination) {
          if (status === kakao.maps.services.Status.OK) {

              let bounds = new kakao.maps.LatLngBounds();

              for (let i=0; i<data.length; i++) {
                displayMarker(data[i]);    
                bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
              }       

              map.setBounds(bounds);
          } 
      }

      function displayMarker(place) {
          let marker = new kakao.maps.Marker({
              map: map,
              position: new kakao.maps.LatLng(place.y, place.x) 
          });
          let infowindow = new kakao.maps.InfoWindow({zIndex:1});
        // 마커에 클릭이벤트를 등록
      kakao.maps.event.addListener(marker, 'click', function() {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
        infowindow.open(map, marker);
    });
      }
  }, [searchPlace]);

    return (
        <div id='myMap' style={{
            width: '500px', 
            height: '300px'
        }}></div>
    );
}

export default MapContainer;