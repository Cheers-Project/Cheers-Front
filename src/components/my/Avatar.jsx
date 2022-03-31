import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';
import { useQuery } from 'react-query';

import * as userAPI from 'api/user';

const Avatar = () => {
  const queryClient = useQueryClient();
  const { data: userInfo } = useQuery(['user'], userAPI.fetchUser, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const updateMutation = useMutation(['user'], userAPI.updateProfileImg, {
    onSuccess: (userInfo) => {
      queryClient.setQueryData(['user'], userInfo);
    },
    onError: (error) => {
      console.log('fail');
    },
  });

  const removeMutation = useMutation(['user'], userAPI.removeProfileImg, {
    onSuccess: (userInfo) => {
      queryClient.setQueryData(['user'], userInfo);
    },
    onError: (error) => {
      console.log('fail');
    },
  });

  const changeProfileImg = (e) => {
    if (!e.target.files[0]) return;

    const formData = convertToFormData(e.target.files[0]);
    updateMutation.mutate(formData);
  };

  const removeProfileImg = (e) => {
    e.preventDefault();
    removeMutation.mutate();
  };

  const convertToFormData = (file) => {
    const formData = new FormData();
    formData.append('profileImg', file);

    return formData;
  };

  return (
    <AvatarWrapper>
      <form className="profile-form">
        {userInfo ? (
          <img
            className="profile-image"
            src={userInfo?.userInfo.profileImg}
            alt="profile-img"
          />
        ) : (
          <UserOutlined className="profile-image" />
        )}
        <input
          onChange={changeProfileImg}
          id="profileImg"
          className="a11y-hidden"
          name="profileImg"
          type="file"
          accept="image/*"
        />
        <label htmlFor="profileImg" className="profile-img-btn">
          프로필 변경
        </label>
        <button onClick={removeProfileImg} className="profile-img-btn">
          프로필 제거
        </button>
      </form>
    </AvatarWrapper>
  );
};

const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 2rem;
  .profile-form {
    display: flex;
    flex-direction: column;
  }
  .profile-image {
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #eee;
    font-size: 3.5rem;
    border-radius: 50%;
    cursor: pointer;
  }
  .profile-img-btn {
    width: 100%;
    margin-top: 1rem;
    padding: 0.6rem 1rem;
    border-radius: 0.5rem;
    font-size: 1.5rem;
    color: #fff;
    letter-spacing: 0.1rem;
    transition: 0.2s;
    background-color: #db428e;
    &:hover {
      background-color: #c22d77;
    }
  }
`;

export default Avatar;
