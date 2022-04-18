import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import * as boardAPI from 'api/board';
import BoardItem from 'components/board/BoardItem';
import Pagination from 'components/board/Pagination';
import useCurrentQuery from 'hooks/useCurrentQuery';

const BoardList = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [query] = useCurrentQuery();

  const { data } = useQuery(
    ['boards', query],
    () => boardAPI.getBoards(query),
    {
      onError: () => {
        console.log(1);
        navigate(-1);
      },
      refetchOnWindowFocus: false,
      cacheTime: 0,
      retry: 0,
    },
  );

  const increaseView = useMutation(boardAPI.increaseView, {
    onSuccess: (data, id) => {
      queryClient.setQueryData(['board', id], data);
    },
  });

  const handleRouter = (e) => {
    if (e.target.id) {
      const id = e.target.id;
      increaseView.mutate(id);
      navigate(`/board/${id}`);
    }
  };

  return (
    <BoardListOuter>
      <BoardListWrapper onClick={handleRouter}>
        {data?.boards.map((board) => (
          <BoardItem key={board._id} boardInfo={board} className="board-item" />
        ))}
      </BoardListWrapper>
      {data?.maxPage && (
        <Pagination maxPage={data.maxPage} pageNums={data.pageNums} />
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
