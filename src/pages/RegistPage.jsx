import React from 'react';

import Avatar from 'components/regist/Avatar';
import RegistForm from 'components/regist/RegistForm';
import RegistTemplate from 'components/regist/RegistTemplate';

const RegistPage = () => {
  return (
    <RegistTemplate>
      <Avatar />
      <RegistForm />
    </RegistTemplate>
  );
};

export default RegistPage;
