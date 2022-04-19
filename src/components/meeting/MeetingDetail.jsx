import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import StyledButton from 'components/common/StyledButton';
import useMeetingQuery from 'hooks/useMeetingQuery';
import useOwnedQuery from 'hooks/useOwnedQuery';

const MeetingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const meetingInfo = useMeetingQuery();
  const userId = useOwnedQuery();

  const handleNavigate = () => {
    navigate(`/meeting/write/${id}`);
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
            <StyledButton>삭제</StyledButton>
          </>
        )}
      </div>
    </div>
  );
};

export default MeetingDetail;
