import React, { useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
import styled from 'styled-components';

import * as myAPI from 'api/my';
import BoardItem from 'components/board/BoardItem';
import useCurrentQuery from 'hooks/useCurrentQuery';
import useInterSectionObserver from 'hooks/useInterSectionObserver';
import StyledButton from 'components/common/StyledButton';

const MyBoard = () => {
  const { query } = useCurrentQuery();
  const target = useRef();

  const { data, fetchNextPage, hasNextPage, isSuccess } = useInfiniteQuery(
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
    <>
      {isSuccess && (
        <BoardSection>
          {data?.pages[0].boardList.length ? (
            <ul className="board-list">
              {data.pages.map((page) =>
                page.boardList.map((board) => {
                  return <BoardItem boardInfo={board} key={board._id} />;
                }),
              )}
              <div ref={target}></div>
            </ul>
          ) : (
            <EmptyMeeting>
              <p className="empty-text">아직 작성한 게시물이 없습니다.</p>
              <div className="write-btn-wrapper">
                <StyledButton to="/board/write" cherry responsive>
                  게시물 작성
                </StyledButton>
              </div>
            </EmptyMeeting>
          )}
        </BoardSection>
      )}
    </>
  );
};

const BoardSection = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  .board-list {
    padding-bottom: 3rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const EmptyMeeting = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .empty-text {
    font-size: ${({ theme }) => theme.fontSize.lg};
  }
  .write-btn-wrapper {
    margin: 5rem 0;
    display: flex;
    justify-content: center;
  }
`;

export default MyBoard;
