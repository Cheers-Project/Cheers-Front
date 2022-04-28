import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';

import * as userAPI from 'api/user';
import useCurrentQuery from 'hooks/useCurrentQuery';
import Spinner from 'components/auth/Spinner';

const KakaoRedirect = () => {
  const { searchParams } = useCurrentQuery();
  const { code } = searchParams;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
          localStorage.setItem('kakaoToken', data.kakaoToken);
          navigate('/oauth/kakao');
        }
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
