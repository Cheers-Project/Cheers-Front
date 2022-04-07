import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import * as boardAPI from 'api/board';
import BoardItem from 'components/board/BoardItem';
import Pagination from './Pagination';

const BoardList = () => {
  const { data } = useQuery(['boards'], boardAPI.getBoards, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return (
    <BoardListWrapper>
      {data?.boards &&
        data.boards.map((board) => (
          <BoardItem key={board._id} boardInfo={board} />
        ))}
      <Pagination />
    </BoardListWrapper>
  );
};

const BoardListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default BoardList;
