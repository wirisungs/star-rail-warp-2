import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    console.log('ProtectedRoute - Auth state changed:', { user, loading });

    if (!loading && !user) {
      console.log('ProtectedRoute - No user found, will redirect after delay');
      const timer = setTimeout(() => {
        setShouldRedirect(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [user, loading]);

  if (loading) {
    console.log('ProtectedRoute - Still loading...');
    return <div className="loading">Loading...</div>;
  }

  if (shouldRedirect) {
    console.log('ProtectedRoute - Redirecting to auth page');
    return <Navigate to="/auth" replace state={{ from: window.location.pathname }} />;
  }

  console.log('ProtectedRoute - User authenticated, rendering protected content');
  return children;
};

export default ProtectedRoute;
