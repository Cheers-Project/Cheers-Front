import React from 'react';
import styled from 'styled-components';

const UserTemplate = ({ children }) => {
  return <UserWrapper>{children}</UserWrapper>;
};

const UserWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 768px) {
    width: 45rem;
    margin: 0 auto;
  }
`;

export default UserTemplate;
