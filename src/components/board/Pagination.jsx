import React from 'react';
import styled from 'styled-components';
import { CaretLeftFilled, CaretRightFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import useCurrentQuery from 'hooks/useCurrentQuery';

const Pagination = ({ maxPage, pageNums }) => {
  const { searchParams } = useCurrentQuery();
  const { sort, page } = searchParams;

  return (
    <PaginationWrapper>
      <StyledLink
        to={`/board?sort=${sort}&page=${+page - 1}`}
        className={page === '1' ? 'btn prev-btn hide' : 'btn prev-btn'}
      >
        <CaretLeftFilled />
      </StyledLink>
      {pageNums.map((pageNum, i) => {
        if (maxPage < pageNum) return null;
        return (
          <StyledLink
            key={i}
            to={`/board?sort=${sort}&page=${pageNum}`}
            className={+page === pageNum ? 'active' : ''}
          >
            {pageNum}
          </StyledLink>
        );
      })}
      <StyledLink
        to={`/board?sort=${sort}&page=${+page + 1}`}
        className={page === `${maxPage}` ? 'btn next-btn hide' : 'btn next-btn'}
      >
        <CaretRightFilled />
      </StyledLink>
    </PaginationWrapper>
  );
};

const PaginationWrapper = styled.div`
  padding: 3rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.color.black};
  font-size: ${({ theme }) => theme.fontSize.md};
  position: relative;
  .btn {
    padding: 0 0.5rem;
    vertical-align: super;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
      color: ${({ theme }) => theme.color.lightCherry};
    }
  }
  .hide {
    opacity: 0;
    cursor: unset;
  }
  .active {
    color: ${({ theme }) => theme.color.lightCherry};
  }
`;

const StyledLink = styled(Link)`
  line-height: initial;
  padding: 0 1rem;
  cursor: pointer;
  transition: 0.2s;
  color: ${({ theme, page, value }) => {
    return page === `${value}` ? theme.color.lightCherry : theme.color.black;
  }};
  &:hover {
    color: ${({ theme }) => theme.color.lightCherry};
  }
`;
export default Pagination;
