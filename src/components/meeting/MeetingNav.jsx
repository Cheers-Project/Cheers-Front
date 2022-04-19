import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import useCurrentLocation from 'hooks/useCurrentLocation';
import useCurrentQuery from 'hooks/useCurrentQuery';
import ModalWrapper from 'components/common/ModalWrapper';
import { toggleModal } from 'redux/modules/modal';
import StyledButton from 'components/common/StyledButton';

const MeetingNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { alarmModal } = useSelector(({ modal }) => modal);
  const { location, error } = useCurrentLocation();
  const { searchParams } = useCurrentQuery();
  const { sort } = searchParams;

  const handleNavigate = () => {
    if (!location || error) {
      dispatch(toggleModal({ target: 'alarmModal', visible: true }));
      return;
    }

    navigate(`/meeting?sort=near&lon=${location?.lon}&lat=${location?.lat}`);
  };

  const handleModal = () => {
    dispatch(toggleModal({ target: 'alarmModal', visible: false }));
  };

  return (
    <MeetingNavWrapper>
      <ul className="nav-list">
        <li className="nav-item">
          <Link
            to="/meeting?sort=recent"
            className={sort === 'recent' ? 'nav-link active' : 'nav-link'}
          >
            최신순
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/meeting?sort=view"
            className={sort === 'view' ? 'nav-link active' : 'nav-link'}
          >
            조회순
          </Link>
        </li>
        <li className="nav-item">
          <button
            onClick={handleNavigate}
            className={sort === 'near' ? 'nav-link active' : 'nav-link'}
          >
            근처 모임
          </button>
        </li>
      </ul>
      {alarmModal && (
        <ModalWrapper>
          <ModalContent>
            <div className="notice-wrapper">
              <p className="notice-text">위치 권한을 설정해주세요.</p>
              <StyledButton
                onClick={handleModal}
                className="confirm-btn"
                cherry
              >
                확인
              </StyledButton>
            </div>
          </ModalContent>
        </ModalWrapper>
      )}
    </MeetingNavWrapper>
  );
};

const MeetingNavWrapper = styled.div`
  display: flex;
  padding: 3rem 0;
  .nav-list {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
  .nav-item {
    display: flex;
    align-items: center;
  }
  .nav-link {
    font-size: ${({ theme }) => theme.fontSize.md};
    padding: 1rem;
    background-color: ${({ theme }) => theme.color.white};
    border-radius: 2rem;
    transition: 0.2s;
    &:hover {
      border-radius: 2rem;
      color: ${({ theme }) => theme.color.white};
      background-color: ${({ theme }) => theme.color.lightCherry};
    }
  }
  .active {
    border-radius: 2rem;
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.color.lightCherry};
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25rem;
  height: 16rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.color.white};
  .notice-wrapper {
    display: flex;
    flex-direction: column;
    gap: 5rem;
  }
  .notice-text {
    width: 100%;
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: 600;
    text-align: center;
  }
  .confirm-btn {
    align-self: flex-end;
  }
`;

export default MeetingNav;
