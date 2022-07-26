import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';

import App from './App';

hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}

if (process.env.NODE_ENV === 'production') {
  OfflinePluginRuntime.install();
}
