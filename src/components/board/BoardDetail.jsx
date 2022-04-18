import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Viewer } from '@toast-ui/react-editor';

import * as boardAPI from 'api/board';
import UserInfo from 'components/board/UserInfo';
import DateInfo from 'components/board/DateInfo';
import useCheckOwned from 'hooks/useCheckOwned';
import DeleteBtn from 'components/board/DeleteBtn';
import LikeBtn from './LikeBtn';

const BoardDetail = () => {
  const { id } = useParams();

  const userId = useCheckOwned();

  const { data, isSuccess } = useQuery(
    ['board', id],
    () => boardAPI.getBoradById(id),
    {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  );

  const boardInfo = data?.board;

  return (
    <>
      {isSuccess && (
        <BoardDetailWrapper>
          <BoardInfo>
            <div>
              <h2 className="board-title">{boardInfo.title}</h2>
              <SubInto>
                <UserInfo boardInfo={boardInfo} />
                <DateInfo boardInfo={boardInfo} />
              </SubInto>
            </div>
            {userId && boardInfo.writer._id === userId ? (
              <div>
                <DeleteBtn />
              </div>
            ) : null}
          </BoardInfo>
          <Viewer initialValue={boardInfo.contents} />
          <LikeBtn boardInfo={boardInfo} userId={userId} />
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
  justify-content: space-between;
  flex-direction: row;
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
export default BoardDetail;
