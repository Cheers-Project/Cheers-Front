import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const useError = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleError = () => {
      if (!error) return;
      setTimeout(() => {
        setError(null);
      }, 1000);
    };

    handleError();
  }, [error, dispatch]);

  return { error, setError };
};

export default useError;
