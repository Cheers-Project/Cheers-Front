import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';

import MeetingItem from 'components/main/MeetingItem';
import * as meetingAPI from 'api/meeting';
import useCurrentQuery from 'hooks/useCurrentQuery';

const MeetingList = () => {
  const [query] = useCurrentQuery();

  const { data: meetingList } = useQuery(
    ['meeting', query],
    meetingAPI.fetchMeeting,
    {
      refetchOnWindowFocus: false,
    },
  );

  return (
    <MeetingSection>
      {meetingList?.meeting.map((meeting) => {
        return (
          <MeetingItemOuter key={meeting._id}>
            <MeetingItem meeting={meeting} key={meeting._id} />
          </MeetingItemOuter>
        );
      })}
      ;
    </MeetingSection>
  );
};

const MeetingSection = styled.section`
  padding-bottom: 3rem;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
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

export default MeetingList;
