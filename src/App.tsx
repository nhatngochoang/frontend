import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { NotFound, PrivateRoute } from './components/Common';
import { AdminLayout } from './components/Layout';
import { LoginPage } from './features/auth/pages/LoginPage';

function App() {
  return (
    <div>
      <Routes>
        {/* LOGIN */}
        <Route path="/login" element={<LoginPage />} />
        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        />
        {/* NOT FOUND */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
