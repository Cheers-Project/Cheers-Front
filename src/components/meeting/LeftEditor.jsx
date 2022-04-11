import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { changeTitle, changeContents } from 'redux/modules/meeting';
import MeetingTime from 'components/meeting/MeetingTime';
import MemberCounter from 'components/meeting/MemberCounter';

const LeftEditor = () => {
  const dispatch = useDispatch();

  const handleTitle = (e) => {
    dispatch(changeTitle(e.target.value));
  };

  const handleContents = (e) => {
    dispatch(changeContents(e.target.value));
  };

  return (
    <LeftEditorWrapper>
      <div className="title-container">
        <input
          onChange={handleTitle}
          className="title-input"
          type="text"
          placeholder="제목을 입력하세요"
        />
      </div>
      <div className="contents-container">
        <textarea
          onChange={handleContents}
          className="contents-input"
          placeholder="내용을 입력하세요"
        ></textarea>
      </div>
      <MemberCounter />
      <MeetingTime />
    </LeftEditorWrapper>
  );
};

const LeftEditorWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  flex: 1;

  .title-input {
    width: 100%;
    padding-bottom: 1rem;
    border-bottom: 1px solid ${({ theme }) => theme.color.divider};
    font-size: ${({ theme }) => theme.fontSize.lgTitle};
    &::placeholder {
      font-size: ${({ theme }) => theme.fontSize.lgTitle};
    }
  }

  .contents-container {
    min-height: 30rem;
    flex: 1;
  }
  .contents-input {
    width: 100%;
    height: 100%;
    padding: 1rem;
    border: 1px solid ${({ theme }) => theme.color.divider};
    border-radius: 0.3rem;
    font-size: ${({ theme }) => theme.fontSize.sm};
  }
`;

export default LeftEditor;
