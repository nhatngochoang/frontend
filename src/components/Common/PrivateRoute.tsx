import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { useLocation } from 'react-router';

// PrivateRoute ➤ Func Component + prop children ➤ JSX element
export const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  let location = useLocation();
  // Check if user is logged in
  // If yes, show route. Otherwise, redirect to login page
  const isLoggedIn = Boolean(localStorage.getItem('access_token'));
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
};
