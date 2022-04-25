import React from 'react';
import useCurrentQuery from 'hooks/useCurrentQuery';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const BoardNav = () => {
  const { searchParams } = useCurrentQuery();
  const { sort } = searchParams;

  return (
    <BoardNavWrapper>
      <NavList>
        <Link
          to={`/board?sort=recent&page=1`}
          className={sort === 'recent' ? 'nav-item active' : 'recent nav-item'}
        >
          최신순
        </Link>
        <Link
          to={`/board?sort=view&page=1`}
          className={sort === 'view' ? 'nav-item active' : 'view nav-item'}
        >
          조회순
        </Link>
        <Link
          to={`/board?sort=like&page=1`}
          className={sort === 'like' ? 'nav-item active' : 'like nav-item'}
        >
          인기순
        </Link>
      </NavList>
    </BoardNavWrapper>
  );
};

const BoardNavWrapper = styled.div`
  display: flex;
  padding: 3rem 0;
`;

const NavList = styled.ul`
  display: flex;
  align-items: center;
  gap: 2rem;

  .nav-item {
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

export default BoardNav;
