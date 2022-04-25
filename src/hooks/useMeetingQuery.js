import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import * as meetingAPI from 'api/meeting';
import { overwriteMeeting } from 'redux/modules/meeting';

const useMeetingQuery = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { data } = useQuery(['meeting', id], meetingAPI.fetchMeetingDetail, {
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

  useEffect(() => {
    if (data) {
      dispatch(overwriteMeeting(data.meeting));
    }
  }, [data, dispatch]);

  return { meetingInfo: data?.meeting, isClosed: data?.isClosed };
};

export default useMeetingQuery;
