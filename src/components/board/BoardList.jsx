import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { useNavigate, useSearchParams } from 'react-router-dom';

import * as boardAPI from 'api/board';
import BoardItem from 'components/board/BoardItem';
import Pagination from 'components/board/Pagination';

const BoardList = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const query = {
    sort: searchParams.get('sort'),
    page: searchParams.get('page'),
  };

  const { data, isLoading, isError } = useQuery(
    ['boards', query],
    () => boardAPI.getBoards(query),
    {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  );

  const handleRouter = (e) => {
    if (e.target.id) {
      console.log(e.target);
      navigate(`/board/${e.target.id}`);
    }
  };

  return (
    <BoardListOuter>
      {isLoading && '로딩'}
      {isError && '에러'}
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
