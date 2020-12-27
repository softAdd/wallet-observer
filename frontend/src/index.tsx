import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Root } from './root';
import reportWebVitals from './reportWebVitals';

import './index.css';
import 'common/models/init';
import 'common/i18n';

const createApp = () => {
  ReactDOM.render(
    <React.StrictMode>
      {/* suspense for translations */}
      <Suspense fallback={null}>
        <Root />
      </Suspense>
    </React.StrictMode>,
    document.getElementById('root')
  );
};

// @ts-ignore
if (!window.cordova) {
  createApp();
} else {
  document.addEventListener('deviceready', createApp, false);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
