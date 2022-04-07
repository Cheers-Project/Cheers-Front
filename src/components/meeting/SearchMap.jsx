import React from 'react';
import styled from 'styled-components';

const SearchMap = ({ keyword }) => {
  const mapScript = document.createElement('script');

  mapScript.async = true;
  mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_KEY}&libraries=services,clusterer&autoload=false`;

  document.head.appendChild(mapScript);

  const searchCallback = () => {
    console.log('search');
  };

  const loadKakaoMap = () => {
    const { kakao } = window;
    kakao.maps.load(() => {
      const container = document.getElementById('map');

      navigator.geolocation.getCurrentPosition((position) => {
        const { longitude: lon, latitude: lat } = position.coords;

        const options = {
          center: new kakao.maps.LatLng(lat, lon),
          level: 5,
        };

        const map = new kakao.maps.Map(container, options);
      });
      const ps = new window.kakao.maps.services.Places();
      ps.keywordSearch(keyword, searchCallback);
    });
  };

  mapScript.addEventListener('load', loadKakaoMap);

  return <MapWrapper id="map"></MapWrapper>;
};

const MapWrapper = styled.div`
  margin-top: 1.5rem;
  width: 100%;
  height: 50rem;
`;

export default SearchMap;
