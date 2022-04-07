import React from 'react';
import styled from 'styled-components';
import { EyeFilled, LikeFilled, CommentOutlined } from '@ant-design/icons';

const BoardItem = ({ boardInfo }) => {
  const createdDate = new Date(boardInfo.createdDate);
  const year = createdDate.getFullYear();
  const month = createdDate.getMonth() + 1;
  const day = createdDate.getDate();

  return (
    <BoardItemWrapper>
      <LeftWrapper>
        <Title>{boardInfo.title}</Title>
        <UserInfoWrapper>
          <img className="user-profile-img" src={boardInfo.writer.profileImg} />
          <p className="user-profile-nickname">{boardInfo.writer.nickname}</p>
        </UserInfoWrapper>
      </LeftWrapper>

      <RightWrapper>
        <DateInfoWrapper>
          <p>{`${year}-${month}-${day}`}</p>
        </DateInfoWrapper>
        <BoardSubInfoWrapper>
          <div className="subinfo-item">
            <LikeFilled />
            <p>{boardInfo.like}</p>
          </div>
          <div className="subinfo-item">
            <EyeFilled />
            <p>{boardInfo.visit}</p>
          </div>
          <div className="subinfo-item">
            <CommentOutlined />
            <p>{boardInfo.comment}</p>
          </div>
        </BoardSubInfoWrapper>
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
`;

const LeftWrapper = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 2rem;
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

const UserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  .user-profile-img {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
  }
  .user-profile-nickname {
    /* font-size: ${({ theme }) => theme.fontSize.xsm}; */
    @media screen and (min-width: 768px) {
      font-size: ${({ theme }) => theme.fontSize.md};
    }
  }
`;

const RightWrapper = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DateInfoWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: ${({ theme }) => theme.fontSize.md};
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

export default BoardItem;
