import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import * as userAPI from 'api/user';

import Spinner from 'components/auth/Spinner';
import { useQuery, useQueryClient } from 'react-query';

const KakaoRedirect = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const code = new URL(window.location.href).searchParams.get('code');

  useQuery(
    ['kakaoCallback'],
    () => {
      return userAPI.kakaoCallback(code);
    },
    {
      onSuccess: (data) => {
        if (data.accessToken) {
          localStorage.setItem('accessToken', data.accessToken);

          queryClient.removeQueries('kakaoCallback');

          navigate('/');
        } else {
          navigate('/oauth/kakao');
        }
      },
      onError: (error) => {
        console.log(error);
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
