import React from 'react';

import RegistTemplate from 'components/regist/RegistTemplate';
import RegistForm from 'components/regist/RegistForm';
import Responsive from 'components/common/Responsive';

const RegistPage = () => {
  return (
    <Responsive>
      <RegistTemplate>
        <RegistForm />
      </RegistTemplate>
    </Responsive>
  );
};

export default RegistPage;
