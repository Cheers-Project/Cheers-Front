import React, { useEffect, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const Avatar = ({ register }) => {
  const [profileImg, setProfileImg] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);

  const changeProfileImg = (e) => {
    setProfileImg(e.target.files[0]);
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

  return (
    <AvatarWrapper>
      <label htmlFor="profileImg">
        {previewImg ? (
          <img className="profile-image" src={previewImg} alt="profile-img" />
        ) : (
          <UserOutlined className="profile-image" />
        )}
      </label>
      <input
        {...register('profile')}
        onChange={changeProfileImg}
        id="profileImg"
        className="a11y-hidden"
        name="profileImg"
        type="file"
        accept="image/*"
      />
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
