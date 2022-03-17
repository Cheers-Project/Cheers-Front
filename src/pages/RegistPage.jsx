import React from 'react';

import UserTemplate from 'components/common/UserTemplate';
import Avatar from 'components/regist/Avatar';
import RegistForm from 'components/regist/RegistForm';

const RegistPage = () => {
  return (
    <UserTemplate>
      <Avatar />
      <RegistForm />
    </UserTemplate>
  );
};

export default RegistPage;
