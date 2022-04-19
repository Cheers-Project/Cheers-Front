import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import * as meetingAPI from 'api/meeting';
import { overwriteMeeting } from 'redux/modules/meeting';
import { useEffect } from 'react';

const useMeetingQuery = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { data, isSuccess } = useQuery(
    ['meeting', id],
    meetingAPI.fetchMeetingDetail,
    {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      enabled: !!id,
    },
  );

  useEffect(() => {
    if (data) {
      dispatch(overwriteMeeting(data.meeting));
    }
  }, [data, dispatch]);

  return data?.meeting;
};

export default useMeetingQuery;
