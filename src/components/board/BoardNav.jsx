import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

const BoardNav = () => {
  const location = window.location;
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const page = searchParams.get('page');

  const onClick = (e) => {
    if (!e.target.classList.contains('nav-item')) return;
    setSearchParams({ sort: e.target.classList[0], page: page });
  };

  useEffect(() => {
    if (sort !== 'recent' && sort !== 'like' && sort !== 'view') {
      setSearchParams({ sort: 'recent', page: page });
    }
  }, []);

  useEffect(() => {
    if (!sort) {
      setSearchParams({ sort: 'recent', page: page });
    }
  }, []);

  return (
    <BoardNavWrapper>
      <NavList onClick={onClick}>
        <Link
          to={`/board?${location.search}`}
          className={
            sort === 'recent' ? 'recent nav-item active' : 'recent nav-item'
          }
        >
          최신순
        </Link>
        <Link
          to={`/board?${location.search}`}
          className={sort === 'like' ? 'like nav-item active' : 'like nav-item'}
        >
          인기순
        </Link>
        <Link
          to={`/board?${location.search}`}
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
