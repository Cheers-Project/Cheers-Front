import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SearchOutlined } from '@ant-design/icons';

import MeetingMap from 'components/meeting/MeetingMap';
import useMeetingQuery from 'hooks/useMeetingQuery';

const MeetingLocation = () => {
  const meetingInfo = useMeetingQuery();
  const [inputValue, setInputValue] = useState('');
  const [keyword, setKeyword] = useState('');

  const onChange = (e) => {
    setInputValue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setKeyword(inputValue);
    setInputValue('');
  };

  useEffect(() => {
    setInputValue(meetingInfo ? meetingInfo.location.placeName : '');
    setKeyword(
      meetingInfo
        ? `${meetingInfo.location.addressName}${meetingInfo.location.placeName}`
        : '',
    );
  }, [meetingInfo]);

  return (
    <LocationWrapper>
      <p className="label-text">모임 장소</p>
      <form onSubmit={onSubmit} className="location-form">
        <input
          className="location-input"
          type="text"
          placeholder="모임 장소를 검색하세요"
          onChange={onChange}
          value={inputValue}
        />
        <button className="search-btn">
          <SearchOutlined />
        </button>
      </form>
      <MeetingMap keyword={keyword} />
    </LocationWrapper>
  );
};

const LocationWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  .label-text {
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: 600;
  }
  .location-form {
    border-bottom: 1px solid ${({ theme }) => theme.color.divider};
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .location-input {
    flex: 1;
    padding: 1rem 0;
    font-size: ${({ theme }) => theme.fontSize.sm};
    &::placeholder {
      font-size: ${({ theme }) => theme.fontSize.sm};
    }
  }
  .search-btn {
    font-size: ${({ theme }) => theme.fontSize.md};
    padding: 1rem;
  }
`;

export default MeetingLocation;
