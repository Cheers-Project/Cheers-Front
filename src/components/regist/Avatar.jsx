import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const Avatar = () => {
  return (
    <AvatarWrapper>
      <label className="profile-image" htmlFor="profileImg">
        <UserOutlined />
      </label>
      <input
        id="profileImg"
        className="a11y-hidden"
        type="file"
        accept="image/*"
      />
    </AvatarWrapper>
  );
};

const AvatarWrapper = styled.div`
  .profile-image {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #eee;
    padding: 2.5rem;
    font-size: 3.5rem;
    border-radius: 50%;
    cursor: pointer;
  }
`;

export default Avatar;
