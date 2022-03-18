import React from 'react';
import styled from 'styled-components';

const Responsive = ({ children }) => {
  return <ResponsiveWrapper>{children}</ResponsiveWrapper>;
};

const ResponsiveWrapper = styled.div`
  width: 100%;
  padding: 0 2.5rem;
  margin: 0 auto;
  @media screen and (min-width: 768px) {
    max-width: 1024px;
    padding: 0 5rem;
  }

  @media screen and (min-width: 1024px) {
    max-width: 1280px;
    padding: 0 6rem;
  }
`;

export default Responsive;
