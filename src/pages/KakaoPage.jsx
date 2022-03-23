import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import StyledInput from 'components/common/StyledInput';

const KakaoPage = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState(null);
  const [errMsg, setErrMsg] = useState(null);

  const changeNicnkName = (e) => {
    setNickname(e.target.value);
  };

  const getCookie = (name) => {
    const value = '; ' + document.cookie;

    const parts = value.split('; ' + name + '=');

    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
  };

  const handleContinueBtn = async () => {
    const kakaoToken = getCookie('kakaoToken');

    const paylaod = {
      kakaoToken,
      nickname,
    };
    try {
      const res = await axios.post(
        'http://localhost:4000/api/user/login/kakao',
        paylaod,
      );
      console.log(res);

      navigate('/');
    } catch (err) {
      setErrMsg(err.response.data.msg);
    }
  };

  return (
    <KakaoLoginPageWrapper>
      <h2>카카오 로그인</h2>
      <h3>닉네임을 입력해 주세요</h3>
      <div className="input-container">
        <StyledInput
          id="nickNameInput"
          name="nickname"
          type="text"
          placeholder="닉네임"
          autoComplete="off"
          onChange={changeNicnkName}
        />
        <ErrorMessage>{errMsg && errMsg}</ErrorMessage>
      </div>
      <button className="continue-btn" onClick={handleContinueBtn}>
        계속하기
      </button>
    </KakaoLoginPageWrapper>
  );
};

const KakaoLoginPageWrapper = styled.div`
  height: 100vh;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
  h2 {
    font-size: 3rem;
    font-weight: 600;
  }
  h3 {
    font-size: 2.4rem;
  }
  .continue-btn {
    background-color: #fff47d;
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
export default KakaoPage;
