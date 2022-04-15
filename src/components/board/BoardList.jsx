import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { useNavigate, useSearchParams } from 'react-router-dom';

import * as boardAPI from 'api/board';
import BoardItem from 'components/board/BoardItem';
import Pagination from 'components/board/Pagination';

const BoardList = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  const query = {
    sort: searchParams.get('sort'),
    page: searchParams.get('page'),
  };

  const { data } = useQuery(
    ['boards', query],
    () => boardAPI.getBoards(query),
    {
      refetchOnWindowFocus: false,
      cacheTime: 0,
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
        <Pagination
          maxPage={data.maxPage}
          pageNums={data.pageNums}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
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
