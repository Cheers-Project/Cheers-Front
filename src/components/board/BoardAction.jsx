import useOwnedQuery from 'hooks/useOwnedQuery';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleModal } from 'redux/modules/modal';
import styled from 'styled-components';
import DeleteBoardAlarm from './DeleteBoardAlarm';

const BoardAction = ({ boardInfo }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alarmModal = useSelector(({ modal }) => modal.alarmModal);
  const { userId } = useOwnedQuery(boardInfo?.writer._id);

  const handleBoardUpdatePageRoute = () => {
    navigate(`/board/write/${boardInfo?._id}`);
  };

  const handleDeleteAlarmVisible = () => {
    dispatch(toggleModal({ target: 'alarmModal', visible: true }));
  };

  return (
    <>
      <BoardActionWrapper>
        <button className="btn" onClick={handleBoardUpdatePageRoute}>
          수정
        </button>
        <button className="btn" onClick={handleDeleteAlarmVisible}>
          삭제
        </button>
      </BoardActionWrapper>
      {alarmModal && userId && <DeleteBoardAlarm />}
    </>
  );
};
const BoardActionWrapper = styled.div`
  display: flex;
  gap: 1rem;
  .btn {
    color: ${({ theme }) => theme.color.darkGray};
    font-size: ${({ theme }) => theme.fontSize.md};
    transition: 0.2s;
    &:hover {
      color: ${({ theme }) => theme.color.lightCherry};
    }
  }
`;
export default BoardAction;
