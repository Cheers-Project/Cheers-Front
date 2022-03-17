import React from 'react';
import styled from 'styled-components';

const MenuList = () => {
  return (
    <MenuListWrapper>
      <li>
        <Button>로그인</Button>
      </li>
      <li>
        <Button>회원가입</Button>
      </li>
      <li>
        <Button>마이메뉴</Button>
      </li>
    </MenuListWrapper>
  );
};

const MenuListWrapper = styled.ul`
  position: absolute;
  top: 2rem;
  right: -4rem;
  border: 1px solid #fff47d;
  li {
    width: 20rem;
    font-size: 4rem;
    background-color: #fff47d;
  }
`;

const Button = styled.button`
  background-color: #fff47d;
  padding: 1rem;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  letter-spacing: 0.1rem;
`;

export default MenuList;
