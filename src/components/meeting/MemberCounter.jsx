import React from 'react';
import styled from 'styled-components';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

import useCount from 'hooks/useCount';

const MemberCounter = () => {
  const [count, increase, decrease] = useCount();

  return (
    <CounterWrapper>
      <p className="label-text">모임 인원</p>
      <Counter>
        <button
          className={count ? 'decrease-btn' : 'decrease-btn disabled'}
          disabled={count ? false : true}
          onClick={decrease}
        >
          <MinusOutlined />
        </button>
        <input className="counter-input" type="text" value={count} readOnly />
        <button
          className={count < 10 ? 'increase-btn' : 'increase-btn disabled'}
          disabled={count < 10 ? false : true}
          onClick={increase}
        >
          <PlusOutlined />
        </button>
      </Counter>
    </CounterWrapper>
  );
};

const CounterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .label-text {
    font-size: ${({ theme }) => theme.fontSize.md};
  }
`;

const Counter = styled.div`
  display: inline-flex;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.color.lightGray};
  .counter-input {
    width: 3rem;
    font-size: ${({ theme }) => theme.fontSize.md};
    text-align: center;
  }
  .decrease-btn,
  .increase-btn {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    font-size: ${({ theme }) => theme.fontSize.md};
  }

  .disabled {
    cursor: not-allowed;
  }
`;

export default MemberCounter;
