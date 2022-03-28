import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginFailure, loginSuccess } from 'redux/modules/user';
import * as userAPI from 'api/user';

import Spinner from './Spinner';

const KakaoRedirect = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const code = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    const getToken = async () => {
      const { data } = await userAPI.kakaoCallback(code);

      try {
        if (data.accessToken) {
          localStorage.setItem('accessToken', data.accessToken);
          dispatch(loginSuccess(data.accessToken));
          navigate('/');
          return;
        } else {
          localStorage.setItem('kakaoToken', data.kakaoToken);
          navigate('/oauth/kakao');
        }
      } catch (e) {
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
      <Spinner />
    </RedirectWrapper>
  );
};

const RedirectWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default KakaoRedirect;
