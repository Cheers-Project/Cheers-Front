import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import * as boardAPI from 'api/board';
import BoardItem from 'components/board/BoardItem';
import Pagination from 'components/board/Pagination';
import useCurrentQuery from 'hooks/useCurrentQuery';

const BoardList = () => {
  const { query } = useCurrentQuery();

  const { data: boardData } = useQuery(
    ['boards', query],
    () => boardAPI.getBoards(query),
    {
      refetchOnWindowFocus: false,
      cacheTime: 0,
      retry: 0,
    },
  );

  return (
    <BoardListOuter>
      <BoardListWrapper>
        {boardData?.boards.map((board) => (
          <BoardItem key={board._id} boardInfo={board} className="board-item" />
        ))}
      </BoardListWrapper>
      {boardData?.maxPage ? (
        <Pagination maxPage={boardData.maxPage} pageNums={boardData.pageNums} />
      ) : null}
    </BoardListOuter>
  );
};

const BoardListOuter = styled.section`
  display: flex;
  flex-direction: column;
`;

const BoardListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export default BoardList;
