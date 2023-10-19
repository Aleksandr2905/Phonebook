import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsAuthenticated } from 'redux/selectors';

export const RestrictedRoute = ({ children, redirectTo = '/' }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return isAuthenticated ? <Navigate to={redirectTo} replace /> : children;
};
