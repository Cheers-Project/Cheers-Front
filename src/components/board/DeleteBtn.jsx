import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

import * as boardAPI from 'api/board';

const DeleteBtn = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const deleteBoard = useMutation(boardAPI.deleteBoard, {
    onSuccess: (data, id) => {
      queryClient.invalidateQueries(['boards']);
    },
  });

  const handleDeleteBtn = () => {
    deleteBoard.mutate(id);
    navigate('/board?sort=recent&page=1');
  };

  return <button onClick={handleDeleteBtn}>삭제</button>;
};

export default DeleteBtn;
