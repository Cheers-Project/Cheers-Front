import React, { useEffect, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import * as userAPI from 'api/user';

const Avatar = ({ preview = null }) => {
  const [profileImg, setProfileImg] = useState(null);
  const [previewImg, setPreviewImg] = useState(preview);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation(
    (payload) => {
      userAPI.profile(payload);
    },
    {
      onSuccess: () => {},
      onError: (error) => {
        console.log(error);
      },
    },
  );

  const changeProfileImg = (e) => {
    console.log(e.target);
    setProfileImg(e.target.files[0]);
  };

  const convertToFormData = (data) => {
    const { profileImg } = data;

    const formData = new FormData();
    formData.append('profileImg', profileImg[0]);

    return formData;
  };

  useEffect(() => {
    const encodeFile = () => {
      if (!profileImg) return;
      const fileReader = new FileReader();

      fileReader.readAsDataURL(profileImg);
      fileReader.onload = () => {
        setPreviewImg(fileReader.result);
      };
    };

    encodeFile();
  }, [profileImg]);

  const onSubmit = (data) => {
    const formData = convertToFormData(data);
    mutation.mutate(formData);
  };

  return (
    <AvatarWrapper>
      <form onSubmit={handleSubmit(onSubmit)} className="profile-form">
        {/* <label htmlFor="profileImg"> */}
        {previewImg ? (
          <img className="profile-image" src={previewImg} alt="profile-img" />
        ) : (
          <UserOutlined className="profile-image" />
        )}
        {/* </label> */}
        <input
          {...register('profileImg')}
          onChange={changeProfileImg}
          id="profileImg"
          className="a11y-hidden"
          name="profileImg"
          type="file"
          accept="image/*"
        />
        <button>프로필 변경</button>
      </form>
    </AvatarWrapper>
  );
};

const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 2rem;
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
`;

export default Avatar;
