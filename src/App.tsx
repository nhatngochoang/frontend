import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { NotFound, PrivateRoute } from './components/Common';
import { AdminLayout } from './components/Layout';
import { LoginPage } from './features/auth/pages/LoginPage';
import Formik from './formik/SignupForm';
import Lab from './lab';
import Pokemon from './pokemonAPI';
import ReactHookForm from './pages/react-hook-form-v7';
import ReactQueryMUIStyled from './reactquery-mui-styled';
import ContextAPI from './pages/contextAPI';
import { CurrentUserContext } from 'contexts/CurrentUserContext';
import { FacebookCircularProgress } from 'components/widgets/Loading';
import './App.css';

// import Demo from './react-hook-form-v7/Demo.js';

function App() {
   const { authLoading, currentUser } = useContext(CurrentUserContext);

   if (authLoading) {
      return (
         <div className="overlay">
            {/* https://v4.mui.com/components/progress/#progress */}
            <FacebookCircularProgress />
         </div>
      );
   } else if (!currentUser) {
      return <LoginPage />;
   } else {
      return (
         <div>
            <Switch>
               {/* START PAGE */}
               <Route exact path="/">
                  <Redirect to="/admin" />
               </Route>

               {/* LOGIN */}
               <Route path="/login">
                  <LoginPage />
               </Route>
               {/* ADMIN */}
               <PrivateRoute path="/admin">
                  <AdminLayout />
               </PrivateRoute>
               {/* React Hook FORM */}
               <Route path="/reactHookForm">
                  <ReactHookForm />
               </Route>
               {/* FORMIK */}
               <Route path="/formik">
                  <Formik />
               </Route>
               {/* Lab */}
               <Route path="/lab">
                  <Lab />
               </Route>
               {/* Pokemon */}
               <Route path="/pokemon">
                  <Pokemon />
               </Route>
               {/* ReactQuery-MUI-Styled */}
               <Route path="/queryMuiStyled">
                  <ReactQueryMUIStyled />
               </Route>
               {/* Context API */}
               <Route path="/contextAPI">
                  <ContextAPI />
               </Route>
               {/* NOT FOUND */}
               <Route path="*">
                  <NotFound />
               </Route>
            </Switch>
         </div>
      );
   }
}
export default App;
