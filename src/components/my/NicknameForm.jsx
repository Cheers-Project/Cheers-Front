import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import nicknameSchema from 'utils/validation/nicknameSchema';
import * as userAPI from 'api/user';
import StyledInput from 'components/common/StyledInput';
import ErrorMessage from 'components/common/ErrorMessage';

const NicknameForm = () => {
  const [isClicked, setIsClicked] = useState(false);
  const queryClient = useQueryClient();

  const { data: userInfo } = useQuery(['user'], userAPI.fetchUser, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const { mutate, isError, error } = useMutation(userAPI.updateUserInfo, {
    mutationKey: ['user'],
    onSuccess: (data) => {
      const { accessToken } = data;

      queryClient.setQueryData(['user'], data);
      localStorage.setItem('accessToken', accessToken);
      setIsClicked(false);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(nicknameSchema),
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  const handleOpen = (e) => {
    setIsClicked(!isClicked);
  };

  const handleCancle = (e) => {
    setIsClicked(false);
  };

  return (
    <NicknameWrapper>
      <form onSubmit={handleSubmit(onSubmit)} className="nickname-title-form">
        <div className="nickname-wrapper">
          <h3 className="nickname-title">닉네임</h3>
          {!isClicked && (
            <button onClick={handleOpen} className="nickname-fixed-btn">
              수정
            </button>
          )}
        </div>
        {isClicked ? (
          <>
            <div className="user-nickname">
              <label className="a11y-hidden" htmlFor="nicknameInput">
                닉네임
              </label>
              <StyledInput
                {...register('nickname', {
                  min: 2,
                  max: 10,
                  required: true,
                  type: String,
                })}
                id="nicknameInput"
                className="nickname-input"
                name="nickname"
                type="text"
                defaultValue={userInfo?.userInfo.nickname}
              />
              <button className="nickname-change-btn">변경</button>
              <button onClick={handleCancle} className="nickname-cancle-btn">
                취소
              </button>
            </div>
            <ErrorMessage>
              {isError && error.response.data.msg}
              {errors.nickname && '닉네임은 2~10 글자로 입력해주세요.'}
            </ErrorMessage>
          </>
        ) : (
          <div className="user-nickname">{userInfo?.userInfo.nickname}</div>
        )}
      </form>
    </NicknameWrapper>
  );
};

const NicknameWrapper = styled.div`
  padding: 3rem 0 0 0;
  width: 100%;
  @media screen and (min-width: 768px) {
    padding: 0 3rem 0 3rem;
  }
  .nickname-title-form {
    display: flex;
    flex-direction: column;
  }
  .nickname-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .nickname-title {
    font-size: 1.8rem;
    font-weight: 600;
    @media screen and (min-width: 768px) {
      font-size: 2rem;
    }
  }
  .nickname-fixed-btn {
    background-color: inherit;
    color: #db428e;
    font-size: 1.5rem;
    padding: 0 0 0.2rem 0;
    border-bottom: 1px solid #db428e;
  }
  .user-nickname {
    margin-top: 1.5rem;
    font-size: 1.5rem;
    display: flex;
    justify-content: space-between;
  }
  .nickname-input {
    margin-right: 1.5rem;
  }
  .nickname-change-btn {
    width: 8rem;
    font-size: 1.5rem;
    color: #fff;
    border-radius: 0.5rem;
    margin-right: 0.5rem;
    transition: 0.2s background-color;
    background-color: #db428e;
    &:hover {
      background-color: #c22d77;
    }
  }
  .nickname-cancle-btn {
    width: 8rem;
    font-size: 1.5rem;
    color: #fff;
    border-radius: 0.5rem;
    background-color: #ccc;
    transition: 0.2s background-color;
    &:hover {
      background-color: #aaa;
    }
  }
`;

export default NicknameForm;
