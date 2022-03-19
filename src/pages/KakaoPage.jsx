import React, { useEffect, useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import StyledInput from 'components/common/StyledInput';

const KakaoPage = () => {
  const navigate = useNavigate();

  const code = new URL(window.location.href).searchParams.get('code');
  const [token, setToken] = useState(null);
  const [nickname, setNickname] = useState(null);
  const [errMsg, setErrMsg] = useState(null);

  const changeNicnkName = (e) => {
    setNickname(e.target.value);
  };

  const handleContinueBtn = async () => {
    const paylaod = {
      accessToken: token,
      nickname,
    };
    try {
      const res = await axios.post(
        'http://localhost:4000/api/user/login/kakao',
        paylaod,
      );
      console.log(res);
      // navigate('/');
    } catch (err) {
      setErrMsg(err.response.data.msg);
    }
  };

  useEffect(() => {
    if (code) {
      const getToken = async () => {
        const {
          REACT_APP_KAKAO_API_KEY: KAKAO_API_KEY,
          REACT_APP_KAKAO_REDIRECT_URI: KAKAO_REDIRECT_URI,
          REACT_APP_KAKAO_CLIENT_SECRET: KAKAO_CLIENT_SECRET,
        } = process.env;
        const payload = qs.stringify({
          grant_type: 'authorization_code',
          client_id: KAKAO_API_KEY,
          redirect_uri: KAKAO_REDIRECT_URI,
          code: code,
          client_secret: KAKAO_CLIENT_SECRET,
        });

        try {
          const {
            data: { access_token },
          } = await axios.post(`https://kauth.kakao.com/oauth/token`, payload, {
            headers: {
              'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
          });

          setToken(access_token);
        } catch (err) {
          console.log(err);
        }
      };

      getToken();
      return getToken;
    }
  }, [code]);
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
