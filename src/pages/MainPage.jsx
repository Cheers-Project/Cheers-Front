import React, { useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';
import styled from 'styled-components';

import Header from 'components/common/Header';
import Footer from 'components/common/Footer';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();

  const code = new URL(window.location.href).searchParams.get('code');

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

          const res = await axios.post(
            'http://localhost:4000/api/user/login/kakao',
            {
              access_token,
            },
          );
          console.log(res);
        } catch (err) {
          console.log(err);
        }
      };
      getToken();
      navigate('/');
    }
  }, [code]);

  return (
    <MainTemplate>
      <Header />
      <div style={{ fontSize: '100px' }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga ullam
        modi, quae nemo quidem ratione est quisquam? Placeat, ab enim!
        Doloremque saepe adipisci id, unde commodi pariatur aliquam iste
        facilis!
      </div>
      <Footer />
    </MainTemplate>
  );
};

const MainTemplate = styled.div`
  width: 100%;
`;

export default MainPage;
