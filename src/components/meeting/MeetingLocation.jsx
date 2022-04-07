import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';

import SearchMap from 'components/meeting/SearchMap';

const MeetingLocation = () => {
  const { REACT_APP_KAKAO_API_KEY } = process.env;
  const [keyword, setKeyword] = useState('');

  const onChange = (e) => {
    setKeyword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <LocationWrapper>
      <p className="label-text">모임 장소</p>
      <form onSubmit={onSubmit} className="location-form">
        <input
          className="location-input"
          type="text"
          placeholder="모임 장소를 검색하세요"
          onChange={onChange}
        />
        <button className="search-btn">
          <SearchOutlined />
        </button>
      </form>
      <SearchMap keyword={keyword} />
    </LocationWrapper>
  );
};

const LocationWrapper = styled.div`
  .label-text {
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: 600;
  }
  .location-form {
    border-bottom: 1px solid ${({ theme }) => theme.color.lightGray};
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
