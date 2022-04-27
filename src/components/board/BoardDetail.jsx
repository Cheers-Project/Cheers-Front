import React from 'react';
import styled from 'styled-components';

import useOwnedQuery from 'hooks/useOwnedQuery';
import useBoardQuery from 'hooks/useBoardQuery';
import BoardSubInfo from 'components/board/BoardSubInfo';
import BoardViewer from 'components/board/BoardViewer';
import BoardAction from './BoardAction';
import LikeBtn from './LikeBtn';

const BoardDetail = () => {
  const { boardInfo, isSuccess } = useBoardQuery('detail');
  const { isOwned, userId } = useOwnedQuery(boardInfo?.writer._id);

  return (
    <>
      {isSuccess && (
        <BoardDetailWrapper>
          <BoardInfoWrapper>
            <Title className="board-title">{boardInfo.title}</Title>
            {isOwned && <BoardAction boardInfo={boardInfo} />}
            <SubIntoWrapper>
              <BoardSubInfo boardInfo={boardInfo} />
              <View>
                <p>조회수</p>
                <div>{boardInfo.view}</div>
              </View>
            </SubIntoWrapper>
          </BoardInfoWrapper>
          <BoardViewer boardInfo={boardInfo} />
          <LikeBtn userId={userId} />
        </BoardDetailWrapper>
      )}
    </>
  );
};

const BoardDetailWrapper = styled.section`
  padding-top: 3rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const BoardInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 2rem;
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.lgTitle};
  font-weight: 600;
`;

const View = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.color.darkGray};
`;

const SubIntoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

export default BoardDetail;
