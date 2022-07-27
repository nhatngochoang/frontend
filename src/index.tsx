// import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './app/store';
import './index.css';
import { history } from './utils';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import CurrentUserContext from 'contexts/CurrentUserContext';

ReactDOM.render(
   <React.Fragment>
      <Provider store={store}>
         <ConnectedRouter history={history}>
            {/* Reset CSS */}
            <CssBaseline />
            <CurrentUserContext>
               <App />
            </CurrentUserContext>
         </ConnectedRouter>
         <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
         />
      </Provider>
   </React.Fragment>,
   document.getElementById('root')
);
