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
        <li className="nav-item">
          <Link
            to={`/board?sort=recent&page=1`}
            className={sort === 'recent' ? 'nav-link active' : ' nav-link'}
          >
            최신순
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to={`/board?sort=view&page=1`}
            className={sort === 'view' ? 'nav-link active' : 'nav-link'}
          >
            조회순
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to={`/board?sort=like&page=1`}
            className={sort === 'like' ? 'nav-item active' : 'nav-link'}
          >
            인기순
          </Link>
        </li>
      </NavList>
    </BoardNavWrapper>
  );
};

const BoardNavWrapper = styled.div`
  display: flex;
  padding: 3rem 0;
  margin-left: 1rem;
`;

const NavList = styled.ul`
  display: flex;
  gap: 1rem;
  @media screen and (min-width: 768px) {
    gap: 2rem;
  }
  .nav-item {
    display: flex;
    align-items: center;
  }
  .nav-link {
    font-size: ${({ theme }) => theme.fontSize.sm};
    padding: 0.8rem;
    background-color: ${({ theme }) => theme.color.white};
    border-radius: 2rem;
    transition: 0.2s;
    &:hover {
      border-radius: 2rem;
      color: ${({ theme }) => theme.color.white};
      background-color: ${({ theme }) => theme.color.lightCherry};
    }
    @media screen and (min-width: 768px) {
      font-size: ${({ theme }) => theme.fontSize.md};
      padding: 1rem;
    }
  }
  .active {
    border-radius: 2rem;
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.color.lightCherry};
  }
`;

export default BoardNav;
