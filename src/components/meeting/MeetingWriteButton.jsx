import React from 'react';
import styled from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import * as meetingAPI from 'api/meeting';
import StyledButton from 'components/common/StyledButton';
import useError from 'hooks/useError';
import AlarmModal from 'components/common/AlarmModal';

const MeetingWriteButton = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const meeting = useSelector(({ meeting }) => meeting);
  const queryClient = useQueryClient();
  const { error, alarmModal, setError } = useError();

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

  const handleMeetingFormSubmit = () => {
    if (!meeting.title) {
      setError('제목을 입력해주세요');
      return;
    }

    if (!meeting.contents) {
      setError('내용을 입력해주세요');
      return;
    }

    if (!meeting.meetingTime) {
      setError('모임 시간을 선택해주세요');
      return;
    }

    if (!meeting.meetingDate) {
      setError('모임 날짜를 선택해주세요');
      return;
    }

    if (!meeting.location.placeName) {
      setError('모임 장소를 선택해주세요');
      return;
    }

    if (id) {
      editMutation.mutate({ id, meeting });
      return;
    }
    postMutation.mutate(meeting);
  };

  const handleMeetingFormCancel = () => {
    navigate(-1);
  };

  return (
    <ButtonWrapper>
      <StyledButton onClick={handleMeetingFormSubmit} cherry responsive>
        작성
      </StyledButton>
      <StyledButton onClick={handleMeetingFormCancel} responsive>
        취소
      </StyledButton>
      {error && (
        <AlarmModal>
          <NoticeWrapper>
            <p className="notice-text">{error}</p>
            <LoadingBar />
          </NoticeWrapper>
        </AlarmModal>
      )}
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 3rem;
  padding-bottom: 3rem;
`;

const NoticeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  .notice-text {
    width: 100%;
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: 600;
    text-align: center;
    padding-bottom: 2rem;
  }
`;

const LoadingBar = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.2rem;
  background-color: ${({ theme }) => theme.color.lightCherry};
  animation: fill 1s ease-in-out;
  @keyframes fill {
    from {
      width: 0%;
    }
    to {
      width: 100%;
    }
  }
`;

export default MeetingWriteButton;
