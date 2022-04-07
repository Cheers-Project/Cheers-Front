import React from 'react';
import styled from 'styled-components';

const Pagination = () => {
  return (
    <PaginationWrapper>
      <button>{'<'}</button>
      <button>{1}</button>
      <button>{2}</button>
      <button>{3}</button>
      <button>{'>'}</button>
    </PaginationWrapper>
  );
};

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

export default Pagination;
