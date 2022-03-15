import React, { useEffect } from 'react';

import axios from 'axios';
import qs from 'qs';

import useModal from 'hooks/useModal';

import LoginModal from 'components/common/LoginModal';

const { Kakao } = window;

const MainPage = () => {
  const [modalState, handleModal] = useModal();

  const code = new URL(window.location.href).searchParams.get('code');

  const REST_API_KEY = '8a1357737295493bd1458a6ea479f977';
  const REDIRECT_URI = 'http://localhost:3000/';
  const CLIENT_SECRET = 'LhKLJO5mywRKprh5U6eMP5N8t97olIWA';

  useEffect(() => {
    if (code) {
      const getToken = async () => {
        if (!Kakao.isInitialized()) {
          Kakao.init(REST_API_KEY);
        }
        const payload = qs.stringify({
          grant_type: 'authorization_code',
          client_id: REST_API_KEY,
          redirect_uri: REDIRECT_URI,
          code: code,
          client_secret: CLIENT_SECRET,
        });

        try {
          const {
            data: { access_token },
          } = await axios.post(`https://kauth.kakao.com/oauth/token`, payload, {
            headers: {
              'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
          });

          Kakao.Auth.setAccessToken(access_token);
          Kakao.API.request({
            url: '/v2/user/me',
            success: ({ kakao_account: { profile } }) => {
              const { nickname, profile_image_url } = profile;
              console.log(nickname, profile_image_url);
            },
            fail: (err) => {
              console.log(err);
            },
          });
        } catch (err) {
          console.log(err);
        }
      };
      getToken();
    }
  }, [code]);

  return (
    <div>
      <div>
        {modalState && (
          <LoginModal modalState={modalState} handleModal={handleModal} />
        )}
      </div>
      <button onClick={handleModal}>로그인</button>
    </div>
  );
};

export default MainPage;
