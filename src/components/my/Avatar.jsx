import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';
import { useQuery } from 'react-query';

import * as userAPI from 'api/user';
import * as myAPI from 'api/my';

const Avatar = () => {
  const queryClient = useQueryClient();
  const { data: userInfo } = useQuery(['user'], userAPI.fetchUser, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const updateMutation = useMutation(myAPI.updateProfileImg, {
    mutationKey: ['my/profile'],
    onSuccess: (userInfo) => {
      queryClient.setQueryData(['user'], userInfo);
      queryClient.invalidateQueries(['boards']);
    },
  });

  const removeMutation = useMutation(myAPI.removeProfileImg, {
    mutationKey: ['my/profile'],
    onSuccess: (userInfo) => {
      queryClient.setQueryData(['user'], userInfo);
      queryClient.invalidateQueries(['boards']);
    },
  });

  const handleProfileImageChange = (e) => {
    if (!e.target.files[0]) return;

    const formData = handleConvertToFormData(e.target.files[0]);
    updateMutation.mutate(formData);
  };

  const handleProfileImageRemove = (e) => {
    e.preventDefault();
    removeMutation.mutate();
  };

  const handleConvertToFormData = (file) => {
    const formData = new FormData();
    formData.append('profileImg', file);

    return formData;
  };

  return (
    <>
      <AvatarForm className="profile-form">
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
          onChange={handleProfileImageChange}
          id="profileImg"
          className="a11y-hidden"
          name="profileImg"
          type="file"
          accept="image/*"
        />
        <label htmlFor="profileImg" className="profile-img-btn change-btn">
          프로필 변경
        </label>
        <button
          onClick={handleProfileImageRemove}
          className="profile-img-btn remove-btn"
        >
          프로필 제거
        </button>
      </AvatarForm>
    </>
  );
};

const AvatarForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0 3rem 0;
  border-bottom: 1px solid #e4e4e4;
  @media screen and (min-width: 768px) {
    padding: 0 3rem 0 0;
    border-bottom: none;
    border-right: 1px solid #e4e4e4;
  }

  .profile-image {
    width: 12rem;
    height: 12rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3.5rem;
    border-radius: 50%;
    cursor: pointer;
  }
  .profile-img-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 12rem;
    height: 3.5rem;
    margin-top: 2rem;
    padding: 0.6rem 1rem;
    border-radius: 0.5rem;
    font-size: ${({ theme }) => theme.fontSize.md};
    color: #fff;
    letter-spacing: 0.1rem;
    transition: 0.2s;
  }

  .change-btn {
    cursor: pointer;

    background-color: #db428e;
    &:hover {
      background-color: #c22d77;
    }
  }
  .remove-btn {
    background-color: #ccc;
    &:hover {
      background-color: #aaa;
    }
  }
`;

export default Avatar;
