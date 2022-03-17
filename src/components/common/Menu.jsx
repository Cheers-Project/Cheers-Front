import React, { useState } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import MenuList from './MenuList';

const Menu = () => {
  const [menuState, setMenuState] = useState(false);

  const handleMenu = () => {
    setMenuState(!menuState);
  };

  return (
    <MenuWrapper>
      <MenuOutlined className="menu-icon" onClick={handleMenu} />
      {menuState && menuState ? <MenuList /> : ''}
    </MenuWrapper>
  );
};

const MenuWrapper = styled.nav`
  position: relative;
  display: block;

  @media (min-width: 768px) {
    padding: 2rem 6rem;
    display: none;
  }
  .menu-icon {
    font-size: 2rem;
    cursor: pointer;
  }
`;
export default Menu;
