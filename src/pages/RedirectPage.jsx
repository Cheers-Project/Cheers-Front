import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { loginFailure, loginSuccess } from 'redux/modules/user';

import * as userAPI from 'api/user';

const RedirectPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const code = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    const getToken = async () => {
      const { data } = await userAPI.kakaoCallback(code);

      try {
        if (data.accessToken) {
          localStorage.setItem('accessToken', data.accessToken);
          // 성공
          dispatch(loginSuccess(data.accessToken));
          navigate('/');
          return;
        } else {
          localStorage.setItem('kakaoToken', data.kakaoToken);
          navigate('/oauth/kakao');
        }
      } catch (e) {
        // 실패
        const errInfo = {
          errMsg: data.msg,
          e,
        };
        dispatch(loginFailure(errInfo));
      }
    };
    getToken();
  }, [code, dispatch, navigate]);

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
