import React from 'react';
import styled from 'styled-components';

const MeetingEditor = () => {
  return (
    <EditorWrapper>
      <div className="input-container">
        <input
          className="title-input"
          type="text"
          placeholder="제목을 입력하세요"
        />
      </div>
      <div className="input-container">
        <textarea className="contents-input"></textarea>
      </div>
    </EditorWrapper>
  );
};

const EditorWrapper = styled.section`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 768px) {
    width: 50%;
  }

  .input-container + .input-container {
    margin-top: 1.5rem;
  }

  .title-input {
    width: 100%;
    padding-bottom: 1rem;
    border-bottom: 1px solid ${({ theme }) => theme.color.lightGray};
    font-size: ${({ theme }) => theme.fontSize.lgTitle};
    &::placeholder {
      font-size: ${({ theme }) => theme.fontSize.lgTitle};
    }
  }

  .contents-input {
    width: 100%;
    min-height: 45rem;
    padding: 1rem;
    border: 1px solid ${({ theme }) => theme.color.lightGray};
    border-radius: 0.3rem;
    font-size: ${({ theme }) => theme.fontSize.sm};
  }
`;

export default MeetingEditor;
