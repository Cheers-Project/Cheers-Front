import { useState, useEffect } from 'react';

const useCurrentLocation = () => {
  const [location, setLocation] = useState();

  useEffect(() => {
    // 현재 디바이스의 경도, 위도를 가져옴
    navigator.geolocation.getCurrentPosition((position) => {
      const { longitude: lon, latitude: lat } = position.coords;
      setLocation({ lon, lat });
    });
  }, []);

  return location;
};

export default useCurrentLocation;
