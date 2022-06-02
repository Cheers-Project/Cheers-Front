import React from 'react';
import { EditOutlined } from '@ant-design/icons';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const WriteButton = ({ route }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']);

  const handleRoute = () => {
    navigate(route);
  };

  if (!user) return null;

  return (
    <StyledWriteButton onClick={handleRoute}>
      <EditOutlined />
    </StyledWriteButton>
  );
};

const StyledWriteButton = styled.button`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.color.white};
  background-color: ${({ theme }) => theme.color.lightCherry};
`;

export default WriteButton;
