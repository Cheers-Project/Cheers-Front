import React, { useEffect } from 'react';
import styled from 'styled-components';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';

const Pagination = ({ maxPage, pageNums, searchParams, setSearchParams }) => {
  const page = searchParams.get('page');

  const changePage = (e) => {
    if (!e.target.value) return;
    setSearchParams({ sort: searchParams.get('sort'), page: e.target.value });
  };

  const clickPrevBtn = () => {
    if (page === '1') return;
    setSearchParams({ sort: searchParams.get('sort'), page: +page - 1 });
  };

  const clickNextBtn = () => {
    if (page > maxPage) return;
    setSearchParams({ sort: searchParams.get('sort'), page: +page + 1 });
  };

  // maxPage 예외처리 확인
  useEffect(() => {
    if (page > maxPage) {
      setSearchParams({ sort: searchParams.get('sort'), page: 1 });
    }
  }, []);

  useEffect(() => {
    if (!page) {
      setSearchParams({ sort: searchParams.get('sort'), page: 1 });
    }
  }, []);

  return (
    <PaginationWrapper>
      <button
        onClick={clickPrevBtn}
        className={page === '1' ? 'btn prev-btn hide' : 'btn prev-btn'}
      >
        <CaretLeftOutlined />
      </button>
      <PageNumberList onClick={changePage}>
        {pageNums.map((pageNum) => {
          if (maxPage >= pageNum) {
            return (
              <PageNumber key={pageNum} page={page} value={pageNum}>
                {pageNum}
              </PageNumber>
            );
          }
        })}
      </PageNumberList>
      <button
        onClick={clickNextBtn}
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
