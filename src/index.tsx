import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
// import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { CustomRouter, history } from './history.js';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CustomRouter history={history}>
        {/* Reset CSS */}
        <CssBaseline />
        <App />
      </CustomRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
