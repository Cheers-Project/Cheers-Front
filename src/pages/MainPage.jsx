import React, { useEffect } from 'react';

import axios from 'axios';
import qs from 'qs';

import Header from 'components/common/Header';
import Footer from 'components/common/Footer';

const { Kakao } = window;

const MainPage = () => {
  const code = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    const {
      REACT_APP_KAKAO_API_KEY: KAKAO_API_KEY,
      REACT_APP_REDIRECT_URI: REDIRECT_URI,
      REACT_APP_CLIENT_SECRET: CLIENT_SECRET,
    } = process.env;

    if (code) {
      const getToken = async () => {
        if (!Kakao.isInitialized()) {
          Kakao.init(KAKAO_API_KEY);
        }
        const payload = qs.stringify({
          grant_type: 'authorization_code',
          client_id: KAKAO_API_KEY,
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
    <>
      <Header />
      <div style={{ fontSize: '100px' }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga ullam
        modi, quae nemo quidem ratione est quisquam? Placeat, ab enim!
        Doloremque saepe adipisci id, unde commodi pariatur aliquam iste
        facilis!
      </div>
      <Footer />
    </>
  );
};

export default MainPage;
