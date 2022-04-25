import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { Editor } from '@toast-ui/react-editor';
import { useMutation, useQueryClient } from 'react-query';

import * as boardAPI from 'api/board';
import StyledInput from 'components/common/StyledInput';
import useBoardQuery from 'hooks/useBoardQuery';
import StyledButton from 'components/common/StyledButton';

const BoardEditor = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const editor = useRef(null);

  const [title, setTitle] = useState('');
  const [imgKeys, setImgKeys] = useState([]);

  const { boardInfo } = useBoardQuery('update');

  const writeBoard = useMutation(boardAPI.writeBoard, {
    mutationKey: ['boards'],
    onSuccess: () => {
      queryClient.invalidateQueries(['boards']);
      navigate('/board?sort=recent&page=1');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const updateBoard = useMutation(boardAPI.updateBoard, {
    onSuccess: (_, variables) => {
      const { id } = variables;
      navigate(`/board/${id}`);
    },
  });

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBoardSubmit = () => {
    const contents = editor.current.getInstance().getHTML();
    if (!title) {
      alert('제목을 입력해주세요');
      return;
    }

    const payload = {
      title,
      contents,
      imgKeys,
    };
    if (boardInfo) {
      updateBoard.mutate({ payload, id: boardInfo._id });
      return;
    }
    writeBoard.mutate(payload);
  };

  useEffect(() => {
    if (!editor) return;
    editor.current.getInstance().removeHook('addImageBlobHook');
    editor.current
      .getInstance()
      .addHook('addImageBlobHook', async (blob, callback) => {
        const formData = new FormData();
        formData.append('image', blob);

        const res = await boardAPI.uploadImg(formData);
        setImgKeys((imgKeys) => [...imgKeys, res.data.imgKey]);

        callback(res.data.imgUrl, 'image');
      });
  }, [editor]);

  useEffect(() => {
    setTitle(boardInfo?.title);
    setImgKeys(boardInfo?.imgKeys);
    editor.current.getInstance().setHTML(boardInfo?.contents);
  }, [boardInfo]);

  return (
    <BoardEditorWrapper>
      <Input
        id="boardTitle"
        type="text"
        placeholder="제목을 입력하세요."
        onChange={handleTitleChange}
        defaultValue={boardInfo && boardInfo.title}
      />
      <div className="editor-wrapper">
        <Editor
          className="editor"
          height="100%"
          previewStyle={false}
          toolbarItems={[
            ['heading', 'bold', 'italic', 'strike'],
            ['hr', 'quote'],
            ['ul', 'ol', 'indent', 'outdent'],
            ['image', 'link'],
          ]}
          previewHighlight={false}
          initialEditType="wysiwyg"
          placeholder="여러분의 이야기를 자유롭게 적으세요."
          ref={editor}
        />
      </div>
      <ButtonWrapper>
        <StyledButton cherry onClick={handleBoardSubmit}>
          {!boardInfo ? '업로드' : '수정'}
        </StyledButton>
        <StyledButton to={-1} className="cancle-btn">
          취소
        </StyledButton>
      </ButtonWrapper>
    </BoardEditorWrapper>
  );
};

const BoardEditorWrapper = styled.section`
  height: 100%;
  padding: 2rem 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  flex: 1;
  .editor-wrapper {
    width: 100%;
    min-height: 500px;
    flex: 1;
  }

  .toastui-editor-defaultUI {
    width: 100%;
  }
  .ProseMirror {
    background-color: ${({ theme }) => theme.color.white};
  }

  .toastui-editor-dropdown-toolbar {
    flex-direction: column;
    right: -2.1rem !important;
  }
  .toastui-editor-defaultUI-toolbar {
    padding: 0;
  }
  .toastui-editor-toolbar-group {
    border-bottom: 1px solid #dadde6;
    background-color: #f6f9fc;
  }
  .toastui-editor-popup {
    left: 50% !important;
  }
`;

const Input = styled(StyledInput)`
  border: none;
  background-color: inherit;
  border-bottom: 1px solid #ccc;
  border-radius: 0;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 2rem;
`;

export default BoardEditor;
