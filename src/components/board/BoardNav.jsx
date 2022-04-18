import React, { useEffect } from 'react';
import useCurrentQuery from 'hooks/useCurrentQuery';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

const BoardNav = () => {
  const navigate = useNavigate();
  const [query, searchParams] = useCurrentQuery();
  console.log(query, searchParams);

  const { sort } = searchParams;

  return (
    <BoardNavWrapper>
      <NavList>
        <Link
          to={`/board?sort=recent&page=1`}
          className={
            sort === 'recent' ? 'recent nav-item active' : 'recent nav-item'
          }
        >
          최신순
        </Link>
        <Link
          to={`/board?sort=like&page=1`}
          className={sort === 'like' ? 'like nav-item active' : 'like nav-item'}
        >
          인기순
        </Link>
        <Link
          to={`/board?sort=view&page=1`}
          className={sort === 'view' ? 'like nav-item active' : 'view nav-item'}
        >
          조회순
        </Link>
      </NavList>
    </BoardNavWrapper>
  );
};

const BoardNavWrapper = styled.div`
  display: flex;
  justify-content: center;
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
