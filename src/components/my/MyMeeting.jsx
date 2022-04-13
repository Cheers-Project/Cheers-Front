import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';

import * as myAPI from 'api/my';
import MeetingItem from 'components/main/MeetingItem';

const MyMeeting = () => {
  const { data: meetingList } = useQuery(['my/meeting'], myAPI.fetchMyMeeting, {
    refetchOnWindowFocus: false,
  });

  return (
    <MeetingSection>
      <ul className="meeting-list">
        {meetingList?.meeting.map((meeting) => {
          return (
            <MeetingItemOuter key={meeting._id}>
              <MeetingItem meeting={meeting} key={meeting._id} />
            </MeetingItemOuter>
          );
        })}
      </ul>
    </MeetingSection>
  );
};

const MeetingSection = styled.section`
  .meeting-list {
    padding-bottom: 3rem;
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
  }
`;

const MeetingItemOuter = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 2px 2px 8px 1px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  margin: 0 1rem;
  padding: 0.5rem 1rem;

  @media screen and (min-width: 768px) {
    width: calc(50% - 3rem);
  }
  @media screen and (min-width: 1024px) {
    width: calc(33.333% - 4rem);
  }
`;

export default MyMeeting;
