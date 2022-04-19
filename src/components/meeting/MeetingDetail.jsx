import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from 'react-query';

import StyledButton from 'components/common/StyledButton';
import useMeetingQuery from 'hooks/useMeetingQuery';
import useOwnedQuery from 'hooks/useOwnedQuery';
import * as meetingAPI from 'api/meeting';

const MeetingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const meetingInfo = useMeetingQuery();
  const userId = useOwnedQuery();

  const mutation = useMutation(meetingAPI.removeMeeting, {
    mutationKey: ['meeting', id],
    onSuccess: () => {
      navigate(`/meeting?sort=recent`);
    },
  });

  const handleNavigate = () => {
    navigate(`/meeting/write/${id}`);
  };

  const handleRemove = () => {
    mutation.mutate(id);
  };

  return (
    <div>
      <p style={{ margin: '1rem 0', fontSize: '1.4rem' }}>
        {meetingInfo?.view}
      </p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        {meetingInfo?.writer._id === userId && (
          <>
            <StyledButton onClick={handleNavigate} cherry>
              수정
            </StyledButton>
            <StyledButton onClick={handleRemove}>삭제</StyledButton>
          </>
        )}
      </div>
    </div>
  );
};

export default MeetingDetail;
