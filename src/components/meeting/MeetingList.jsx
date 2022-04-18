import React, { useRef } from 'react';
import styled from 'styled-components';
import { useInfiniteQuery } from 'react-query';

import MeetingItem from 'components/meeting/MeetingItem';
import * as meetingAPI from 'api/meeting';
import useCurrentQuery from 'hooks/useCurrentQuery';
import useInterSectionObserver from 'hooks/useInterSectionObserver';

const MeetingList = () => {
  const { query } = useCurrentQuery();
  const target = useRef();

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['meeting', query],
    meetingAPI.fetchMeeting,
    {
      getNextPageParam: (lastPage) => {
        return lastPage.isLastPage ? false : lastPage.nextPage;
      },
      refetchOnWindowFocus: false,
    },
  );

  useInterSectionObserver({
    target,
    handleIntersect: fetchNextPage,
    enabled: !!hasNextPage,
  });

  return (
    <section>
      <MeetingListWrapper>
        {data?.pages.map((page) =>
          page.meeting.map((meeting) => {
            return <MeetingItem meeting={meeting} key={meeting._id} />;
          }),
        )}
        <div ref={target}></div>
      </MeetingListWrapper>
    </section>
  );
};

const MeetingListWrapper = styled.ul`
  padding-bottom: 3rem;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
`;

export default MeetingList;
