import React, { useEffect } from 'react';
import styled from 'styled-components';

import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';

const BoardViewer = ({ boardInfo }) => {
  useEffect(() => {
    if (boardInfo) {
      const el = document.getElementById('viewer');
      new Viewer({
        el,
        initialValue: boardInfo.contents,
      });
    }
  }, [boardInfo]);

  return <ViewerWrapper id="viewer"></ViewerWrapper>;
};

const ViewerWrapper = styled.div`
  .toastui-editor-contents {
    width: 100%;
    background-color: ${({ theme }) => theme.color.white};
    font-size: ${({ theme }) => theme.fontSize.sm};
    padding: 2rem 1rem;
    p {
      margin: 0;
      padding: 0;
    }
  }
`;

export default BoardViewer;
