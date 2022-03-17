import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import GlobalStyles from 'styles/GlobalStyles';
import Responsive from 'components/common/Responsive';

ReactDOM.render(
  <React.StrictMode>
    <Responsive>
      <App />
    </Responsive>
    <GlobalStyles />
  </React.StrictMode>,
  document.getElementById('root'),
);
