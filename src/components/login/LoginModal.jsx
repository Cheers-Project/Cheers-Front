import React from 'react';
import styled from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';

import { Link } from 'react-router-dom';

import ModalWrapper from 'components/common/ModalWrapper';

import kakaoIcon from 'assets/images/ico_kakao.png';
import LoginForm from './LoginForm';

const LoginModal = ({
  loginModalState,
  handleLoginModal,
  setLoginModalState,
}) => {
  // 카카오 로그인 페이지 이동
  const {
    REACT_APP_KAKAO_API_KEY: KAKAO_API_KEY,
    REACT_APP_KAKAO_REDIRECT_URI: KAKAO_REDIRECT_URI,
  } = process.env;

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

  return (
    <ModalWrapper handleLoginModal={handleLoginModal}>
      <ModalContentWrapper loginModalState={loginModalState}>
        <CloseOutlined className="close-btn modal" />
        <h2>로그인</h2>
        <LoginForm setLoginModalState={setLoginModalState} />
        <div className="guide-container">
          <p>
            회원이 아니신가요?{' '}
            <Link to="/regist" className="regist-btn">
              회원 가입
            </Link>
          </p>
        </div>
        <a href={`${KAKAO_AUTH_URL}`} className="social-login-container">
          <img src={kakaoIcon} alt="icon" className="kakao-icon" />
          <p>카카오 로그인</p>
        </a>
      </ModalContentWrapper>
    </ModalWrapper>
  );
};

const ModalContentWrapper = styled.div`
  width: 400px;
  padding: 2rem;
  border-radius: 0.5rem;

  position: relative;

  background-color: #fff;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }

  .close-btn {
    font-size: 1.4rem;
    background-color: #fff;
    color: #000;
    position: absolute;
    top: 1rem;
    right: 1rem;
    cursor: pointer;
    * {
      pointer-events: none;
    }
  }

  h2 {
    font-size: 2rem;
  }

  .guide-container {
    margin-top: 2rem;
    p {
      font-size: 1.4rem;
    }
    .regist-btn {
      text-decoration: underline;
      margin-left: 0.5rem;
    }
  }

  .social-login-container {
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffea27;
    border-radius: 0.5rem;
    margin-top: 2rem;
    .kakao-icon {
      width: 4rem;
      margin-right: 0.5rem;
    }
    p {
      font-size: 1.5rem;
    }
  }

  @media (max-width: 768px) {
    width: 400px;
  }
`;

export default LoginModal;
