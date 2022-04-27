import React from 'react';
import styled from 'styled-components';
import { EyeFilled, LikeFilled, CommentOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import DateInfo from 'components/board/DateInfo';

const BoardItem = ({ boardInfo }) => {
  const navigate = useNavigate();

  const handleBoardDetailRoute = () => {
    const { _id: id } = boardInfo;
    navigate(`/board/${id}`);
  };

  return (
    <BoardItemWrapper onClick={handleBoardDetailRoute}>
      <ToptWrapper>
        <Title>{boardInfo.title}</Title>
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
      </ToptWrapper>
      <BottomWrapper>
        <UserInfo>
          <img
            className="user-profile-img"
            src={boardInfo.writer.profileImg}
            alt="user-profileImg"
          />
          <div>
            <p className="user-profile-nickname">{boardInfo.writer.nickname}</p>
          </div>
        </UserInfo>
        <DateInfo boardInfo={boardInfo} flex="flex-end" />
      </BottomWrapper>
    </BoardItemWrapper>
  );
};
const BoardItemWrapper = styled.li`
  margin: 0 1rem;
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.color.white};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  cursor: pointer;
`;

const ToptWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Title = styled.h2`
  width: 50%;
  font-size: ${({ theme }) => theme.fontSize.lg};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media screen and (min-width: 768px) {
    width: 70%;
    font-size: ${({ theme }) => theme.fontSize.mdTitle};
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
  .user-profile-img {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
  }
  .user-profile-nickname {
    font-size: ${({ theme }) => theme.fontSize.xsm};
    font-weight: 600;
    @media screen and (min-width: 768px) {
      font-size: ${({ theme }) => theme.fontSize.md};
    }
  }
`;

const BottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
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
