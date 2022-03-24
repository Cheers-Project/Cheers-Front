import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const RedirectPage = () => {
  const navigate = useNavigate();

  const code = new URL(window.location.href).searchParams.get('code');

  const getToken = async () => {
    const res = await axios.get(
      `http://localhost:4000/api/auth/kakao/callback?code=${code}`,
    );

    const { data } = res;

    if (data.accessToken) {
      localStorage.setItem('token', data.accessToken);
      navigate('/');
      return;
    } else {
      localStorage.setItem('kakaoToken', data.kakaoToken);
      navigate('/oauth/kakao');
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <RedirectWrapper>
      <div className="spinner">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>
    </RedirectWrapper>
  );
};

const RedirectWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .dot-wrapper {
  }

  .spinner {
    display: flex;
    gap: 2rem;
  }

  .spinner > div {
    width: 1.5rem;
    height: 1.5rem;
    background-color: #333;

    border-radius: 100%;
    display: inline-block;
    animation: bounce 1.2s infinite ease-in-out both;
  }

  .spinner .bounce1 {
    animation-delay: -0.32s;
  }

  .spinner .bounce2 {
    animation-delay: -0.16s;
  }

  @keyframes bounce {
    0%,
    80%,
    100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  }
`;

export default RedirectPage;
