import React from 'react';
import styled, { css } from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { format } from 'date-fns';

import useMeetingQuery from 'hooks/useMeetingQuery';
import useOwnedQuery from 'hooks/useOwnedQuery';
import * as meetingAPI from 'api/meeting';
import MeetingMap from 'components/meeting/MeetingMap';
import StyledButton from 'components/common/StyledButton';
import CommentList from 'components/comment/CommentList';

const MeetingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { meetingInfo, isClosed, isSuccess } = useMeetingQuery();
  const { userId, isOwned } = useOwnedQuery(meetingInfo?.writer._id);

  const removeMutation = useMutation(meetingAPI.removeMeeting, {
    mutationKey: ['meeting', id],
    onSuccess: () => {
      navigate(`/meeting?sort=recent`);
    },
  });

  const editMutation = useMutation(meetingAPI.editMeeting, {
    mutationKey: ['meeting', id],
    onSuccess: (data, variables) => {
      const { id } = variables;
      queryClient.invalidateQueries(['meeting', id]);
      navigate(`/meeting/${id}`);
    },
  });

  const handleMeetingEditNavigate = () => {
    navigate(`/meeting/write/${id}`);
  };

  const handleMeetingRemove = () => {
    removeMutation.mutate(id);
  };

  const handleMeetingJoin = () => {
    const payload = {
      ...meetingInfo,
      attendMember: [...meetingInfo.attendMember, userId],
    };

    editMutation.mutate({ id, payload });
  };

  const handleMeetingCancel = () => {
    const payload = {
      ...meetingInfo,
      attendMember: meetingInfo.attendMember.filter((data) => data !== userId),
    };

    editMutation.mutate({ id, payload });
  };

  return (
    <section>
      {isSuccess && (
        <MeetingDetailWrapper>
          <MeetingTitleWrapper>
            <h2 className="meeting-title">{meetingInfo?.title}</h2>
            <div className="meeting-view">
              <p className="view-text">조회수</p>
              <div>{meetingInfo?.view}</div>
            </div>
          </MeetingTitleWrapper>
          <MeetingSubInfoWrapper>
            <div className="sub-info-inner">
              <img
                className="user-profile"
                src={meetingInfo?.writer.profileImg}
                alt="유저 프로필"
              />
              <div>
                <p className="user-nickname">{meetingInfo?.writer.nickname}</p>
                <div className="created-date">
                  {meetingInfo &&
                    format(new Date(meetingInfo.createdDate), 'yyyy-MM-dd')}
                </div>
              </div>
            </div>
            {isOwned && (
              <div className="setting-btn-wrapper">
                <button
                  onClick={handleMeetingEditNavigate}
                  className="setting-btn"
                >
                  수정
                </button>
                <button onClick={handleMeetingRemove} className="setting-btn">
                  삭제
                </button>
              </div>
            )}
          </MeetingSubInfoWrapper>
          <MeetingContentsWrapper>
            <div className="meeting-contents">{meetingInfo?.contents}</div>
          </MeetingContentsWrapper>
          <MeetingInfoWrapper>
            <div className="meeting-info">
              <span style={{ verticalAlign: 'center' }}>모임 장소 &#58;</span>
              <p>{meetingInfo?.location.placeName}</p>
            </div>
            <div className="meeting-info">
              <span>모임 날짜 &#58;</span>
              <p>{meetingInfo?.meetingDate}</p>
            </div>
            <div className="meeting-info">
              <span>모임 시간 &#58;</span>
              <p>{meetingInfo?.meetingTime}</p>
            </div>
            <div className="meeting-info">
              <span>모임 인원 &#58;</span>
              <p>{meetingInfo?.totalNumber}명</p>
            </div>
            <MeetingMap
              keyword={`${meetingInfo?.location.addressName} ${meetingInfo?.location.placeName}`}
            />
            {!isOwned && (
              <div className="join-btn-wrapper">
                {meetingInfo?.attendMember.includes(userId) ? (
                  <StyledButton onClick={handleMeetingCancel} responsive>
                    모임 취소 {meetingInfo?.attendMember.length} /{' '}
                    {meetingInfo?.totalNumber}
                  </StyledButton>
                ) : (
                  <JoinBtn
                    onClick={handleMeetingJoin}
                    isClosed={isClosed}
                    cherry
                    responsive
                  >
                    모임 참여 {meetingInfo?.attendMember.length} /{' '}
                    {meetingInfo?.totalNumber}
                  </JoinBtn>
                )}
              </div>
            )}
          </MeetingInfoWrapper>
          {meetingInfo?.attendMember.includes(userId) && <CommentList />}
        </MeetingDetailWrapper>
      )}
    </section>
  );
};

const MeetingDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin: 3rem 0;
  background-color: ${({ theme }) => theme.color.white};
`;

const MeetingTitleWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  .meeting-title {
    font-size: ${({ theme }) => theme.fontSize.lgTitle};
    font-weight: 600;
  }
  .meeting-view {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: ${({ theme }) => theme.fontSize.md};
    color: ${({ theme }) => theme.color.darkGray};
  }
`;

const MeetingSubInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  .sub-info-inner {
    display: flex;
    align-items: center;
    gap: 1rem;
    .user-profile {
      width: 4rem;
      height: 4rem;
      border-radius: 50%;
    }
    .user-nickname {
      font-size: ${({ theme }) => theme.fontSize.md};
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    .created-date {
      font-size: ${({ theme }) => theme.fontSize.md};
      color: ${({ theme }) => theme.color.darkGray};
    }
  }
  .setting-btn-wrapper {
    display: flex;
    justify-content: flex-end;
    gap: 2rem;
  }
  .setting-btn {
    display: flex;
    align-items: flex-end;
    font-size: ${({ theme }) => theme.fontSize.md};
    color: ${({ theme }) => theme.color.darkGray};
    transition: 0.5s;
    &:hover {
      color: ${({ theme }) => theme.color.darkCherry};
    }
  }
`;

const MeetingContentsWrapper = styled.div`
  .meeting-contents {
    font-size: ${({ theme }) => theme.fontSize.sm};
    line-height: 2rem;
  }
`;

const MeetingInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 600;
  flex: 1;
  .meeting-info {
    display: flex;
    gap: 1rem;
  }
  .join-btn-wrapper {
    display: flex;
    justify-content: flex-end;
  }
`;

const JoinBtn = styled(StyledButton)`
  ${({ isClosed }) =>
    isClosed &&
    css`
      display: none;
    `}
`;

export default MeetingDetail;
