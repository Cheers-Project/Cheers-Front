import React from 'react';

import UserTemplate from 'components/common/UserTemplate';
import RegistForm from 'components/regist/RegistForm';
import Responsive from 'components/common/Responsive';

const RegistPage = () => {
  return (
    <Responsive>
      <UserTemplate>
        <RegistForm />
      </UserTemplate>
    </Responsive>
  );
};

export default RegistPage;
