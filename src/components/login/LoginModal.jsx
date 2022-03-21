import React from 'react';
import styled from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import axios from 'axios';

import ModalWrapper from 'components/common/ModalWrapper';
import StyledInput from 'components/common/StyledInput';
import loginSchema from 'utils/validation/loginSchema';

const LoginModal = ({ modalState, handleModal }) => {
  // react-hook-form 사용
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: joiResolver(loginSchema) });

  const onSubmit = (data) => {
    console.log(data);
    console.log(errors);
    // login(data);
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
        <button className="close-btn modal">
          <CloseOutlined />
        </button>
        <h2>Lemon Alcohol</h2>
        <LoginForm autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <div className="login-info">
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
          </div>
          <div className="btn-box">
            <button type="submit" className="login-btn">
              로그인
            </button>
          </div>
        </LoginForm>
        <a href={`${KAKAO_AUTH_URL}`}>카카오 로그인</a>
      </ModalContentWrapper>
    </ModalWrapper>
  );
};

const ModalContentWrapper = styled.div`
  width: 500px;
  padding: 2rem;
  border-radius: 0.5rem;

  position: relative;

  background-color: #fff;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;

  .close-btn {
    background-color: #fff;
    color: #000;
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
  }

  h2 {
    font-size: 2rem;
  }

  h3 {
    font-size: 1.6rem;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: row;
  gap: 1rem;

  .login-info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .btn-box {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      font-size: 1.4rem;
    }
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
