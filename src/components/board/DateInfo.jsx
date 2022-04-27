import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';

const DateInfo = ({ boardInfo, flex }) => {
  const createdDate = format(new Date(boardInfo.createdDate), 'yyyy-MM-dd');

  return (
    <DateInfoWrapper flex={flex}>
      <p>{createdDate}</p>
    </DateInfoWrapper>
  );
};

const DateInfoWrapper = styled.div`
  display: flex;
  justify-content: ${({ flex }) => flex};
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.color.darkGray};
`;
export default DateInfo;
