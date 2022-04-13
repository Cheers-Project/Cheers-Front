import useCurrentQuery from 'hooks/useCurrentQuery';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MeetingNav = () => {
  const [query, setQuery] = useCurrentQuery();
  console.log(query);

  return (
    <MeetingNavWrapper>
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/meeting?test=1" className="nav-link active">
            최신순
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/meeting?test=2" className="nav-link">
            조회순
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/meeting?test=3" className="nav-link">
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
