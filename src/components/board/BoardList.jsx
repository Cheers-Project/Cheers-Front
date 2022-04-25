import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import * as boardAPI from 'api/board';
import BoardItem from 'components/board/BoardItem';
import Pagination from 'components/board/Pagination';
import useCurrentQuery from 'hooks/useCurrentQuery';

const BoardList = () => {
  const navigate = useNavigate();
  const { query } = useCurrentQuery();

  const { data: BoardsData } = useQuery(
    ['boards', query],
    () => boardAPI.getBoards(query),
    {
      onError: () => {
        navigate(-1);
      },
      refetchOnWindowFocus: false,
      cacheTime: 0,
      retry: 0,
    },
  );

  return (
    <BoardListOuter>
      <BoardListWrapper>
        {BoardsData?.boards.map((board) => (
          <BoardItem key={board._id} boardInfo={board} className="board-item" />
        ))}
      </BoardListWrapper>
      {BoardsData?.maxPage && (
        <Pagination
          maxPage={BoardsData.maxPage}
          pageNums={BoardsData.pageNums}
        />
      )}
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
