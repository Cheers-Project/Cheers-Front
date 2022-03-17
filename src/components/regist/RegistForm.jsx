import React from 'react';
import styled from 'styled-components';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

const RegistForm = () => {
  return (
    <RegistFormWrapper>
      <form className="regist-form">
        <div className="input-container">
          <label className="over-text" htmlFor="idInput">
            아이디
          </label>
          <input
            id="idInput"
            className="regist-input"
            type="text"
            placeholder="아이디"
          />
        </div>
        <div className="input-container">
          <label className="over-text" htmlFor="nickNameInput">
            닉네임
          </label>
          <input
            id="nickNameInput"
            className="regist-input"
            type="text"
            placeholder="닉네임"
          />
        </div>
        <div className="input-container">
          <label className="over-text" htmlFor="pwInput">
            비밀번호
          </label>
          <div className="password-container">
            <input
              id="pwInput"
              className="regist-input"
              type="password"
              placeholder="비밀번호"
            />
            <button className="toggle-btn">
              <EyeOutlined />
            </button>
          </div>
        </div>
        <div className="input-container">
          <label className="over-text" htmlFor="pwConfirmInput">
            비밀번호 확인
          </label>
          <input
            id="pwConfirmInput"
            className="regist-input"
            type="password"
            placeholder="비밀번호 확인"
          />
        </div>
      </form>
      <button className="regist-btn">회원가입</button>
    </RegistFormWrapper>
  );
};

const RegistFormWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;

  .input-container {
    margin-top: 3rem;
  }

  .over-text {
    display: block;
    font-size: 1.4rem;
    margin-bottom: 0.8rem;
  }

  .regist-input {
    width: 100%;
    padding: 1rem 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
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

  .regist-btn {
    margin-top: 4rem;
    padding: 1rem;
    border-radius: 0.5rem;
    font-size: 1.5rem;
    letter-spacing: 0.1rem;
  }
`;

export default RegistForm;
