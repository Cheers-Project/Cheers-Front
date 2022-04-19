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
            return (
              <MeetingItemOuter>
                <MeetingItem meeting={meeting} key={meeting._id} />
              </MeetingItemOuter>
            );
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

export default MeetingList;
