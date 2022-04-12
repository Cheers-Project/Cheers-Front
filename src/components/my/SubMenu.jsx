import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Link, Outlet } from 'react-router-dom';

const SubNavigation = () => {
  const { pathname } = useLocation();
  const nestingPath = pathname.split('/mypage')[1];

  return (
    <>
      <SubMenuWrapper>
        <div className="highlight-guide">
          <Link
            className={nestingPath ? 'sub-menu' : 'sub-menu active'}
            to="/mypage"
          >
            내 정보
          </Link>
          <Link
            className={
              nestingPath === '/board' ? 'sub-menu active' : 'sub-menu'
            }
            to="/mypage/board"
          >
            내 게시글
          </Link>
          <Link
            className={
              nestingPath === '/meeting' ? 'sub-menu active' : 'sub-menu'
            }
            to="/mypage/meeting"
          >
            내 모임
          </Link>
          <HighlightBar nestingPath={nestingPath} />
        </div>
      </SubMenuWrapper>
      <Outlet />
    </>
  );
};

const SubMenuWrapper = styled.div`
  padding: 3rem 0;
  display: flex;
  justify-content: center;
  .highlight-guide {
    position: relative;
  }
  .sub-menu {
    width: 8rem;
    height: 5rem;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: 600;
    letter-spacing: 0.1rem;
    color: #aaa;
    @media screen and (min-width: 768px) {
      width: 10rem;
      font-size: ${({ theme }) => theme.fontSize.lg};
    }
  }
  .active {
    color: #c22d77;
  }
`;

const HighlightBar = styled.div`
  width: 8rem;
  height: 0.2rem;
  transition: 0.3s all ease-in-out;
  position: absolute;
  left: ${({ nestingPath }) =>
    nestingPath ? (nestingPath === '/board' ? '33.3%' : '66.6%') : '0'};
  bottom: 0;
  background-color: #c22d77;
  @media screen and (min-width: 768px) {
    width: 10rem;
  }
`;

export default SubNavigation;
