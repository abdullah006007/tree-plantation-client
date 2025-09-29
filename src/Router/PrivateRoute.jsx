import React from 'react';
import { Navigate, useLocation } from 'react-router-dom'; 
import useAuth from '../Hooks/useAuth';
import Spinner from '../Shareed/Spinner';


const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Spinner/>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default PrivateRoute;
