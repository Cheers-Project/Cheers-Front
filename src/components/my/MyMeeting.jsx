import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';

import * as myAPI from 'api/my';
import MeetingItem from 'components/meeting/MeetingItem';
import StyledButton from 'components/common/StyledButton';

const MyMeeting = () => {
  const { data: meetingList, isSuccess } = useQuery(
    ['my/meeting'],
    myAPI.fetchMyMeeting,
    {
      refetchOnWindowFocus: false,
    },
  );

  return (
    <>
      {isSuccess && (
        <MeetingSection>
          {meetingList?.meeting.length ? (
            <ul className="meeting-list">
              {meetingList.meeting.map((meeting) => {
                return (
                  <MeetingItemOuter key={meeting._id}>
                    <MeetingItem meeting={meeting} key={meeting._id} />
                  </MeetingItemOuter>
                );
              })}
            </ul>
          ) : (
            <EmptyMeeting>
              <p className="empty-text">아직 참여한 모임이 없습니다.</p>
              <div className="write-btn-wrapper">
                <StyledButton to="/meeting/write" cherry responsive>
                  모임 생성
                </StyledButton>
              </div>
            </EmptyMeeting>
          )}
        </MeetingSection>
      )}
    </>
  );
};

const MeetingSection = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  .meeting-list {
    padding-bottom: 3rem;
    display: flex;
    flex-wrap: wrap;
  }
`;

const MeetingItemOuter = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 2px 2px 8px 1px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  margin: 0 1rem 2rem 1rem;
  padding: 0.5rem 1rem;
  cursor: pointer;

  @media screen and (min-width: 768px) {
    margin: 0 3rem 2rem 1rem;
    &:nth-child(2n) {
      margin-right: 1rem;
    }
    width: calc(50% - 3rem);
  }
  @media screen and (min-width: 1024px) {
    &:nth-child(2n) {
      margin-right: 3rem;
    }
    &:nth-child(3n) {
      margin-right: 1rem;
    }
    width: calc(33.333% - 3.33333rem);
  }
`;

const EmptyMeeting = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .empty-text {
    font-size: ${({ theme }) => theme.fontSize.lg};
  }
  .write-btn-wrapper {
    margin: 5rem 0;
    display: flex;
    justify-content: center;
  }
`;

export default MyMeeting;
