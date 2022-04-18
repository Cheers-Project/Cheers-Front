import React from 'react';
import styled from 'styled-components';
import { EyeFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import * as meetingAPI from 'api/meeting';
import useViewQuery from 'hooks/useViewQuery';

const MeetingItem = ({ meeting }) => {
  const navigate = useNavigate();
  const mutation = useViewQuery(meetingAPI.increaseView, 'meeting');

  const handleNavigate = () => {
    const { _id: id } = meeting;
    mutation.mutate(id);
    navigate(`/meeting/${id}`);
  };

  return (
    <MeetingItemOuter onClick={handleNavigate}>
      <MeetingItemInner>
        <h4 className="meeting-title ">{meeting.title}</h4>
        <p className="meeting-contents">{meeting.contents}</p>
        <div className="meeting-location">
          <span>모임 장소 &#58;</span>
          <p className="meeting-text">{meeting.location.placeName}</p>
        </div>
        <div className="meeting-date">
          <span>모임 날짜 &#58;</span>
          <p className="meeting-text">{meeting.meetingDate}</p>
        </div>
        <div className="meeting-member">
          <span>모임 인원 &#58;</span>
          <p className="meeting-text">
            {meeting.attendMember.length} / {meeting.totalNumber}
          </p>
        </div>
        <div className="meeting-sub-info">
          <div className="meeting-writer">
            <img
              className="meeting-user-profile"
              src={meeting.writer.profileImg}
              alt="유저 프로필"
            />
            <p className="meeting-text">{meeting.writer.nickname}</p>
          </div>
          <div className="meeting-view">
            <EyeFilled />
            <div>{meeting.view}</div>
          </div>
        </div>
      </MeetingItemInner>
    </MeetingItemOuter>
  );
};

const MeetingItemOuter = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 2px 2px 8px 1px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  margin: 0 1rem;
  padding: 0.5rem 1rem;
  cursor: pointer;

  @media screen and (min-width: 768px) {
    width: calc(50% - 3rem);
  }
  @media screen and (min-width: 1024px) {
    width: calc(33.333% - 4rem);
  }
`;

const MeetingItemInner = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1 1 0%;
  gap: 1rem;
  padding: 1rem 0;

  .meeting-title {
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: 600;
    max-height: 3.6rem;

    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.7rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    @media screen and (min-width: 768px) {
      font-size: ${({ theme }) => theme.fontSize.lg};
      line-height: 2.1rem;
      max-height: 4.4rem;
    }
  }
  .meeting-contents {
    font-size: ${({ theme }) => theme.fontSize.sm};
    width: 100%;
    height: 20rem;

    line-height: 2rem;
    display: -webkit-box;
    -webkit-line-clamp: 10;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .meeting-location,
  .meeting-date,
  .meeting-member,
  .meeting-writer {
    font-size: ${({ theme }) => theme.fontSize.sm};
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .meeting-sub-info {
    font-size: ${({ theme }) => theme.fontSize.sm};
    display: flex;
    justify-content: space-between;
  }

  .meeting-text {
    flex: 1;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .meeting-user-profile {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
  }

  .meeting-view {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: ${({ theme }) => theme.color.darkGray};
  }
`;

export default MeetingItem;
