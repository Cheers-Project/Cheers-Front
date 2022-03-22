import React from 'react';
import styled from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import axios from 'axios';
import { Link } from 'react-router-dom';

import ModalWrapper from 'components/common/ModalWrapper';
import StyledInput from 'components/common/StyledInput';
import loginSchema from 'utils/validation/loginSchema';
import kakaoIcon from 'assets/images/ico_kakao.png';

const LoginModal = ({ modalState, handleModal }) => {
  // react-hook-form 사용
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: joiResolver(loginSchema) });

  const onSubmit = (data) => {
    login(data);
  };

  const login = async (payload) => {
    try {
      const res = await axios.post(
        'http://localhost:4000/api/user/login',
        payload,
      );
      console.log(res);
    } catch (e) {
      console.log(e.response);
    }
  };

  // 카카오 로그인 페이지 이동
  const {
    REACT_APP_KAKAO_API_KEY: KAKAO_API_KEY,
    REACT_APP_KAKAO_REDIRECT_URI: KAKAO_REDIRECT_URI,
  } = process.env;

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

  return (
    <ModalWrapper handleModal={handleModal}>
      <ModalContentWrapper modalState={modalState}>
        <CloseOutlined className="close-btn modal" />

        <h2>로그인</h2>

        <LoginForm autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-container">
            <StyledInput
              {...register('userId')}
              id="idInput"
              name="userId"
              type="text"
              placeholder="아이디를 입력해 주세요."
              autoComplete="off"
            />
            <ErrorMessage>
              {errors.userId && '아이디를 확인해주세요'}
            </ErrorMessage>
          </div>
          <div className="input-container">
            <StyledInput
              {...register('userPw')}
              id="pwInput"
              name="userPw"
              type="password"
              placeholder="비밀번호를 입력해 주세요."
              autoComplete="off"
            />
            <ErrorMessage>
              {errors.userPw && '비밀번호를 입력해주세요'}
            </ErrorMessage>
          </div>
          <button type="submit" className="login-btn">
            로그인
          </button>
        </LoginForm>

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

const LoginForm = styled.form`
  width: 80%;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;

  .input-container {
    width: 100%;
  }

  .login-btn {
    width: 100%;
    padding: 1rem;
    border-radius: 0.5rem;
    font-size: 1.5rem;
    letter-spacing: 0.1rem;
  }
`;

const ErrorMessage = styled.p`
  display: block;
  height: 2rem;
  padding-top: 0.5rem;
  color: red;
  line-height: 1.1rem;
`;
export default LoginModal;
