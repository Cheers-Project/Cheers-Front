import React from 'react';
import styled from 'styled-components';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import { increaseNumber, decreaseNumber } from 'redux/modules/meeting';
import useMeetingQuery from 'hooks/useMeetingQuery';

const MemberCounter = () => {
  const meetingInfo = useMeetingQuery();
  const dispatch = useDispatch();
  const { totalNumber } = useSelector(({ meeting }) => meeting);

  const increase = (e) => {
    dispatch(increaseNumber());
  };

  const decrease = (e) => {
    dispatch(decreaseNumber());
  };

  return (
    <CounterWrapper>
      <p className="label-text">모임 인원</p>
      <div className="counter-inner">
        <div className="info-text">자신을 포함한 인원입니다</div>
        <Counter>
          <button
            className={
              totalNumber > 2 ? 'decrease-btn' : 'decrease-btn disabled'
            }
            disabled={totalNumber > 2 ? false : true}
            onClick={decrease}
          >
            <MinusOutlined />
          </button>
          <input
            className="counter-input"
            type="text"
            value={totalNumber}
            readOnly
          />
          <button
            className={
              totalNumber < 10 ? 'increase-btn' : 'increase-btn disabled'
            }
            disabled={totalNumber < 10 ? false : true}
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
