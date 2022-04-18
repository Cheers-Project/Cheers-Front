import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import * as meetingAPI from 'api/meeting';

const MeetingDetail = () => {
  const { id } = useParams();

  const { data: meetingInfo } = useQuery(
    ['meeting', id],
    meetingAPI.fetchMeetingDetail,
    {
      refetchOnWindowFocus: false,
    },
  );

  return <div>{meetingInfo?.meeting.view}</div>;
};

export default MeetingDetail;
