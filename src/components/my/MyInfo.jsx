import React from 'react';

import Avatar from 'components/my/Avatar';
import InfoTemplate from 'components/my/InfoTemplate';
import NicknameForm from 'components/my/NicknameForm';

const MyInfo = () => {
  return (
    <InfoTemplate>
      <Avatar />
      <NicknameForm />
    </InfoTemplate>
  );
};

export default MyInfo;
