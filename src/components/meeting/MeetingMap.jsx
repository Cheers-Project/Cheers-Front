import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { changeLocation } from 'redux/modules/meeting';
import useMeetingQuery from 'hooks/useMeetingQuery';
import useCurrentLocation from 'hooks/useCurrentLocation';

const { kakao } = window;

const MeetingMap = ({ keyword }) => {
  const dispatch = useDispatch();
  const { meetingInfo } = useMeetingQuery();
  const { location, loading } = useCurrentLocation();
  const [kakaoMap, setKakaoMap] = useState(null);
  const container = useRef();

  // 위치 서비스 정보에 따라 지도 생성
  useEffect(() => {
    // 위치 서비스를 가져오는 중이라면 실행하지 않음
    if (loading) return;

    const options = {
      center: location
        ? new kakao.maps.LatLng(location.lat, location.lon)
        : new kakao.maps.LatLng('37.5666805', '126.9784147'),
      level: 5,
    };

    const zoomControl = new kakao.maps.ZoomControl();

    const map = new kakao.maps.Map(container.current, options);
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    setKakaoMap(map);
  }, [location, loading]);

  // 모임 위치에 따라 지도 중심위치 이동 및 마커, 인포윈도우 생성
  useEffect(() => {
    if (!kakaoMap || !meetingInfo) return;

    const selectedImgSrc =
      'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
    const imgSize = new kakao.maps.Size(24, 35);
    const selectedMarkerImg = new kakao.maps.MarkerImage(
      selectedImgSrc,
      imgSize,
    );

    const meetingLocation = new kakao.maps.LatLng(
      meetingInfo.location.coordinates[1],
      meetingInfo.location.coordinates[0],
    );

    // 마커와 인포 윈도우를 생성하는 함수
    const infowindow = new kakao.maps.InfoWindow({
      position: meetingLocation,
      zIndex: 1,
      content: `<div style="padding:3px;font-size:12px;">${meetingInfo.location.placeName}</div>`,
    });

    const marker = new kakao.maps.Marker({
      kakaoMap,
      position: meetingLocation,
      clickable: true,
    });

    marker.setImage(selectedMarkerImg);
    marker.setMap(kakaoMap);
    infowindow.open(kakaoMap, marker);
    kakaoMap.setCenter(meetingLocation);
  }, [meetingInfo]);

  useEffect(() => {
    if (!kakaoMap || !keyword) return;

    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    const selectedImgSrc =
      'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
    const imgSize = new kakao.maps.Size(24, 35);
    const selectedMarkerImg = new kakao.maps.MarkerImage(
      selectedImgSrc,
      imgSize,
    );
    let selectedMarker = null;

    const handleMarkerHover = (marker, place) => {
      // 마커에 호버 시 인포 윈도우 디스플레이
      kakao.maps.event.addListener(marker, 'mouseover', () => {
        infowindow.setContent(
          `<div style="padding:3px;font-size:12px;">${place.place_name}</div>`,
        );
        infowindow.open(kakaoMap, marker);
      });
    };

    // 선택된 마커의 이미지를 변경하고 정보를 얻는 함수
    const handleGetMarkerData = (marker, place) => {
      kakao.maps.event.addListener(marker, 'click', () => {
        if (!selectedMarker || selectedMarker !== marker) {
          selectedMarker && selectedMarker.setImage(selectedMarker.normalImage);
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

    const handleMarkerDisplay = (place) => {
      const marker = new kakao.maps.Marker({
        kakaoMap,
        position: new kakao.maps.LatLng(place.y, place.x),
        clickable: true,
      });

      marker.setMap(kakaoMap);

      handleMarkerHover(marker, place);
      handleGetMarkerData(marker, place);
    };

    // 검색어가 입력되면 실행될 콜백
    const handleSearchCallback = (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();
        data.forEach((item) => {
          handleMarkerDisplay(item);
          bounds.extend(new kakao.maps.LatLng(item.y, item.x));
        });
        kakaoMap.setBounds(bounds);
      }
    };

    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(keyword, handleSearchCallback);

    // return () => handleMarkerDisplay;
  }, [keyword, dispatch]);

  return <MapWrapper id="map" ref={container}></MapWrapper>;
};

const MapWrapper = styled.div`
  margin-top: 1.5rem;
  width: 100%;
  min-height: 40rem;
  flex: 1;
`;

export default MeetingMap;
