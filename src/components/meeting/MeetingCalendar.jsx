import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DayPicker } from 'react-day-picker';
import { differenceInCalendarDays, format } from 'date-fns';
import ko from 'date-fns/locale/ko';
import { useDispatch } from 'react-redux';

import { changeDate } from 'redux/modules/meeting';
import useMeetingQuery from 'hooks/useMeetingQuery';

const MeetingCalendar = () => {
  const dispatch = useDispatch();
  const { meetingInfo } = useMeetingQuery();
  const [selected, setSelected] = useState();

  const handleSelectedDate = (_, selectedDay) => {
    const convertedDate = format(selectedDay, 'yyyy-MM-dd');

    dispatch(changeDate(convertedDate));
    setSelected(selectedDay);
  };

  // 오늘 이전 날짜 선택 불가
  const handleDisabledDate = (date) => {
    return differenceInCalendarDays(date, new Date()) < 0;
  };

  useEffect(() => {
    setSelected(meetingInfo ? new Date(meetingInfo.meetingDate) : '');
  }, [meetingInfo]);

  return (
    <CalendarWrapper>
      <div className="label-wrapper">
        <p className="label-text">모임 날짜</p>
      </div>
      {meetingInfo && (
        <DayPicker
          selected={selected}
          onSelect={handleSelectedDate}
          mode="single"
          locale={ko}
          fromYear={2022}
          toYear={2026}
          defaultMonth={new Date(meetingInfo.meetingDate)}
          disabled={handleDisabledDate}
          captionLayout="dropdown"
          modifiersClassNames={{
            selected: 'selected',
            today: 'today',
          }}
        />
      )}
      {!meetingInfo && (
        <DayPicker
          selected={selected}
          onSelect={handleSelectedDate}
          mode="single"
          locale={ko}
          fromYear={2022}
          toYear={2026}
          disabled={handleDisabledDate}
          captionLayout="dropdown"
          modifiersClassNames={{
            selected: 'selected',
            today: 'today',
          }}
        />
      )}
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
      font-size: ${({ theme }) => theme.fontSize.md};
    }
  }
  .label-text {
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: 600;
  }
  .rdp {
    margin: 0;
    margin-top: 1rem;
  }
  .rdp-head_cell {
    font-size: ${({ theme }) => theme.fontSize.sm};
  }
  .rdp-cell {
    font-size: ${({ theme }) => theme.fontSize.sm};
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
  .rdp-caption {
    justify-content: center;
    margin-bottom: 1rem;
  }
  .rdp-caption_label {
    font-size: ${({ theme }) => theme.fontSize.md};
    padding: 0;
  }
  .rdp-caption_dropdowns {
    padding: 0;
    font-size: ${({ theme }) => theme.fontSize.sm};
    flex-direction: row-reverse;
  }
  .rdp-dropdown_month + .rdp-dropdown_month {
    margin-right: 1rem;
  }
  // 년, 월 셀렉터 스타일링
  .rdp-dropdown:focus:not([disabled]) + .rdp-caption_label,
  .rdp-dropdown:active:not([disabled]) + .rdp-caption_label {
    background-color: inherit;
    border: 2px solid ${({ theme }) => theme.color.lightCherry};
  }
  // 토, 일요일 표시
  .rdp-cell {
    &:first-child {
      color: red;
    }
    &:last-child {
      color: blue;
    }
  }
  // 선택 날짜 스타일링
  .rdp-button:focus:not([disabled]),
  .rdp-button:active:not([disabled]) {
    background-color: inherit;
    border: 1px solid ${({ theme }) => theme.color.lightCherry};
  }
  .rdp-button:hover:not([disabled]) {
    background-color: rgba(219, 66, 142, 0.1);
  }
  .selected {
    border: 1px solid ${({ theme }) => theme.color.lightCherry};
  }
  // 오늘 날짜
  .today {
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: 600;
  }
`;

export default MeetingCalendar;
