import React, { useRef } from 'react';
import styled from 'styled-components';
import { useInfiniteQuery } from 'react-query';

import MeetingItem from 'components/main/MeetingItem';
import * as meetingAPI from 'api/meeting';
import useCurrentQuery from 'hooks/useCurrentQuery';
import useInterSectionObserver from 'hooks/useInterSectionObserver';

const MeetingList = () => {
  const [query] = useCurrentQuery();
  const target = useRef();

  const { data, fetchNextPage, hasNextPage, isError } = useInfiniteQuery(
    ['meeting', query],
    meetingAPI.fetchMeeting,
    {
      getNextPageParam: (lastPage) => {
        return lastPage.isLastPage ? false : lastPage.nextPage;
      },
      refetchOnWindowFocus: false,
      retry: 1,
    },
  );

  useInterSectionObserver({
    target,
    handleIntersect: fetchNextPage,
    enabled: !!hasNextPage,
  });

  return (
    <MeetingSection>
      {isError && <div>위치 서비스 권한이 없습니다.</div>}
      {data?.pages.map((page) =>
        page.meeting.map((meeting) => {
          return (
            <MeetingItemOuter key={meeting._id}>
              <MeetingItem meeting={meeting} key={meeting._id} />
            </MeetingItemOuter>
          );
        }),
      )}
      <div ref={target}></div>
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
