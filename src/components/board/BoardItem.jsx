import React from 'react';
import styled from 'styled-components';
import { EyeFilled, LikeFilled, CommentOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import UserInfo from 'components/board/UserInfo';
import DateInfo from 'components/board/DateInfo';

const BoardItem = ({ boardInfo }) => {
  const navigate = useNavigate();

  const handleBoardDetailRoute = () => {
    const { _id: id } = boardInfo;
    navigate(`/board/${id}`);
  };

  return (
    <BoardItemWrapper onClick={handleBoardDetailRoute}>
      <LeftWrapper>
        <Title>{boardInfo.title}</Title>
        <UserInfo boardInfo={boardInfo} />
      </LeftWrapper>
      <RightWrapper>
        <BoardSubInfoWrapper>
          <div className="subinfo-item">
            <LikeFilled />
            <p>{boardInfo.like}</p>
          </div>
          <div className="subinfo-item">
            <EyeFilled />
            <p>{boardInfo.view}</p>
          </div>
          <div className="subinfo-item">
            <CommentOutlined />
            <p>{boardInfo.comment}</p>
          </div>
        </BoardSubInfoWrapper>
        <DateInfo boardInfo={boardInfo} flex="flex-end" />
      </RightWrapper>
    </BoardItemWrapper>
  );
};
const BoardItemWrapper = styled.li`
  padding: 1rem;
  background-color: ${({ theme }) => theme.color.white};
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const LeftWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media screen and (min-width: 768px) {
    width: 70%;
  }
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.lg};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media screen and (min-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize.mdTitle};
  }
`;

const RightWrapper = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media screen and (min-width: 768px) {
    width: 30%;
  }
`;

const BoardSubInfoWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  .subinfo-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    color: ${({ theme }) => theme.color.darkGray};
    font-size: ${({ theme }) => theme.fontSize.md};
    p {
      font-size: 1rem;
    }
  }
`;

export default React.memo(BoardItem);
