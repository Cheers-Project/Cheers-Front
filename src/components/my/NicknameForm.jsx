import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import * as userAPI from 'api/user';
import * as myAPI from 'api/my';
import nicknameSchema from 'utils/validation/nicknameSchema';
import StyledInput from 'components/common/StyledInput';
import ErrorMessage from 'components/common/ErrorMessage';
import StyledButton from 'components/common/StyledButton';

const NicknameForm = () => {
  const [isClicked, setIsClicked] = useState(false);
  const queryClient = useQueryClient();

  const { data: userInfo } = useQuery(['user'], userAPI.fetchUser, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const { mutate, isError, error } = useMutation(myAPI.updateNickname, {
    mutationKey: ['my/nickname'],
    onSuccess: (data) => {
      const { accessToken } = data;

      queryClient.setQueryData(['user'], data);
      queryClient.invalidateQueries(['boards']);
      queryClient.invalidateQueries(['meeting']);
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

  const handeNicknameSubmit = (data) => {
    mutate(data);
  };

  const handleNicknameInputOpen = () => {
    setIsClicked(!isClicked);
  };

  const handleNicknameInputClose = () => {
    setIsClicked(false);
  };

  return (
    <NicknameWrapper>
      <form
        onSubmit={handleSubmit(handeNicknameSubmit)}
        className="nickname-title-form"
      >
        <div className="nickname-wrapper">
          <h3 className="nickname-title">닉네임</h3>
          {!isClicked && (
            <button
              onClick={handleNicknameInputOpen}
              className="nickname-fixed-btn"
            >
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
              <div className="btn-wrapper">
                <StyledButton cherry>변경</StyledButton>
                <StyledButton onClick={handleNicknameInputClose}>
                  취소
                </StyledButton>
              </div>
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
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: 600;
    @media screen and (min-width: 768px) {
      font-size: ${({ theme }) => theme.fontSize.smTitle};
    }
  }
  .nickname-fixed-btn {
    background-color: inherit;
    color: #db428e;
    font-size: ${({ theme }) => theme.fontSize.md};
    padding: 0 0 0.2rem 0;
    border-bottom: 1px solid #db428e;
  }
  .user-nickname {
    margin-top: 1.5rem;
    font-size: ${({ theme }) => theme.fontSize.md};
    display: flex;
    justify-content: space-between;
  }
  .nickname-input {
    flex: 1;
    margin-right: 1.5rem;
  }
  .btn-wrapper {
    display: flex;
    gap: 0.5rem;
  }
`;

export default NicknameForm;
