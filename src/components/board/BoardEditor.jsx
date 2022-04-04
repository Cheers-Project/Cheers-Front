import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Editor, Viewer } from '@toast-ui/react-editor';

import * as boardAPI from 'api/board';
import StyledInput from 'components/common/StyledInput';

const BoardEditor = () => {
  const [title, setTitle] = useState(null);

  const editor = useRef(null);

  const changeTitle = (e) => {
    setTitle(e.target.value);
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
        console.log(res);

        callback(res.data.imgUrl, 'image');
      });
  }, [editor]);

  const onClick = async () => {
    const contents = editor.current.getInstance().getHTML();

    console.log(contents);
    const payload = {
      title,
      contents,
    };
    console.log(payload);
    await boardAPI.write(payload);
  };
  return (
    <BoardEditorWrapper>
      <StyledInput
        id="boardTitle"
        type="text"
        placeholder="제목을 입력하세요."
        onChange={changeTitle}
      />
      <Editor
        className="editor"
        height="500px"
        previewStyle={false}
        toolbarItems={[
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'indent', 'outdent'],
          ['table', 'image', 'link'],
        ]}
        previewHighlight={false}
        initialEditType="wysiwyg"
        placeholder="여러분의 이야기를 자유롭게 적으세요."
        ref={editor}
      />
      {/* <Viewer initialValue={'# markdown'} /> */}
      <button onClick={onClick}>업로드</button>
    </BoardEditorWrapper>
  );
};

const BoardEditorWrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  input {
    width: 80%;
  }
  .toastui-editor-defaultUI {
    width: 100%;
  }
`;

export default BoardEditor;
