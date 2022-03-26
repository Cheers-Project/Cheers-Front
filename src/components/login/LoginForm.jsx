import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useDispatch, useSelector } from 'react-redux';

import StyledInput from 'components/common/StyledInput';
import loginSchema from 'utils/validation/loginSchema';
import { initializeError, login } from 'redux/modules/user';

const LoginForm = ({ setLoginModalState }) => {
  const dispatch = useDispatch();

  const errMsg = useSelector(({ user }) => {
    const { errMsg } = user;
    return errMsg;
  });

  useEffect(() => {
    dispatch(initializeError());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: joiResolver(loginSchema) });

  const onSubmit = async (data) => {
    await dispatch(login(data));
    if (errMsg) {
      setLoginModalState(false);
    }
  };

  return (
    <LoginFormWrapper autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <div className="input-container">
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
      <ErrorMessage>{errMsg && errMsg}</ErrorMessage>
    </LoginFormWrapper>
  );
};

const LoginFormWrapper = styled.form`
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

export default LoginForm;
