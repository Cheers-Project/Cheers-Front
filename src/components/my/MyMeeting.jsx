import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';

import * as myAPI from 'api/my';
import MeetingItem from 'components/meeting/MeetingItem';

const MyMeeting = () => {
  const { data: meetingList } = useQuery(['my/meeting'], myAPI.fetchMyMeeting, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return (
    <MeetingSection>
      <ul className="meeting-list">
        {meetingList?.meeting.map((meeting) => {
          return <MeetingItem meeting={meeting} key={meeting._id} />;
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

export default MyMeeting;
