import React from 'react';
import styled from 'styled-components';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

import useCount from 'hooks/useCount';

const MemberCounter = () => {
  const [count, increase, decrease] = useCount(2);

  return (
    <CounterWrapper>
      <p className="label-text">모임 인원</p>
      <div className="counter-inner">
        <div className="info-text">자신을 포함한 인원입니다</div>
        <Counter>
          <button
            className={count > 2 ? 'decrease-btn' : 'decrease-btn disabled'}
            disabled={count > 2 ? false : true}
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
      </div>
    </CounterWrapper>
  );
};

const CounterWrapper = styled.div`
  display: flex;
  flex-direction: column;

  .label-text {
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: 600;
  }
  .counter-inner {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .info-text {
    font-size: ${({ theme }) => theme.fontSize.sm};
    color: ${({ theme }) => theme.color.darkGray};
  }
`;

const Counter = styled.div`
  width: 11rem;
  height: 3rem;
  display: inline-flex;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.color.lightGray};
  border-radius: 0.3rem;
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
