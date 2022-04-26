import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useCurrentLocation = () => {
  const dispatch = useDispatch();
  const [location, setLocation] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleLoadLocationSuccess = (position) => {
      const { latitude: lat, longitude: lon } = position.coords;
      setLocation({ lon, lat });
      setError(null);
      setLoading(false);
    };

    const handleLoadLocationFailure = (e) => {
      setError(e);
      setLoading(false);
    };

    const handleLoadLocation = () => {
      setLoading(true);
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      })
        .then((position) => {
          handleLoadLocationSuccess(position);
        })
        .catch((e) => {
          handleLoadLocationFailure(e);
        });
    };
    // 현재 디바이스의 경도, 위도를 가져옴
    handleLoadLocation();

    return handleLoadLocation;
  }, [dispatch]);

  return { location, error, loading };
};

export default useCurrentLocation;
