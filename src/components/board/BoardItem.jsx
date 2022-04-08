import React from 'react';
import styled from 'styled-components';
import { EyeFilled, LikeFilled, CommentOutlined } from '@ant-design/icons';
import { format } from 'date-fns';

const BoardItem = ({ boardInfo }) => {
  const createdDate = format(new Date(boardInfo.createdDate), 'yyyy-MM-dd');

  format;

  return (
    <BoardItemWrapper>
      <LeftWrapper>
        <Title>{boardInfo.title}</Title>
        <UserInfoWrapper>
          <img
            className="user-profile-img"
            src={boardInfo.writer.profileImg}
            alt="user-profileImg"
          />
          <p className="user-profile-nickname">{boardInfo.writer.nickname}</p>
        </UserInfoWrapper>
      </LeftWrapper>

      <RightWrapper>
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
        <DateInfoWrapper>
          <p>{createdDate}</p>
        </DateInfoWrapper>
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

const DateInfoWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: ${({ theme }) => theme.fontSize.xsm};
  @media screen and (min-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize.md};
  }
`;

export default BoardItem;
