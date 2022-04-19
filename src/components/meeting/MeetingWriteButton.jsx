import React from 'react';
import styled from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import * as meetingAPI from 'api/meeting';
import StyledButton from 'components/common/StyledButton';

const MeetingWriteButton = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const meeting = useSelector(({ meeting }) => meeting);
  const queryClient = useQueryClient();

  const postMutation = useMutation(meetingAPI.createMeeting, {
    mutationKey: ['meeting'],
    onSuccess: () => {
      navigate('/meeting?sort=recent');
    },
  });

  const editMutation = useMutation(meetingAPI.editMeeting, {
    mutationKey: ['meeting', id],
    onSuccess: (data, variables) => {
      const { id } = variables;

      queryClient.setQueryData(['meeting', id], data);
      navigate(`/meeting/${id}`);
    },
  });

  const handleSubmit = () => {
    if (id) {
      editMutation.mutate({ id, meeting });
      return;
    }
    postMutation.mutate(meeting);
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
