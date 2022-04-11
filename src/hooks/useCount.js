import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { changeNumber } from 'redux/modules/meeting';

const useCount = (initialState = 1) => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(initialState);

  const increase = useCallback(() => {
    dispatch(changeNumber(count + 1));
    setCount(count + 1);
  }, [count, dispatch]);

  const decrease = useCallback(() => {
    dispatch(changeNumber(count - 1));
    setCount(count - 1);
  }, [count, dispatch]);

  return [count, increase, decrease];
};

export default useCount;
