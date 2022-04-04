import React from 'react';
import styled from 'styled-components';

const InfoTemplate = ({ children }) => {
  return (
    <main>
      <InfoWrapper>{children}</InfoWrapper>
    </main>
  );
};

const InfoWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3rem 0;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    padding: 3rem 5rem;
  }
  @media screen and (min-width: 1024px) {
    padding: 3rem 10rem;
  }
`;

export default InfoTemplate;
