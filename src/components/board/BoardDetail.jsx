import React from 'react';
import styled from 'styled-components';

import useOwnedQuery from 'hooks/useOwnedQuery';
import useBoardQuery from 'hooks/useBoardQuery';
import UserInfo from 'components/board/UserInfo';
import DateInfo from 'components/board/DateInfo';
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
          <BoardInfo>
            <TopBoardInfoWrapper>
              <Title className="board-title">{boardInfo.title}</Title>
              {isOwned && <BoardAction boardInfo={boardInfo} />}
            </TopBoardInfoWrapper>
            <BottomBoardInfoWrapper>
              <UserInfo boardInfo={boardInfo} />
              <SubInto>
                <ViewWrapper>조회수 {boardInfo.view}</ViewWrapper>
                <DateInfo boardInfo={boardInfo} />
              </SubInto>
            </BottomBoardInfoWrapper>
          </BoardInfo>
          <BoardViewer boardInfo={boardInfo} />
          <LikeBtn userId={userId} />
        </BoardDetailWrapper>
      )}
    </>
  );
};

const BoardDetailWrapper = styled.section`
  display: flex;
  flex-direction: column;
  padding: 2rem 0;
`;

const BoardInfo = styled.div`
  padding: 2rem 1rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  background-color: ${({ theme }) => theme.color.white};
`;

const TopBoardInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  padding: 1rem 0;
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.lgTitle};
  font-weight: 600;
`;

const BottomBoardInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
`;

const ViewWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SubInto = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  color: ${({ theme }) => theme.color.darkGray};
  font-size: ${({ theme }) => theme.fontSize.xsm};
  @media screen and (min-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize.md};
  }
`;

export default BoardDetail;
