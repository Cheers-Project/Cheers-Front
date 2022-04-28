import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';

import * as boardAPI from 'api/board';
import AlarmModal from 'components/common/AlarmModal';
import StyledButton from 'components/common/StyledButton';
import { toggleModal } from 'redux/modules/modal';
import styled from 'styled-components';

const DeleteBoardAlarm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const deleteBoard = useMutation(boardAPI.deleteBoard, {
    onSuccess: () => {
      queryClient.invalidateQueries(['boards']);
      navigate('/board?sort=recent&page=1');
    },
  });

  const handleDeleteAlarmClose = () => {
    dispatch(toggleModal({ target: 'alarmModal', visible: false }));
  };

  const handleBoardDelete = () => {
    deleteBoard.mutate(id);
    handleDeleteAlarmClose();
  };
  return (
    <AlarmModal>
      <AlarmText className="notice-text">게시물을 삭제하시겠습니까?</AlarmText>
      <ButtonWrapper className="confirm-btn">
        <StyledButton cherry responsive onClick={handleBoardDelete}>
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

export default DeleteBoardAlarm;
