import React from 'react';
import styled from 'styled-components';

const UserInfo = ({ boardInfo }) => {
  return (
    <UserInfoWrapper>
      <img
        className="user-profile-img"
        src={boardInfo.writer.profileImg}
        alt="user-profileImg"
      />
      <p className="user-profile-nickname">{boardInfo.writer.nickname}</p>
    </UserInfoWrapper>
  );
};

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
export default UserInfo;
