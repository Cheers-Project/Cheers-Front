import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { changeLocation } from 'redux/modules/meeting';
import useMeetingQuery from 'hooks/useMeetingQuery';
import useCurrentLocation from 'hooks/useCurrentLocation';

const MeetingMap = ({ keyword }) => {
  const dispatch = useDispatch();
  const { meetingInfo } = useMeetingQuery();
  const { location, loading, error } = useCurrentLocation();

  useEffect(() => {
    const { kakao } = window;

    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    const container = document.getElementById('map');
    let selectedMarker = null;

    const handleKakaoMapCreate = (position) => {
      const { longitude: lon, latitude: lat } = position.coords;

      const options = {
        center: new kakao.maps.LatLng(lat, lon),
        level: 5,
      };

      const map = new kakao.maps.Map(container, options);
      const ps = new window.kakao.maps.services.Places();

      // 선택된 마커 이미지 설정
      const selectedImgSrc =
        'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
      const imgSize = new kakao.maps.Size(24, 35);
      const selectedMarkerImg = new kakao.maps.MarkerImage(
        selectedImgSrc,
        imgSize,
      );

      // 줌 컨트롤러 생성
      const zoomControl = new kakao.maps.ZoomControl();
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

      // 마커와 인포 윈도우를 표시하는 함수
      const handleMarkerDisplay = (place) => {
        let marker = new kakao.maps.Marker({
          map,
          position: new kakao.maps.LatLng(place.y, place.x),
          clickable: true,
        });

        // 마커에 호버 시 인포 윈도우 디스플레이
        kakao.maps.event.addListener(marker, 'mouseover', () => {
          infowindow.setContent(
            '<div style="padding:3px;font-size:12px;">' +
              place.place_name +
              '</div>',
          );
          infowindow.open(map, marker);
        });

        // 마커 클릭 시 선택된 마커 이미지 변경 및 정보 얻기
        kakao.maps.event.addListener(marker, 'click', () => {
          // 마커 이미지 변경
          if (!selectedMarker || selectedMarker !== marker) {
            selectedMarker &&
              selectedMarker.setImage(selectedMarker.normalImage);

            marker.setImage(selectedMarkerImg);
          }

          selectedMarker = marker;

          const location = {
            placeName: place.place_name,
            addressName: place.address_name,
            coordinates: [place.x, place.y],
          };
          dispatch(changeLocation(location));
        });
      };

      // 검색어가 입력되면 실행될 콜백 함수
      const handleSearchCallback = (data, status, pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          let bounds = new kakao.maps.LatLngBounds();
          for (let i = 0; i < data.length; i++) {
            handleMarkerDisplay(data[i]);
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }
          map.setBounds(bounds);
        }
      };

      // 검색어가 존재하지 않으면 현재 위치를 보여줌
      if (!keyword) return;
      console.log('키워드로 검색');
      ps.keywordSearch(keyword, handleSearchCallback);
    };

    // 모임 정보가 존재하면 모임 정보를 바탕으로 지도 초기 위치 설정
    if (meetingInfo) {
      const position = {
        coords: {
          longitude: meetingInfo.location.coordinates[0],
          latitude: meetingInfo.location.coordinates[1],
        },
      };
      handleKakaoMapCreate(position);
    } else {
      // 위치 정보가 허용 되어있으면 현재 위치, 아니면 서울 시청을 보여줌
      if (!loading && location) {
        handleKakaoMapCreate({
          coords: {
            longitude: location.lon,
            latitude: location.lat,
          },
        });
      } else if (error) {
        handleKakaoMapCreate({
          coords: {
            longitude: '126.9784147',
            latitude: '37.5666805',
          },
        });
      }
    }
  }, [keyword, dispatch, meetingInfo, loading, location, error]);

  return <MapWrapper id="map"></MapWrapper>;
};

const MapWrapper = styled.div`
  margin-top: 1.5rem;
  width: 100%;
  min-height: 40rem;
  flex: 1;
`;

export default MeetingMap;
