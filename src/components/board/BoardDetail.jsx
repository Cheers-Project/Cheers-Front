import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { Viewer } from '@toast-ui/react-editor';
import { LikeFilled } from '@ant-design/icons';

import * as boardAPI from 'api/board';
import UserInfo from './UserInfo';
import DateInfo from './DateInfo';
import useCheckOwned from 'hooks/useCheckOwned';

const BoardDetail = () => {
  const userId = useCheckOwned();

  const location = window.location;
  const id = location.pathname.split('/')[2];

  const { data, isSuccess } = useQuery(
    ['board', id],
    () => boardAPI.getBoradById(id),
    {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  );

  const boardInfo = data?.board;

  console.log(userId);

  return (
    <>
      {isSuccess && (
        <BoardDetailWrapper>
          <BoardInfo>
            <h2 className="board-title">{boardInfo.title}</h2>
            <SubInto>
              <UserInfo boardInfo={boardInfo} />
              <DateInfo boardInfo={boardInfo} />
            </SubInto>
            {userId && boardInfo.writer._id === userId ? 1 : 0}
          </BoardInfo>
          <Viewer initialValue={boardInfo.contents} />
          <LikeWrapper>
            <LikeFilled />
            <p className="like-cnt">{boardInfo.like}</p>
          </LikeWrapper>
        </BoardDetailWrapper>
      )}
    </>
  );
};

const BoardDetailWrapper = styled.section`
  display: flex;
  flex-direction: column;
  padding: 2rem 0;

  .toastui-editor-contents {
    width: 100%;
    background-color: ${({ theme }) => theme.color.white};
    font-size: ${({ theme }) => theme.fontSize.md};
    padding: 2rem 1rem;
    p {
      margin: 0;
      padding: 0;
    }
  }
`;

const BoardInfo = styled.div`
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: ${({ theme }) => theme.color.white};
  .board-title {
    font-size: ${({ theme }) => theme.fontSize.lgTitle};
    font-weight: 600;
  }
`;

const SubInto = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const LikeWrapper = styled.div`
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: ${({ theme }) => theme.color.white};
  font-size: 4rem;
  .like-cnt {
    font-size: ${({ theme }) => theme.fontSize.md};
  }
`;
export default BoardDetail;
