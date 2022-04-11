import React from 'react';
import styled from 'styled-components';
import { useMutation } from 'react-query';

import * as meetingAPI from 'api/meeting';
import StyledButton from 'components/common/StyledButton';
import { useSelector } from 'react-redux';

const MeetingWriteButton = () => {
  const meeting = useSelector(({ meeting }) => meeting);

  const mutation = useMutation(meetingAPI.createMeeting, {
    mutationKey: ['meeting'],
    onSuccess: () => {},
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSubmit = () => {
    mutation.mutate(meeting);
  };

  return (
    <ButtonWrapper>
      <StyledButton onClick={handleSubmit} color="cherry">
        작성
      </StyledButton>
      <StyledButton>취소</StyledButton>
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
