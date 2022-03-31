import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import Avatar from 'components/my/Avatar';
import * as userAPI from 'api/user';

const MyInfo = () => {
  const { data: userInfo } = useQuery(['user'], userAPI.fetchUser, {
    refetchOnWindowFocus: false,
    // staleTime: Infinity,
  });

  console.log(userInfo);

  return (
    <InfoWrapper>
      <Avatar preview={userInfo?.profileImg} />
    </InfoWrapper>
  );
};

const InfoWrapper = styled.div`
  .profile-change-btn {
    width: 100%;
    margin-top: 1rem;
    padding: 0.6rem 1rem;
    border-radius: 0.5rem;
    font-size: 1.5rem;
    color: #fff;
    letter-spacing: 0.1rem;
    transition: 0.2s;
    background-color: #db428e;
    &:hover {
      background-color: #c22d77;
    }
  }
`;

export default MyInfo;
