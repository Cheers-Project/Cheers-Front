import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SearchOutlined } from '@ant-design/icons';

import MeetingMap from 'components/meeting/MeetingMap';
import useMeetingQuery from 'hooks/useMeetingQuery';

const MeetingLocation = () => {
  const { meetingInfo } = useMeetingQuery();
  const [searchInputValue, setSearchInputValue] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleSearchKeywordChange = (e) => {
    setSearchInputValue(e.target.value);
  };

  const handleSearchKeywordSubmit = (e) => {
    e.preventDefault();
    setSearchKeyword(searchInputValue);
    setSearchInputValue('');
  };

  useEffect(() => {
    setSearchInputValue(meetingInfo ? meetingInfo.location.placeName : '');
  }, [meetingInfo]);

  return (
    <LocationWrapper>
      <p className="label-text">모임 장소</p>
      <form onSubmit={handleSearchKeywordSubmit} className="location-form">
        <input
          className="location-input"
          type="text"
          placeholder="모임 장소를 검색하세요"
          onChange={handleSearchKeywordChange}
          value={searchInputValue}
        />
        <button className="search-btn">
          <SearchOutlined />
        </button>
      </form>
      <MeetingMap keyword={searchKeyword} />
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
