import React, { useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
import styled from 'styled-components';

import * as myAPI from 'api/my';
import BoardItem from 'components/board/BoardItem';
import useCurrentQuery from 'hooks/useCurrentQuery';
import useInterSectionObserver from 'hooks/useInterSectionObserver';

const MyBoard = () => {
  const { query } = useCurrentQuery();
  const target = useRef();

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['my/board', query],
    myAPI.fetchMyBoard,
    {
      getNextPageParam: (lastPage) => {
        return lastPage.isLastPage ? false : lastPage.nextPage;
      },
      refetchOnWindowFocus: false,
    },
  );

  useInterSectionObserver({
    target,
    handleIntersect: fetchNextPage,
    enabled: !!hasNextPage,
  });

  return (
    <MeetingSection>
      <ul className="board-list">
        {data?.pages.map((page) =>
          page.boardList.map((board) => {
            return <BoardItem boardInfo={board} key={board._id} />;
          }),
        )}
        <div ref={target}></div>
      </ul>
    </MeetingSection>
  );
};

const MeetingSection = styled.section`
  .board-list {
    padding-bottom: 3rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

export default MyBoard;
