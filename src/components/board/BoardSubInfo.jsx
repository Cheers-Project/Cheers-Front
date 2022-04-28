import React from 'react';
import styled from 'styled-components';
import DateInfo from './DateInfo';

const BoardSubInfo = ({ boardInfo }) => {
  return (
    <UserInfoWrapper>
      <img
        className="user-profile-img"
        src={boardInfo.writer.profileImg}
        alt="user-profileImg"
      />
      <div>
        <p className="user-profile-nickname">{boardInfo.writer.nickname}</p>
        <DateInfo boardInfo={boardInfo} />
      </div>
    </UserInfoWrapper>
  );
};

const UserInfoWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  .user-profile-img {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
  }
  .user-profile-nickname {
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
`;
export default BoardSubInfo;
