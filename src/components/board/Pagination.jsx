import React from 'react';
import styled from 'styled-components';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import useCurrentQuery from 'hooks/useCurrentQuery';

const Pagination = ({ maxPage, pageNums }) => {
  const navigate = useNavigate();
  const { searchParams } = useCurrentQuery();
  const { sort, page } = searchParams;

  const handlePageChange = (e) => {
    if (!e.target.value) return;
    navigate(`/board?sort=${sort}&page=${e.target.value}`);
  };

  const handlePrevPageRoute = () => {
    if (page === '1') return;
    navigate(`/board?sort=${sort}&page=${+page - 1}`);
  };

  const handleNextPageRoute = () => {
    if (page > maxPage) return;
    navigate(`/board?sort=${sort}&page=${+page + 1}`);
  };

  return (
    <PaginationWrapper>
      <button
        onClick={handlePrevPageRoute}
        className={page === '1' ? 'btn prev-btn hide' : 'btn prev-btn'}
      >
        <CaretLeftOutlined />
      </button>
      <PageNumberList onClick={handlePageChange}>
        {pageNums.map((pageNum, i) => {
          if (maxPage < pageNum) return null;
          return (
            <PageNumber key={i} page={page} value={pageNum}>
              {pageNum}
            </PageNumber>
          );
        })}
      </PageNumberList>
      <button
        onClick={handleNextPageRoute}
        className={page === `${maxPage}` ? 'btn next-btn hide' : 'btn next-btn'}
      >
        <CaretRightOutlined />
      </button>
    </PaginationWrapper>
  );
};

const PaginationWrapper = styled.div`
  padding: 3rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.8rem;
  position: relative;
  .btn {
    padding: 1rem;
    display: flex;
    align-items: center;
    height: 100%;
    font-size: ${({ theme }) => theme.fontSize.md};
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
`;

const PageNumberList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

const PageNumber = styled.button`
  font-size: ${({ theme }) => theme.fontSize.md};
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
