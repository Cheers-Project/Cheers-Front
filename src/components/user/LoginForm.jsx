import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useDispatch } from 'react-redux';
import { useMutation, useQueryClient } from 'react-query';

import kakaoIcon from 'assets/images/ico_kakao.png';
import StyledInput from 'components/common/StyledInput';
import loginSchema from 'utils/validation/loginSchema';
import { initializeModal, openUserModal } from 'redux/modules/modal';

import * as userAPI from 'api/user';

const LoginForm = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const [errMsg, setErrMsg] = useState('');

  const changeModal = () => {
    dispatch(openUserModal({ modal: 'registModal' }));
  };

  // 카카오 로그인 페이지 이동
  const {
    REACT_APP_KAKAO_API_KEY: KAKAO_API_KEY,
    REACT_APP_KAKAO_REDIRECT_URI: KAKAO_REDIRECT_URI,
  } = process.env;

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: joiResolver(loginSchema) });

  const mutation = useMutation(['user'], userAPI.login, {
    onSuccess: (data) => {
      const { accessToken, userInfo } = data;

      queryClient.setQueryData(['user'], userInfo);
      localStorage.setItem('accessToken', accessToken);
      dispatch(initializeModal());
    },
    onError: (error) => {
      setErrMsg(error.response.data.msg);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <LoginFormWrapper autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <div className="input-container">
        <label className="over-text" htmlFor="idInput">
          이메일(아이디)
        </label>
        <StyledInput
          {...register('userId')}
          id="idInput"
          name="userId"
          type="text"
          placeholder="아이디를 입력해 주세요."
          autoComplete="off"
        />
        <ErrorMessage>{errors.userId && '아이디를 확인해주세요'}</ErrorMessage>
      </div>
      <div className="input-container">
        <label className="over-text" htmlFor="pwInput">
          비밀번호
        </label>
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
      <ErrorMessage>{errMsg}</ErrorMessage>
      <a href={`${KAKAO_AUTH_URL}`} className="social-login-container">
        <img src={kakaoIcon} alt="icon" className="kakao-icon" />
        <p>카카오 로그인</p>
      </a>
      <div className="guide-container">
        <p>
          회원이 아니신가요?{' '}
          <button onClick={changeModal} errors={errors} className="regist-btn">
            회원 가입
          </button>
        </p>
      </div>
    </LoginFormWrapper>
  );
};

const LoginFormWrapper = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;

  .input-container {
    margin-top: 1rem;
    position: relative;
  }

  .over-text {
    display: block;
    font-size: 1.4rem;
    margin-bottom: 0.8rem;
  }

  .login-btn {
    width: 100%;
    margin-top: 1rem;
    padding: 1rem;
    border-radius: 0.5rem;
    font-size: 1.5rem;
    color: #fff;
    letter-spacing: 0.1rem;
    transition: 0.2s;
    background-color: #db428e;
    &:hover {
      background-color: #c22d77;
    }
  }

  .guide-container {
    width: 100%;
    text-align: center;
    margin-top: 2rem;
    font-size: 1.4rem;

    .regist-btn {
      text-decoration: underline;
      margin-left: 0.5rem;
      font-size: 1.4rem;
      background-color: inherit;
    }
  }

  .social-login-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffea27;
    border-radius: 0.5rem;
    font-size: 1.5rem;
    margin-top: 1rem;

    .kakao-icon {
      width: 4rem;
      margin-right: 0.5rem;
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

export default LoginForm;
