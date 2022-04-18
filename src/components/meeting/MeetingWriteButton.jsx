import React from 'react';
import styled from 'styled-components';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import * as meetingAPI from 'api/meeting';
import StyledButton from 'components/common/StyledButton';

const MeetingWriteButton = () => {
  const navigate = useNavigate();
  const meeting = useSelector(({ meeting }) => meeting);

  const mutation = useMutation(meetingAPI.createMeeting, {
    mutationKey: ['meeting'],
    onSuccess: () => {
      navigate('/meeting');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSubmit = () => {
    mutation.mutate(meeting);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <ButtonWrapper>
      <StyledButton onClick={handleSubmit} cherry responsive>
        작성
      </StyledButton>
      <StyledButton onClick={handleCancel} responsive>
        취소
      </StyledButton>
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 3rem;
  padding-bottom: 3rem;
`;

export default MeetingWriteButton;
