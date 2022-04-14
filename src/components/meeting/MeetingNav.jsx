import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import useCurrentLocation from 'hooks/useCurrentLocation';
import useCurrentQuery from 'hooks/useCurrentQuery';

const MeetingNav = () => {
  const location = useCurrentLocation();
  const [query, searchParams] = useCurrentQuery();
  const { sort } = searchParams;

  return (
    <MeetingNavWrapper>
      <ul className="nav-list">
        <li className="nav-item">
          <Link
            to="/meeting?sort=recent"
            className={sort === 'recent' ? 'nav-link active' : 'nav-link'}
          >
            최신순
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/meeting?sort=view"
            className={sort === 'view' ? 'nav-link active' : 'nav-link'}
          >
            조회순
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to={`/meeting?sort=near&lon=${location?.lon}&lat=${location?.lat}`}
            className={sort === 'near' ? 'nav-link active' : 'nav-link'}
          >
            근처 모임
          </Link>
        </li>
      </ul>
    </MeetingNavWrapper>
  );
};

const MeetingNavWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 3rem 0;
  .nav-list {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
  .nav-item {
    display: flex;
    align-items: center;
  }
  .nav-link {
    font-size: ${({ theme }) => theme.fontSize.md};
    padding: 1rem;
    background-color: ${({ theme }) => theme.color.white};
    border-radius: 2rem;
    transition: 0.2s;
    &:hover {
      border-radius: 2rem;
      color: ${({ theme }) => theme.color.white};
      background-color: ${({ theme }) => theme.color.lightCherry};
    }
  }
  .active {
    border-radius: 2rem;
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.color.lightCherry};
  }
`;

export default MeetingNav;
