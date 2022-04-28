import Outer from 'components/common/Outer';
import Responsive from 'components/common/Responsive';
import React from 'react';
import styled from 'styled-components';

const NotFoundPage = () => {
  return (
    <Outer>
      <Responsive>
        <NotFoundPageWrapper>Not Found 404</NotFoundPageWrapper>
      </Responsive>
    </Outer>
  );
};

const NotFoundPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export default NotFoundPage;
