import { useCallback, useState } from 'react';

const useCount = (initialState = 1) => {
  const [count, setCount] = useState(initialState);

  const increase = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  const decrease = useCallback(() => {
    setCount(count - 1);
  }, [count]);

  return [count, increase, decrease];
};

export default useCount;
