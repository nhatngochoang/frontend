import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './app/store';
import './index.css';

ReactDOM.render(
   <React.Fragment>
      <Provider store={store}>
         <App />
      </Provider>
   </React.Fragment>,
   document.getElementById('root')
);
