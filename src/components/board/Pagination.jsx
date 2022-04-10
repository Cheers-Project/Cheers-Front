import React from 'react';
import styled from 'styled-components';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';

const Pagination = ({ searchParams, setSearchParams }) => {
  const page = searchParams.get('page');

  const onClick = (e) => {
    if (!e.target.value) return;
    setSearchParams({ sort: searchParams.get('sort'), page: e.target.value });
  };

  return (
    <PaginationWrapper>
      <button className={page === '1' ? 'btn prev-btn hide' : 'btn prev-btn'}>
        <CaretLeftOutlined />
      </button>
      <PageNumberList onClick={onClick}>
        <PageNumber page={page} value={1}>
          {1}
        </PageNumber>
        <PageNumber page={page} value={2}>
          {2}
        </PageNumber>
        <PageNumber page={page} value={3}>
          {3}
        </PageNumber>
      </PageNumberList>
      <button className="btn next-btn">
        <CaretRightOutlined />
      </button>
    </PaginationWrapper>
  );
};

const PageNumber = styled.li`
  padding: 1rem 1rem 0.7rem 1rem;
  font-size: ${({ theme }) => theme.fontSize.smTitle};
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
  color: ${({ theme, page, value }) => {
    return page === `${value}` ? theme.color.lightCherry : theme.color.black;
  }};
  &:hover {
    color: ${({ theme }) => theme.color.lightCherry};
  }
`;

const PaginationWrapper = styled.div`
  padding: 3rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.8rem;
  position: relative;
  .btn {
    padding: 1rem 0;
    display: flex;
    align-items: center;
    height: 100%;
    font-size: ${({ theme }) => theme.fontSize.mdTitle};
    cursor: pointer;
    transition: 0.2s;
    &:hover {
      color: ${({ theme }) => theme.color.lightCherry};
    }
  }

  .hide {
    opacity: 0;
  }
`;

const PageNumberList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin: 0 1rem;
`;

export default Pagination;
