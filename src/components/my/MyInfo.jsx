import React from 'react';

import Avatar from 'components/my/Avatar';
import InfoTemplate from './InfoTemplate';
import NicknameForm from './NicknameForm';

const MyInfo = () => {
  return (
    <InfoTemplate>
      <Avatar />
      <NicknameForm />
    </InfoTemplate>
  );
};

export default MyInfo;
