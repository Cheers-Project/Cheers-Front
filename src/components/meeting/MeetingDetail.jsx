import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import StyledButton from 'components/common/StyledButton';
import useMeetingQuery from 'hooks/useMeetingQuery';

const MeetingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const meetingInfo = useMeetingQuery();

  const handleNavigate = () => {
    navigate(`/meeting/write/${id}`);
  };

  return (
    <div>
      <p style={{ margin: '1rem 0', fontSize: '1.4rem' }}>
        {meetingInfo?.view}
      </p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <StyledButton onClick={handleNavigate} cherry>
          수정
        </StyledButton>
        <StyledButton>삭제</StyledButton>
      </div>
    </div>
  );
};

export default MeetingDetail;
