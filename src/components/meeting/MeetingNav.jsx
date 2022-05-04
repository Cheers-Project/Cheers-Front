import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import useCurrentLocation from 'hooks/useCurrentLocation';
import useCurrentQuery from 'hooks/useCurrentQuery';
import { toggleModal } from 'redux/modules/modal';
import StyledButton from 'components/common/StyledButton';
import Spinner from 'components/auth/Spinner';
import AlarmModal from 'components/common/AlarmModal';

const MeetingNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alarmModal = useSelector(({ modal }) => modal.alarmModal);
  const { location, error, loading } = useCurrentLocation();
  const { searchParams } = useCurrentQuery();

  const { sort } = searchParams;

  const handleLocationCheck = () => {
    if (!location || error || loading) {
      dispatch(toggleModal({ target: 'alarmModal', visible: true }));
      return false;
    }
    return true;
  };

  const handleNearbyMeetingNavigate = () => {
    const locationData = handleLocationCheck();

    if (locationData) {
      navigate(`/meeting?sort=near&lon=${location?.lon}&lat=${location?.lat}`);
    }
  };

  const handleModalClose = () => {
    dispatch(toggleModal({ target: 'alarmModal', visible: false }));
  };

  useEffect(() => {
    if (!loading && location) {
      dispatch(toggleModal({ target: 'alarmModal', visible: false }));
    }
  }, [location, loading, dispatch]);

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
            onClick={handleNearbyMeetingNavigate}
            className={sort === 'near' ? 'nav-link active' : 'nav-link'}
          >
            근처 모임
          </button>
        </li>
      </ul>
      {alarmModal && (
        <AlarmModal>
          <NoticeWrapper>
            {loading && (
              <>
                <p className="notice-text">위치 정보를 가져오는 중입니다.</p>
                <div className="loading-wrapper">
                  <Spinner small />
                </div>
              </>
            )}
            {error && (
              <>
                <p className="notice-text">위치 권한을 설정해주세요.</p>
                <StyledButton
                  onClick={handleModalClose}
                  className="confirm-btn"
                  cherry
                >
                  확인
                </StyledButton>
              </>
            )}
          </NoticeWrapper>
        </AlarmModal>
      )}
    </MeetingNavWrapper>
  );
};

const MeetingNavWrapper = styled.div`
  display: flex;
  padding: 3rem 0;
  margin-left: 1rem;

  .nav-list {
    display: flex;
    align-items: center;
    gap: 1rem;
    @media screen and (min-width: 768px) {
      gap: 2rem;
    }
  }
  .nav-item {
    display: flex;
    align-items: center;
  }
  .nav-link {
    all: unset;
    cursor: pointer;
    font-size: ${({ theme }) => theme.fontSize.sm};
    padding: 0.8rem;
    background-color: ${({ theme }) => theme.color.white};
    border-radius: 2rem;
    transition: 0.2s;
    &:hover {
      border-radius: 2rem;
      color: ${({ theme }) => theme.color.white};
      background-color: ${({ theme }) => theme.color.lightCherry};
    }
    @media screen and (min-width: 768px) {
      font-size: ${({ theme }) => theme.fontSize.md};
      padding: 1rem;
    }
  }
  .active {
    border-radius: 2rem;
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.color.lightCherry};
  }
`;

const NoticeWrapper = styled.div`
  display: flex;
  flex-direction: column;

  .notice-text {
    width: 100%;
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: 600;
    text-align: center;
    padding-bottom: 2rem;
  }
  .confirm-btn {
    align-self: flex-end;
    margin-top: 2rem;
  }
  .loading-wrapper {
    align-self: center;
    margin-top: 2rem;
  }
`;

export default MeetingNav;
