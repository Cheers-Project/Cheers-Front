import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import * as userAPI from 'api/user';

import Spinner from 'components/auth/Spinner';
import { useQuery } from 'react-query';

const KakaoRedirect = () => {
  const navigate = useNavigate();

  const code = new URL(window.location.href).searchParams.get('code');

  useQuery(
    ['code', code],
    () => {
      return userAPI.kakaoCallback(code);
    },
    {
      onSuccess: (data) => {
        if (data.data.accessToken) {
          localStorage.setItem('accessToken', data.data.accessToken);
          navigate('/');
        } else {
          localStorage.setItem('kakaoToken', data.data.kakaoToken);
          navigate('/oauth/kakao');
        }
      },
      onError: () => {
        console.log('에러처리');
      },
    },
  );
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
