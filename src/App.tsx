import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { NotFound, PrivateRoute } from './components/Common';
import { AdminLayout } from './components/Layout';
import { LoginPage } from './features/auth/pages/LoginPage';
import Formik from './formik/SignupForm';
import Lab from './lab';
import Pokemon from './pokemonAPI';
import ReactHookForm from './react-hook-form-v7';
import ReactQueryMUIStyled from './reactquery-mui-styled';

// import Demo from './react-hook-form-v7/Demo.js';

function App() {
   return (
      <div>
         <Switch>
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
            {/* NOT FOUND */}
            <Route path="*">
               <NotFound />
            </Route>
         </Switch>
      </div>
   );
}

export default App;
