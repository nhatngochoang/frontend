import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { NotFound, PrivateRoute } from './components/Common';
import { AdminLayout } from './components/Layout';
import { LoginPage } from './features/auth/pages/LoginPage';

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
        {/* NOT FOUND */}
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
