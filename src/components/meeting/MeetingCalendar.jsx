import React, { useState } from 'react';
import styled from 'styled-components';
import { DayPicker } from 'react-day-picker';
import ko from 'date-fns/locale/ko';
import { DownOutlined } from '@ant-design/icons';

const MeetingCalendar = () => {
  const [selected, setSelected] = useState();
  const [state, setState] = useState(false);
  const onClick = () => {
    setState(!state);
  };

  console.log(state);

  return (
    <CalendarWrapper>
      <div className="label-wrapper">
        <p className="label-text">모임 날짜</p>
        <button onClick={onClick}>
          <DownOutlined />
        </button>
      </div>

      <DayPicker
        className={state ? 'rdp visible' : 'rdp'}
        selected={selected}
        onSelect={setSelected}
        mode="single"
        locale={ko}
      />
    </CalendarWrapper>
  );
};

const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  .label-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    > button {
      font-size: 1.6rem;
    }
  }

  .label-text {
    font-size: ${({ theme }) => theme.fontSize.md};
  }

  .rdp {
    display: none;
    margin: 0;
    margin-top: 1rem;
  }
  .visible {
    display: flex;
  }
  .rdp-months,
  .rdp-month {
    width: 100%;
  }
  .rdp-table {
    max-width: 100%;
    width: 100%;
  }
  .rdp-day {
    display: inline-block;
  }
  .rdp-caption_label {
    padding: 0;
  }
`;

export default MeetingCalendar;
