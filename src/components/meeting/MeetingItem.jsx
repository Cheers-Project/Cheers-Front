import React from 'react';
import styled from 'styled-components';
import { EyeFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const MeetingItem = ({ meeting }) => {
  const navigate = useNavigate();

  const handleMeetingDetailNavigate = () => {
    const { _id: id } = meeting;
    navigate(`/meeting/${id}`);
  };

  return (
    <MeetingItemInner onClick={handleMeetingDetailNavigate}>
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
  );
};

const MeetingItemInner = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1 1 0%;
  gap: 1rem;
  padding: 1.5rem 1rem;

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
    height: 18rem;
    line-height: 2rem;
    display: -webkit-box;
    -webkit-line-clamp: 9;
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
  }

  .meeting-sub-info {
    font-size: ${({ theme }) => theme.fontSize.sm};
    display: flex;
    justify-content: space-between;
  }

  .meeting-text {
    display: flex;
    align-items: center;
    flex: 1;
    padding-left: 1rem;
    width: 100%;
    line-height: 2rem;
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

export default React.memo(MeetingItem);
