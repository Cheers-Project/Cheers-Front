import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-day-picker/dist/style.css';

const GlobalStyles = createGlobalStyle`
${reset}
*,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  .a11y-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    margin: -1px;
    clip-path: polygon(0 0, 0 0, 0 0);
  }
  
  html {
    font-size: 10px;
    font-family: 'Roboto', sans-serif;
  }


  body {
    margin: 0;
    padding: 0;
    border: 0;
    background-color: #f5f5f5;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ol,ul,li {
    list-style: none;
  }

  input, button, textarea {
    border: none;
    outline: none;
    padding: 0;
    margin: 0;
    background-color: inherit;
  }

  textarea {
    resize: none;
  }
  
  button {
    cursor: pointer;
  }    

  input,textarea {
    font-family: 'Roboto', sans-serif;
  }
`;

export default GlobalStyles;
