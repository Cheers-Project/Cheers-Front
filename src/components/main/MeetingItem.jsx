import React from 'react';
import styled from 'styled-components';

const MeetingItem = ({ meeting }) => {
  return (
    <ItemWrapper>
      <h3 className="meeting-title ">{meeting.title}</h3>
      <div className="meeting-contents">{meeting.contents}</div>
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
    </ItemWrapper>
  );
};

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;

  .meeting-title {
    font-size: ${({ theme }) => theme.fontSize.lg};
    padding: 1rem 0;
  }
  .meeting-contents {
    font-size: ${({ theme }) => theme.fontSize.sm};
    flex: 1;
    width: 100%;
    height: 20rem;

    padding: 0;
    margin: 1rem 0;
    line-height: 2.06rem;

    word-break: break-word;
    overflow-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 10;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .meeting-location,
  .meeting-date,
  .meeting-member {
    padding: 1rem 0;
    font-size: ${({ theme }) => theme.fontSize.sm};
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .meeting-text {
    flex: 1;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export default MeetingItem;
