import React from 'react';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import AlarmModal from 'components/common/AlarmModal';
import * as meetingAPI from 'api/meeting';
import StyledButton from 'components/common/StyledButton';
import { toggleModal } from 'redux/modules/modal';

const DeleteMeetingAlarm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const removeMutation = useMutation(meetingAPI.removeMeeting, {
    mutationKey: ['meeting', id],
    onSuccess: () => {
      navigate(`/meeting?sort=recent`);
    },
  });

  const handleDeleteAlarmClose = () => {
    dispatch(toggleModal({ target: 'alarmModal', visible: false }));
  };

  const handleMeetingRemove = () => {
    removeMutation.mutate(id);
    handleDeleteAlarmClose();
  };

  return (
    <AlarmModal>
      <AlarmText className="notice-text">게시물을 삭제하시겠습니까?</AlarmText>
      <ButtonWrapper className="confirm-btn">
        <StyledButton cherry responsive onClick={handleMeetingRemove}>
          삭제
        </StyledButton>
        <StyledButton responsive onClick={handleDeleteAlarmClose}>
          취소
        </StyledButton>
      </ButtonWrapper>
    </AlarmModal>
  );
};

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-top: 2rem;
`;

const AlarmText = styled.p`
  width: 100%;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 600;
  text-align: center;
  padding-bottom: 2rem;
`;

export default DeleteMeetingAlarm;
