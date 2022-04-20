import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import useOwnedQuery from 'hooks/useOwnedQuery';
import UserInfo from 'components/board/UserInfo';
import DateInfo from 'components/board/DateInfo';
import DeleteBtn from 'components/board/DeleteBtn';
import LikeBtn from './LikeBtn';
import useBoardQuery from 'hooks/useBoardQuery';
import BoardViewer from './BoardViewer';
import CommentWriter from 'components/comment/CommentWriter';
import CommentList from 'components/comment/CommentList';

const BoardDetail = () => {
  const navigate = useNavigate();

  const userId = useOwnedQuery();
  const { boardInfo, isSuccess } = useBoardQuery('detail');

  const handleRoute = () => {
    navigate(`/board/write/${boardInfo?._id}`);
  };

  return (
    <>
      {isSuccess && (
        <BoardDetailWrapper>
          <BoardInfo>
            <TopBoardInfoWrapper>
              <Title className="board-title">{boardInfo.title}</Title>
              {userId && boardInfo.writer._id === userId ? (
                <UpdateWrapper>
                  <button onClick={handleRoute}>수정</button>
                  <DeleteBtn />
                </UpdateWrapper>
              ) : null}
            </TopBoardInfoWrapper>
            <BottomBoardInfoWrapper>
              <UserInfo boardInfo={boardInfo} />
              <SubInto>
                <ViewWrapper>조회수 {boardInfo.view}</ViewWrapper>
                <DateInfo boardInfo={boardInfo} />
              </SubInto>
            </BottomBoardInfoWrapper>
          </BoardInfo>
          <BoardViewer />
          <LikeBtn boardInfo={boardInfo} userId={userId} />
          <CommentWriter />
          <CommentList />
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

const UpdateWrapper = styled.div`
  display: flex;
  gap: 1rem;
  button {
    font-size: ${({ theme }) => theme.fontSize.md};
    transition: 0.2s;
    &:hover {
      color: ${({ theme }) => theme.color.lightCherry};
    }
  }
`;
export default BoardDetail;
