import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../DataProvider/DataProvider';

const ProtectedRoute = ({ children, msg, redirect }) => {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useContext(DataContext);

  useEffect(() => {
    if (!user) {
      // If user is not authenticated, navigate to the login page
      navigate('/auth', { state: { msg, redirect } });
    }
  }, [user]);

  // If user exists, return the protected children
  return children;
};

export default ProtectedRoute;
