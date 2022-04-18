import { useState, useEffect } from 'react';

const useCurrentLocation = () => {
  const [location, setLocation] = useState();
  const [error, setError] = useState();

  const handleSuccess = (position) => {
    const { longitude: lon, latitude: lat } = position.coords;
    setLocation({ lon, lat });
  };

  const handleFailure = (error) => {
    setError(error);
  };

  useEffect(() => {
    // 현재 디바이스의 경도, 위도를 가져옴
    navigator.geolocation.getCurrentPosition(handleSuccess, handleFailure);
  }, []);

  return { location, error };
};

export default useCurrentLocation;
