import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { changeTime } from 'redux/modules/meeting';
import useMeetingQuery from 'hooks/useMeetingQuery';

const MeetingTime = () => {
  const dispatch = useDispatch();
  const { meetingInfo } = useMeetingQuery();

  const handleTime = (e) => {
    dispatch(changeTime(e.target.value));
  };

  return (
    <TimeWrapper>
      <p className="label-text">모임 시간</p>
      <div className="input-container">
        <div className="info-text">모임 시간을 선택하세요</div>
        <input
          onChange={handleTime}
          defaultValue={meetingInfo?.meetingTime}
          className="time-input"
          type="time"
        />
      </div>
    </TimeWrapper>
  );
};

const TimeWrapper = styled.div`
  .label-text {
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: 600;
  }
  .input-container {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }
  .info-text {
    font-size: ${({ theme }) => theme.fontSize.sm};
    color: ${({ theme }) => theme.color.darkGray};
  }
  .time-input {
    width: 11rem;
    height: 3rem;
    padding: 0.3rem 0.5rem;
    border: 1px solid ${({ theme }) => theme.color.lightGray};
    border-radius: 0.3rem;
  }
`;

export default MeetingTime;
