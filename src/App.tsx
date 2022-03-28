import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { NotFound, PrivateRoute } from './components/Common';
import { AdminLayout } from './components/Layout';
import { LoginPage } from './features/auth/pages/LoginPage';
import Formik from './formik/SignupForm';
import Lab from './lab';
import ReactHookForm from './react-hook-form-v7';
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
            {/* React Hook FORM */}
            <Route path="/formik">
               <Formik />
            </Route>
            {/* Lab */}
            <Route path="/lab">
               <Lab />
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
