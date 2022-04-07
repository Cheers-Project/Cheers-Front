import React from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

const BoardNav = () => {
  const location = useLocation();
  const [searchParams, setSearchParmas] = useSearchParams();

  const isActive = searchParams.get('sort');

  const onClick = (e) => {
    if (!e.target.classList.contains('nav-item')) return;
    setSearchParmas(`sort=${e.target.classList[0]}&page=${1}`);
  };

  return (
    <BoardNavWrapper>
      <NavList onClick={onClick}>
        <Link
          to={`/board?${location.search}`}
          className={
            isActive === 'recent' ? 'recent nav-item active' : 'recent nav-item'
          }
        >
          최신순
        </Link>
        <Link
          to={`/board?${location.search}`}
          className={
            isActive === 'like' ? 'like nav-item active' : 'like nav-item'
          }
        >
          인기순
        </Link>
        <Link
          to={`/board?${location.search}`}
          className={
            isActive === 'view' ? 'like nav-item active' : 'view nav-item'
          }
        >
          조회순
        </Link>
      </NavList>
    </BoardNavWrapper>
  );
};

const BoardNavWrapper = styled.nav`
  display: flex;
  padding-top: 3rem;
`;

const NavList = styled.ul`
  display: flex;
  gap: 2rem;
  padding: 1rem 1rem 0 1rem;
  background-color: #fff;

  .nav-item {
    font-size: ${({ theme }) => theme.fontSize.lg};
  }
  .active {
    border-bottom: 1px solid ${({ theme }) => theme.color.lightCherry};
  }
`;

export default BoardNav;
