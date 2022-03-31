import React, { useState } from 'react';
import styled from 'styled-components';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import * as userAPI from 'api/user';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';

import StyledInput from 'components/common/StyledInput';
import registSchema from 'utils/validation/registSchema';
import { openUserModal } from 'redux/modules/modal';

const RegistForm = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const mutation = useMutation(
    (payload) => {
      userAPI.regist(payload);
    },
    {
      onSuccess: () => {
        changeModal();
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: joiResolver(registSchema) });

  const changeModal = () => {
    dispatch(openUserModal({ modal: 'loginModal' }));
  };

  const handleVisible = () => {
    setVisible(!visible);
  };

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <RegistFormWrapper autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <div className="input-container">
        <label className="over-text" htmlFor="idInput">
          이메일(아이디)
        </label>
        <StyledInput
          {...register('userId')}
          id="idInput"
          className="regist-input"
          name="userId"
          type="text"
          placeholder="이메일"
        />
        <ErrorMessage>
          {errors.userId && '이메일 형식의 아이디를 입력해주세요.'}
        </ErrorMessage>
      </div>
      <div className="input-container">
        <label className="over-text" htmlFor="nickNameInput">
          닉네임
        </label>
        <StyledInput
          {...register('nickname')}
          id="nickNameInput"
          className="regist-input"
          name="nickname"
          type="text"
          placeholder="닉네임"
        />
        <ErrorMessage>
          {errors.nickname && '닉네임은 2~10 글자로 입력해주세요.'}
        </ErrorMessage>
      </div>
      <div className="input-container">
        <label className="over-text" htmlFor="pwInput">
          비밀번호
        </label>
        <div className="password-container">
          <StyledInput
            style={{ position: 'relative' }}
            {...register('userPw')}
            id="pwInput"
            className="regist-input"
            name="userPw"
            type={visible ? 'text' : 'password'}
            placeholder="비밀번호"
          />
          <button onClick={handleVisible} className="toggle-btn">
            {visible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
          </button>
        </div>
        <ErrorMessage>
          {errors.userPw &&
            '비밀번호는 숫자, 영문, 특수문자 1자 이상 조합으로 8~20자로 입력해주세요.'}
        </ErrorMessage>
      </div>
      <div className="input-container">
        <label className="over-text" htmlFor="repeatPw">
          비밀번호 확인
        </label>
        <StyledInput
          {...register('repeatPw')}
          id="repeatPw"
          className="regist-input"
          name="repeatPw"
          type="password"
          placeholder="비밀번호 확인"
        />
        <ErrorMessage>
          {errors.repeatPw && '비밀번호를 확인해주세요.'}
        </ErrorMessage>
      </div>
      <button className="regist-btn">회원가입</button>
      <ErrorMessage></ErrorMessage>
      <div className="guide-container">
        <p>
          계정이 있으신가요?{' '}
          <button onClick={changeModal} className="login-btn">
            로그인
          </button>
        </p>
      </div>
    </RegistFormWrapper>
  );
};

const RegistFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;

  .input-container {
    margin-top: 1rem;
    position: relative;
  }

  .over-text {
    display: block;
    font-size: 1.4rem;
    margin-bottom: 0.8rem;
  }

  .regist-btn {
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
    margin-top: 1rem;
    font-size: 1.4rem;

    .login-btn {
      text-decoration: underline;
      margin-left: 0.5rem;
      font-size: 1.4rem;
      background-color: inherit;
    }
  }

  .password-container {
    position: relative;
  }

  .toggle-btn {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    font-size: 1.6rem;
    color: #ccc;
    background-color: inherit;
  }
`;

const ErrorMessage = styled.p`
  display: block;
  height: 2rem;
  padding-top: 0.5rem;
  color: red;
  line-height: 1.1rem;
`;

export default RegistForm;
